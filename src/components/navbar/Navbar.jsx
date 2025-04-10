export default function Navbar(){
    return (
        <nav className="navbar position-fixed w-100 z-1 navbar-expand-lg text-white bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand  m-2" href="#">MULTI FD</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav align-items-end ms-auto ">
                        <li className="nav-item me-5">
                            <button
                                className="nav-link btn btn-navbar left pb-0 mb-2 " href="#"> Panier
                            </button>
                        </li>
                        <li className="nav-item me-5">
                            <button
                                className="nav-link btn btn-navbar left pb-0 mb-2" href="#"> Mon Compte
                            </button>
                        </li>

                        <li className="nav-item me-3">
                            <button className="nav-link btn btn-navbar " href="#"><i className="bi bi-github"> </i>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>)


}