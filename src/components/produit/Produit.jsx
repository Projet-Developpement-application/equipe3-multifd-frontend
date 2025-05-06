import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProduitParId } from "../../scripts/http.js";

export default function Produit() {
    const { id } = useParams();
    const [produit, setProduit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const URL = "http://172.20.46.30/siteReact/equipe3-multifd-frontend";

    useEffect(() => {
        fetchProduitParId(id)
            .then(data => {
                setProduit(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Erreur lors du chargement du produit:", err);
                setError("Impossible de charger les informations du produit.");
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Chargement des informations du produit...</div>;
    }

    if (error) {
        console.log(produit);
        return <div className="alert alert-danger">{error}</div>;
    }

    return (

        <div className="container-fluid p-0">
            <div className="container py-5 mt-5">
                <div className="row mx-3">
                    <div className="col-12 col-lg-5 d-flex flex-column align-items-start mb-4 mb-lg-0">
                        <div
                            className="bg-light d-flex justify-content-center align-items-center mb-3 w-100"
                            style={{ height: "400px" }}
                        >
                            <img
                                src={produit && produit.image ? produit.image : "https://www.multifd.com/wp-content/uploads/2019/07/image-generique-600x600.jpg"}
                                alt="image du produit" className="object-fit-contain h-100 w-100"
                            />
                        </div>
                    </div>

                    <div className="col-12 col-lg-7 d-flex flex-column justify-content-between" style={{ minHeight: "400px" }}>
                        <div>
                            <h2><strong>{produit && produit.nom ? produit.nom : "Nom du produit indisponible"}</strong></h2>
                            <h4 className="text-dark">
                                <strong>{produit && produit.prix ? produit.prix + " $" : "Prix non disponible"} –</strong>{" "}
                                <span className={produit && produit.disponible ? "text-success" : "text-danger"}>
                                    {produit && produit.disponible ? "En stock" : "Indisponible"}
                                </span>
                            </h4>

                            <h4 className="mt-5"><strong>Détails du produit</strong></h4>
                            <table className="table w-lg-75 w-md-50">
                                <tbody>
                                <tr>
                                    <td className="pe-3 py-2" style={{ width: "40%" }}>État</td>
                                    <td className="py-2">{produit && produit.etat ? produit.etat : "Non spécifié"}</td>
                                </tr>
                                <tr>
                                    <td className="pe-3 py-2">Poids</td>
                                    <td className="py-2">{produit && produit.poids ? produit.poids + " kg" : "Non spécifié"}</td>
                                </tr>
                                <tr>
                                    <td className="pe-3 py-2">Voltage</td>
                                    <td className="py-2">{produit && produit.voltage ? produit.voltage + " V" : "Non spécifié"}</td>
                                </tr>
                                <tr>
                                    <td className="pe-3 py-2">Puissance (HP)</td>
                                    <td className="py-2">{produit && produit.hp ? produit.hp + " HP" : "Non spécifié"}</td>
                                </tr>
                                <tr>
                                    <td className="pe-3 py-2">Amperage</td>
                                    <td className="py-2">{produit && produit.amperage ? produit.amperage + " A" : "Non spécifié"}</td>
                                </tr>
                                <tr>
                                    <td className="pe-3 py-2">Courant</td>
                                    <td className="py-2">{produit && produit.courant ? produit.courant + " phases" : "Non spécifié"}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="d-flex justify-content-end w-100 w-lg-75 mt-5 mt-lg-5">
                            <Link to={URL+"/"} className="text-decoration-none">
                                <button className="btn btn-outline-dark ms-2">
                                    <i className="bi bi-arrow-left"></i> Retour à la boutique
                                </button>
                            </Link>
                            <button className="btn btn-dark ms-2">
                                <i className="bi bi-cart"></i> Ajouter au panier
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}