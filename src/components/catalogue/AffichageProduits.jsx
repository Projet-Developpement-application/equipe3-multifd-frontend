import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import image from "../../assets/generique.jpg"
import {fetchAllProduits} from "../../scripts/http.js";
import {UtilisateurContext} from "../../assets/contexte/UtilisateurContext.jsx";
import {URL_BACKEND} from "../../App.jsx";
import {supprimerProduit} from "../../scripts/httpAdmin.js";

export default function AffichageProduits({filtres}) {

    const [produits, setProduits] = useState([]);
    const [produitsFiltres, setProduitsFiltres] = useState([]);
    const [isFecthing, setIsFecthing] = useState(false);
    const [error, setError] = useState({error: undefined, message: ""});
    const [pageCourrante, setPageCourrante] = useState(1);
    const {utilisateur, setUtilisateur} = useContext(UtilisateurContext);

    const maxProduitPage = 20;


    const totalPages = Math.ceil(produitsFiltres.length / maxProduitPage);
    const indexDernierProduit = pageCourrante * maxProduitPage;
    const indexPremierProduit = indexDernierProduit - maxProduitPage;
    const currentProducts = produitsFiltres.slice(indexPremierProduit, indexDernierProduit);

    const paginate = (pageNumber) => setPageCourrante(pageNumber);


    useEffect(() => {
        setIsFecthing(true);
        fetchAllProduits().then(data => {
            setProduits(data); // Stocke les produits récupérés
            setIsFecthing(false);
        }).catch(err => {
            console.error("Erreur lors du fetch des produits :", err);
            setIsFecthing(false);
        });
    }, []);

    useEffect(() => {
        // Applique les filtres sur les produits récupérés
        const filtresAppliques = produits.filter(p =>
            (filtres.amperage.length === 0 || filtres.amperage.includes(p.amperage)) &&
            (filtres.voltage.length === 0 || filtres.voltage.includes(p.voltage)) &&
            (filtres.marques.length === 0 || filtres.marques.includes(p.marque.nom)) &&
            (filtres.etat.length === 0 || filtres.etat.includes(p.etat)) &&
            (filtres.hp.length === 0 || filtres.hp.includes(p.hp)) &&
            (filtres.disponibilite.length === 0 || filtres.disponibilite.includes(p.disponible)) &&
            (filtres.nom === undefined || p.nom.toLowerCase().includes(filtres.nom.toLowerCase()))
        ).sort((a, b) =>
            filtres.prixAsc ? a.prix - b.prix : b.prix - a.prix
        );
        setProduitsFiltres(filtresAppliques);
    }, [filtres, produits]);
    const handleDelete = async (id) => {
        const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?");
        if (!confirmed) return;

        try {
            await supprimerProduit(id);
            // On retire le produit supprimé du state local
            setProduits(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            console.error("Erreur lors de la suppression :", err);
            setError({ error: true, message: "La suppression du produit a échoué." });
        }
    };
    return (
        <>
            {isFecthing ?
                <div className="d-flex justify-content-center align-items-center min-vh-100">
                    <div className="spinner-border" role="status">
                    </div>
                </div>
                :
                !error.error ?
                    produitsFiltres.length !== 0 ?
                        <div className="d-flex flex-column min-vh-100">
                            <div className="container mt-5 pt-5 flex-grow-1">
                                <div className="row">
                                    {currentProducts.map((product) => (
                                        <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                                                <div
                                                    className="card h-100 border-1 rounded shadow-lg product-card-hover">
                                                    <Link to={`produit/${product.id}`}
                                                          className="text-decoration-none text-dark">
                                                        {product.imagePath != null ? (
                                                            <img src={`${URL_BACKEND}/uploads/images/${product.imagePath}`} className="card-img-top rounded-top"
                                                                 alt={product.nom}/>
                                                        ):<img src={image} className="card-img-top rounded-top"
                                                               alt={product.nom}/>}

                                                        <div className="card-body d-flex flex-column">
                                                            <h5 className="card-title">{product.nom}</h5>
                                                            <p className="card-text">{product.description}</p>
                                                            <p className="card-text fw-bold">{product.prix} $</p>
                                                        </div>
                                                    </Link>

                                                    {utilisateur.role === "CLIENT" || utilisateur.role === "ADMIN" && (
                                                    <div className="card-footer d-flex flex-column">
                                                        <div className="mt-auto">
                                                            {utilisateur.role === "CLIENT" && (
                                                                <button className="btn btn-dark w-100">Ajouter au
                                                                    panier</button>
                                                            )}
                                                            {utilisateur.role === "ADMIN" && (
                                                                <div className="container">
                                                                    <div
                                                                        className="d-flex justify-content-center gap-2">
                                                                        <Link to= {`/ModifierProduit/${product.id}`} className="btn btn-dark">
                                                                            <i className="bi bi-pencil-square me-2"></i>
                                                                            Modifier
                                                                    </Link>
                                                                        <Link to="#" onClick={() => handleDelete(product.id)} className="btn btn-dark">
                                                                            <i className="bi bi-trash me-2"></i>
                                                                            Supprimer
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    )}
                                                </div>
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
                        <div className="d-flex justify-content-center mt-5">Aucun produit ne réponds aux critères.</div>                    :
                    // en cas d'erreur de fetch avec le backend
                    <div className="alert alert-danger">{error.message}</div>
            }
        </>
    );
};
