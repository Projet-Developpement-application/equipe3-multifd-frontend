import {Link} from "react-router-dom";

export default function Produit() {
    return (
        <>
            <div className="container-fluid p-0">


                <div className="container py-5 mt-5">
                    <div className="row mx-3">
                        <div className="col-12 col-lg-5 d-flex flex-column align-items-start mb-4 mb-lg-0">
                            <div className="bg-light d-flex justify-content-center align-items-center mb-3 w-100"
                                 style={{height: "400px"}}>
                                <img
                                    src="https://www.multifd.com/wp-content/uploads/2019/07/image-generique-600x600.jpg"
                                    alt="image du produit"
                                    style={{maxWidth: "100%", maxHeight: "100%", objectFit: "contain"}}
                                />
                            </div>

                        </div>

                        <div className="col-12 col-lg-7 d-flex flex-column justify-content-between"
                             style={{minHeight: '400px'}}>
                            <div>
                                <h2><strong>ABB - ACSM1-04AM-012A-4</strong></h2>
                                <h4 className="text-dark">
                                    <strong>1850.00 $ –</strong> <span className="text-success"> En stock</span>
                                </h4>

                                <h4 className="mt-5"><strong>Caractéristiques</strong></h4>
                                <table className="table w-lg-75 w-md-50" style={{minHeight: '240px'}}>
                                    <tbody>
                                    <tr className="align-middle">
                                        <td className="pe-3 py-2" style={{width: "40%"}}>Poids</td>
                                        <td className="py-2">kg</td>
                                    </tr>
                                    <tr className="align-middle">
                                        <td className="pe-3 py-2">Voltage</td>
                                        <td className="py-2">V</td>
                                    </tr>
                                    <tr className="align-middle">
                                        <td className="pe-3 py-2">HP</td>
                                        <td className="py-2">HP</td>
                                    </tr>
                                    <tr className="align-middle">
                                        <td className="pe-3 py-2">État</td>
                                        <td className="py-2">(NEUF)</td>
                                    </tr>
                                    <tr className="align-middle">
                                        <td className="pe-3 py-2">Ampérage</td>
                                        <td className="py-2">A</td>
                                    </tr>
                                    <tr className="align-middle">
                                        <td className="pe-3 py-2">Courant</td>
                                        <td className="py-2">Phase</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div
                                className="d-flex justify-content-end  w-100 w-lg-75 mt-3 mt-lg-0">
                                <Link to={"/"} className={"text-decoration-none "}>
                                    <button className="btn btn-outline-dark ms-2">
                                        <i className="bi bi-arrow-left"></i> Retour à la boutique
                                    </button>
                                </Link>
                                <button className="btn  btn-dark ms-2">
                                    <i className="bi bi-cart"></i> Ajouter au panier
                                </button>
                                {/* Quand le produit est ajouté au Panier faire apparaître un pop-up,
                                ou un moyen de confirmation que l'ajout au panier*/}


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
