import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProduitParId } from "../../scripts/http.js";

export default function Produit() {
    const { id } = useParams();
    const [produit, setProduit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <>
            <div className="container-fluid p-0">
                <div className="container py-5 mt-5">
                    <div className="row mx-3">
                        <div className="col-12 col-lg-5 d-flex flex-column align-items-start mb-4 mb-lg-0">
                            <div className="bg-light d-flex justify-content-center align-items-center mb-3 w-100"
                                 style={{ height: "400px" }}>
                                <img
                                    src={produit.image || "https://www.multifd.com/wp-content/uploads/2019/07/image-generique-600x600.jpg"}
                                    alt={`Image de ${produit.nom}`}
                                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                                />
                            </div>
                        </div>

                        <div className="col-12 col-lg-7 d-flex flex-column justify-content-between"
                             style={{ minHeight: '400px' }}>
                            <div>
                                <h2><strong>{produit.nom}</strong></h2>
                                <h4 className="text-dark">
                                    <strong>{produit.prix} $ –</strong> <span className="text-success"> En stock</span>
                                </h4>

                                <h4 className="mt-5"><strong>Caractéristiques</strong></h4>
                                <table className="table w-lg-75 w-md-50" style={{ minHeight: '240px' }}>
                                    <tbody>
                                    {produit.caracteristiques.map((caracteristique, index) => (
                                        <tr key={index} className="align-middle">
                                            <td className="pe-3 py-2" style={{ width: "40%" }}>{caracteristique.nom}</td>
                                            <td className="py-2">{caracteristique.valeur}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="d-flex justify-content-end w-100 w-lg-75 mt-3 mt-lg-0">
                                <Link to={"/"} className={"text-decoration-none"}>
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
        </>
    );
}