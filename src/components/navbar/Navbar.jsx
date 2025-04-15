
import logoNavbar from "../../assets/logo/logo-navbar.png";
import RetourSiteBar from "./RetourSiteBar.jsx";
import {Link, Outlet} from "react-router-dom";


export default function Navbar() {
    return (
        <>
        <RetourSiteBar/>
        <nav className="navbar w-100 z-1 navbar-expand-lg text-white bg-dark" data-bs-theme="dark">
            <div className="container-fluid d-flex flex-column align-items-start position-relative">
                <div className="container-fluid ">
                    <Link to={"/"}> <a className="navbar-brand navbar-logo ">
                        <img src={logoNavbar} alt="logo-multi-fd"  height="100" />
                    </a></Link>
                </div>

                <div className="collapse navbar-collapse w-100" id="navbarNav">
                    <ul className="navbar-nav align-items-center ms-auto">
                        <li className="nav-item me-5">
                            <button className="nav-link btn btn-navbar left pb-0 mb-2 text-uppercase">
                                <Link to="/compte" className="text-decoration-none">  <i className="bi bi-person me-2"></i> Mon Compte </Link>
                            </button>
                        </li>
                        <li className="nav-item me-5">
                            <button className="nav-link btn btn-navbar left pb-0 mb-2 text-uppercase">
                                <Link to="/panier" className="text-decoration-none">  <i className="bi bi-cart me-2"></i> Panier </Link>
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
            <Outlet />

        </>
    );
}
