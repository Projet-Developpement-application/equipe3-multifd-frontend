import React, { useState, useEffect } from "react";
import BarreRechercheFiltre from "./Barre-recherche-filtre.jsx";
import Sidebar from "./Sidebar.jsx";
import { Link } from "react-router-dom";
import image from "../../assets/generique.jpg"
import {useProduits} from "../../assets/contexte/ProduitContext.jsx";

const Catalogue = () => {

    const {produits} = useProduits()
    const [pageCourrante, setPageCourrante] = useState(1);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const maxProduitPage = 20;

    if (!produits.length) {
        return <div>Chargement des produits...</div>;
    }

    const totalPages = Math.ceil(produits.length / maxProduitPage);
    const indexDernierProduit = pageCourrante * maxProduitPage;
    const indexPremierProduit = indexDernierProduit - maxProduitPage;
    const currentProducts = produits.slice(indexPremierProduit, indexDernierProduit);

    const paginate = (pageNumber) => setPageCourrante(pageNumber);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <>
            <BarreRechercheFiltre searchTerm={""} onSearchChange={""} onFilterClick={toggleSidebar} />
            {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
            <div className="d-flex flex-column min-vh-100">
                <div className="container mt-5 pt-5 flex-grow-1">
                    <div className="row">
                        {currentProducts.map((product) => (
                            <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                                <Link to={`/produit/${product.id}`} className="text-decoration-none">
                                    <div className="card h-100 border-1 rounded shadow-lg product-card-hover">
                                        <img src={image} className="card-img-top rounded-top"
                                             alt={product.nom}/>
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title">{product.nom}</h5>
                                            <p className="card-text">{product.description}</p>
                                            <div className="mt-auto">
                                                <p className="card-text fw-bold">{product.prix} $</p>
                                                <button className="btn btn-dark w-100">Ajouter au panier</button>
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
                            <li key={index} className={`page-item ${pageCourrante === index + 1 ? "active" : ""}`}>
                                <button onClick={() => paginate(index + 1)} className="page-link">
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default Catalogue;
