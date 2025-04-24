import RetourSiteBar from "./RetourSiteBar.jsx";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {useUtilisateur} from "../../assets/contexte/UtilisateurContext.jsx";

export default function Navbar() {
    const { utilisateur, updateUtilisateur } = useUtilisateur();
    const navigate = useNavigate();

    /**
     * TEMPORAIRE SPRINT 1: permet d'effacer le session storage et de rediriger vers la page de connexion
     */
    const handleLogout = () => {
        sessionStorage.clear();
        updateUtilisateur({ role: null, email: null });
        navigate("/Connexion");
    };

    return (
        <>
            <RetourSiteBar />
            <nav className="navbar w-100 z-1 navbar-expand-lg text-white bg-dark" data-bs-theme="dark">
                <div className="container-fluid d-flex justify-content-between align-items-start">
                    <Link className="navbar-brand navbar-logo ps-5" to={"/"}>
                        MULTI-FD
                    </Link>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">

                            {/* Boutons pour les utilisateurs non-admin */}
                            {utilisateur.role !== "ADMIN" && (
                                <>
                                    <li className="nav-item me-4">
                                        <Link to="/compte" className="text-uppercase nav-link text-white hover-underline-animation left pb-1">
                                            <i className="bi bi-person me-2"></i> Mon Compte
                                        </Link>
                                    </li>
                                    <li className="nav-item me-4">
                                        <Link to="/panier" className="text-uppercase nav-link text-white hover-underline-animation left pb-1">
                                            <i className="bi bi-cart me-2"></i> Panier
                                        </Link>
                                    </li>
                                </>
                            )}

                            {utilisateur.role === "ADMIN" && (
                                <>
                                    <li className="nav-item me-4">
                                        <Link to="/GestionUtilisateur" className="text-uppercase nav-link text-white hover-underline-animation left pb-1">
                                            <i className="bi bi-people me-2"></i> Gestion Utilisateur
                                        </Link>
                                    </li>
                                    <li className="nav-item me-4">
                                        <Link to="/AjouterProduit" className="text-uppercase nav-link text-white hover-underline-animation left pb-1">
                                            <i className="bi bi-plus-circle me-2"></i> Ajouter un Produit
                                        </Link>
                                    </li>
                                </>
                            )}

                            <li className="nav-item me-4">
                                <button onClick={handleLogout} className="btn text-uppercase">
                                    <i className="bi bi-box-arrow-left"></i>
                                </button>
                            </li>
                        </ul>
                    </div>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>

            {/* Barre rouge pour l'administrateur */}
            {utilisateur.role === "ADMIN" && (
                <div className="w-100 bg-danger text-white text-center py-2">
                    Connecté Administrateur
                </div>
            )}

            <Outlet />
        </>
    );
}