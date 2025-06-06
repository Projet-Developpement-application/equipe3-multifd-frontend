import RetourSiteBar from "./RetourSiteBar.jsx";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {UtilisateurContext} from "../../assets/contexte/UtilisateurContext.jsx";
import {useContext, useEffect, useState} from "react";
import {URL_ROUTE_FRONTEND} from "../../App.jsx";
import logo from "../../assets/logo/logo.png";
import {getPanierEnCours} from "../../scripts/httpClient.js";


export default function Navbar({ panierCount, setPanierCount }) {
    const {utilisateur, setUtilisateur} = useContext(UtilisateurContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (utilisateur.role === "CLIENT") {
            getPanierEnCours()
                .then(panier => setPanierCount(panier.listeProduitPanier.length))
                .catch(() => setPanierCount(0));
        }
    }, [utilisateur]);

    /**
     * TEMPORAIRE SPRINT 1: permet d'effacer le session storage et de rediriger vers la page de connexion
     */
    const handleLogout = () => {
        sessionStorage.clear();
        setUtilisateur({
            mail: null, role: null, nom: '', prenom: '', entreprise: ''
        })

        navigate(URL_ROUTE_FRONTEND + "/Connexion");
    };

    return (<>
            <RetourSiteBar/>
            <nav className="navbar w-100 z-1 navbar-expand-lg text-white bg-bleu-fonce1" data-bs-theme="dark">
                <div className="container-fluid d-flex justify-content-between align-items-start">
                    <Link className="navbar-brand navbar-logo ps-5" to={URL_ROUTE_FRONTEND + "/"}>
                        <img src={logo} alt="Logo" style={{height: "40px"}} />
                    </Link>

                    <div className="collapse navbar-collapse " id="navbarNav">
                        <ul className="navbar-nav ms-auto  ">
                            {utilisateur.mail === null ? (/*utilisateur non connecté*/
                                <li className="nav-item me-4 ">
                                    <Link to={URL_ROUTE_FRONTEND + "/Connexion"}
                                          className="text-uppercase nav-link text-white hover-underline-animation left">
                                        <i className="bi bi-person me-2"></i> Connexion
                                    </Link>
                                </li>) : utilisateur.role === "ADMIN" ? (/*utilisateur connecté comme administrateur*/
                                <>
                                    <li className="nav-item me-4">
                                        <Link to={URL_ROUTE_FRONTEND + "/GestionUtilisateur"}
                                              className="text-uppercase nav-link text-white hover-underline-animation left pb-1">
                                            <i className="bi bi-people me-2"></i> <strong> Gestion Utilisateur</strong>
                                        </Link>
                                    </li>
                                    <li className="nav-item me-2">
                                        <Link to={URL_ROUTE_FRONTEND + "/AjouterProduit"}
                                              className="text-uppercase nav-link text-white hover-underline-animation left pb-1">
                                            <i className="bi bi-plus-circle me-2"></i> <strong> Ajouter un produit</strong>
                                        </Link>
                                    </li>
                                    <li className="nav-item me-4">
                                        <button onClick={handleLogout} className="btn text-uppercase">
                                            <i className="bi bi-box-arrow-left"></i>
                                        </button>
                                    </li>
                                </>) : utilisateur.role === "CLIENT" ? (/*utilisateur connnecté comme client*/
                                <>
                                    <li className="nav-item me-1">
                                        <div
                                            className="text-uppercase nav-link text-white  left pb-1">
                                            <i className="bi bi-emoji-smile me-1 text-center"></i> Bonjour {utilisateur.prenom}
                                        </div>

                                    </li>
                                    <li className="nav-item me-1">
                                        <Link to={URL_ROUTE_FRONTEND + "/compte"}
                                              className="text-uppercase nav-link text-white hover-underline-animation  left pb-1 ms-auto">
                                            <i className="bi bi-person me-1 text-center"></i> Mon Compte
                                        </Link>
                                    </li>
                                    <li className="nav-item me-1">
                                        <Link to={URL_ROUTE_FRONTEND + "/panier"}
                                              className="text-uppercase nav-link text-center text-white hover-underline-animation left pb-1">
                                            <i className={`bi ${panierCount > 0 ? "bi-cart-check" : "bi-cart"} me-1 text-center`}></i> Panier
                                        </Link>
                                    </li>
                                    <li className="nav-item me-2">
                                        <button onClick={handleLogout} className="btn text-uppercase nav-link">
                                           <i className="bi bi-box-arrow-left "></i>
                                        </button>
                                    </li>
                                </>) : undefined}
                        </ul>
                    </div>

                    <button className="navbar-toggler text-center" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>

            {/* Barre rouge pour l'administrateur */}
            {utilisateur.role === "ADMIN" && (<div className="w-100 bg-danger text-white text-center py-1 small">
                  <strong> Connecté Administrateur </strong>
                </div>)}

            <Outlet/>
        </>);
}