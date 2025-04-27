import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import image from "../../assets/generique.jpg"
import {fetchAllProduits} from "../../scripts/http.js";

export default function AffichageProduits({filtres}) {

    const [produitsAffiche, setProduitsAffiche] = useState([]);
    const [isFecthing, setIsFecthing] = useState(false);
    const [error, setError] = useState({error: undefined, message: ""});
    const [pageCourrante, setPageCourrante] = useState(1);

    const maxProduitPage = 20;


    const totalPages = Math.ceil(produitsAffiche.length / maxProduitPage);
    const indexDernierProduit = pageCourrante * maxProduitPage;
    const indexPremierProduit = indexDernierProduit - maxProduitPage;
    const currentProducts = produitsAffiche.slice(indexPremierProduit, indexDernierProduit);

    const paginate = (pageNumber) => setPageCourrante(pageNumber);


    useEffect(() => {
        fetchData();

    }, [filtres]);


    async function fetchData() {
        setIsFecthing(true);
        try {
            const data = await fetchAllProduits();
            if (!filtres.presenceFiltre) {
                setProduitsAffiche(data);
            } else {
                const filteredData = data.filter((product) => {
                    return Object.entries(filtres.filtres).every(([key, value]) => {
                        if (!value || value.length === 0) return true;
                        if (Array.isArray(value)) return value.includes(product[key]);
                        return product[key] === value;
                    });
                });
                setProduitsAffiche(filteredData);
            }


        } catch (err) {
            setError({error: true, message: "Impossible de charger les produits."});
            console.error("Erreur chargement produits:", err);
        } finally {
            setIsFecthing(false);
        }
    }


    return (
        <>
            {isFecthing ?
                <div className="d-flex justify-content-center align-items-center vh-100">en train de fetch</div>
                :
                !error.error ?
                    produitsAffiche.length !== 0 ?
                        <div className="d-flex flex-column min-vh-100">
                            <div className="container mt-5 pt-5 flex-grow-1">
                                <div className="row">
                                    {currentProducts.map((product) => (
                                        <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                                            <Link to={`/produit/${product.id}`} className="text-decoration-none">
                                                <div
                                                    className="card h-100 border-1 rounded shadow-lg product-card-hover">
                                                    <img src={image} className="card-img-top rounded-top"
                                                         alt={product.nom}/>
                                                    <div className="card-body d-flex flex-column">
                                                        <h5 className="card-title">{product.nom}</h5>
                                                        <p className="card-text">{product.description}</p>
                                                        <div className="mt-auto">
                                                            <p className="card-text fw-bold">{product.prix} $</p>
                                                            <button className="btn btn-dark w-100">Ajouter au panier
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>

                            </div>
                            <nav className="mt-auto">
                                <ul className="pagination justify-content-center mb-4">
                                    {Array.from({length: totalPages}, (_, index) => (
                                        <li key={index}
                                            className={`page-item ${pageCourrante === index + 1 ? "active" : ""}`}>
                                            <button onClick={() => paginate(index + 1)} className="page-link">
                                                {index + 1}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div> :
                        //si il n'y a aucuns produitsAffiche qui corrsponds aux criteres de recherche
                        <div>aucuns produits ne réponds aux critères</div>
                    :
                    // en cas d'erreur de fetch avec le backend
                    <div className="alert alert-danger">{error.message}</div>
            }

        </>
    );
};
