import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import image from "../../assets/generique.jpg"
import {fetchAllProduits} from "../../scripts/http.js";
import {UtilisateurContext} from "../../assets/contexte/UtilisateurContext.jsx";
import {URL_BACKEND, URL_ROUTE_FRONTEND} from "../../App.jsx";
import {supprimerProduit} from "../../scripts/httpAdmin.js";
import { cad } from "../../scripts/formatters.js"

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
                            <div className="container mt-4 pt-4 flex-grow-1 ">
                                <div className="row g-4">
                                    {currentProducts.map((product) => (
                                        <div key={product.id} className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
                                            <div
                                                    className="card  h-100 border-2 rounded-top shadow-lg product-card-hover bg-gris-plus-pale">
                                                    <Link to={URL_ROUTE_FRONTEND+`produit/${product.id}`}
                                                          className="text-decoration-none text-dark">
                                                        {product.imagePath != null ? (
                                                            <img src={`${URL_BACKEND}/uploads/images/${product.imagePath}`} className="card-img-top rounded-top img-produit-fixe"
                                                                 alt={product.nom}/>
                                                        ):<img src={image} className="card-img-top rounded-top img-produit-fixe"
                                                               alt={product.nom}/>}

                                                        <div className="card-body d-flex flex-column">
                                                            <h5 className="card-title fs-4">{product.nom}</h5>
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <p className="card-title ">{product.marque.nom}</p>
                                                            </div>
                                                            <div className="d-flex justify-content-end align-items-center">
                                                                <p className="card-title mb-0 mt-2 texte-bleu-bouton fs-5">{cad.format(product.prix)} </p>
                                                            </div>
                                                        </div>
                                                    </Link>

                                                    {utilisateur.role === "CLIENT" || utilisateur.role === "ADMIN" && (
                                                    <div className=" d-flex flex-column mb-1">
                                                        <div className="mt-auto">

                                                            {utilisateur.role === "ADMIN" && (
                                                                <div className="card-footer p-2">
                                                                    <div className="row g-2">
                                                                        <div className="col-12 col-md-6">
                                                                            <Link
                                                                                to={URL_ROUTE_FRONTEND+`/ModifierProduit/${product.id}`}
                                                                                className="btn btn-dark w-100 d-flex align-items-center justify-content-center gap-2"
                                                                            >
                                                                                <i className="bi bi-pencil-square"></i>
                                                                                <span>Modifier</span>
                                                                            </Link>
                                                                        </div>
                                                                        <div className="col-12 col-md-6">
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => handleDelete(product.id)}
                                                                                className="btn btn-dark w-100 d-flex align-items-center justify-content-center gap-2"
                                                                            >
                                                                                <i className="bi bi-trash"></i>
                                                                                <span>Supprimer</span>
                                                                            </button>
                                                                        </div>
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
                                <ul className="pagination justify-content-center mt-5 mb-0">
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
