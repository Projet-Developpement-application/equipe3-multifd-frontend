import RetourSiteBar from "./RetourSiteBar.jsx";
import {Link, Outlet} from "react-router-dom";

export default function Navbar() {
    return (
        <>
            <RetourSiteBar/>
            <nav className="navbar w-100 z-1 navbar-expand-lg text-white bg-dark" data-bs-theme="dark">
                <div className="container-fluid d-flex justify-content-between align-items-start">
                    {/* Logo */}
                    <Link className="navbar-brand navbar-logo ps-5" to={"/"}>
                        MULTI-FD
                    </Link>

                    {/* Liens */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item me-4 ">
                                    <Link to="/compte" className="text-uppercase nav-link text-white hover-underline-animation left pb-1">
                                        <i className="bi bi-person me-2"></i> Mon Compte
                                    </Link>
                            </li>
                            <li className="nav-item me-4 ">
                                    <Link to="/panier" className="text-uppercase nav-link text-white hover-underline-animation left pb-1">
                                        <i className="bi bi-cart me-2"></i> Panier
                                    </Link>
                            </li>
                        </ul>
                    </div>


                    {/* Toggler pour mobile */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>
            <Outlet />
        </>
    );
}
