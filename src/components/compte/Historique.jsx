import { useEffect, useState } from "react";
import { getHistorique } from "../../scripts/httpClient.js";
import { useNavigate } from "react-router-dom";

export default function Historique() {
    const navigate = useNavigate();
    const [listeCommande, setListeCommande] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        setIsFetching(true);
        getHistorique()
            .then(value => {
                setListeCommande(value);
                setIsFetching(false);
            })
            .catch(reason => {
                setIsFetching(false);
                console.log(reason);
            });
    }, []);

    const handleClick = (id) => {
        navigate(`/commande/${id}`);
    };

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                    <div className="bg-white border rounded shadow-sm p-4 mb-5">
                        <h5 className="fw-bold mb-4">Historique de devis</h5>
                        {isFetching ? (
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Chargement...</span>
                            </div>
                        ) : listeCommande.length === 0 ? (
                            <div>Aucun historique</div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-bordered table-hover align-middle mb-0">
                                    <thead className="table-light">
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Commande</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {listeCommande.map((item, index) => {
                                        const dateLisible = new Date(item.date).toLocaleString("fr-FR", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        });

                                        return (
                                            <tr
                                                key={item.id || index}
                                                onClick={() => handleClick(item.id)}
                                                style={{ cursor: "pointer" }}
                                            >
                                                <td>{dateLisible}</td>
                                                <td>{`Commande #${item.id}`}</td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
