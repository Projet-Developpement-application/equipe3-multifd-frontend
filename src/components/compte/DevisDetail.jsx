import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getHistorique } from "../../scripts/httpClient.js";

export default function DevisDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [commande, setCommande] = useState(null);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        setIsFetching(true);
        getHistorique()
            .then((historique) => {
                const cmd = historique.find((c) => String(c.id) === String(id));
                setCommande(cmd || null);
                setIsFetching(false);
            })
            .catch((error) => {
                console.error(error);
                setIsFetching(false);
            });
    }, [id]);

    const calculTotalTTC = (listeProduitPanier) => {
        if (!Array.isArray(listeProduitPanier) || listeProduitPanier.length === 0) return 0;
        const sousTotal = listeProduitPanier.reduce(
            (acc, item) => acc + (item.produit?.prix || 0) * (item.quantite || 0),
            0
        );
        const tps = sousTotal * 0.05;
        const tvq = sousTotal * 0.09975;
        return sousTotal + tps + tvq;
    };

    return (
        <div className="container py-4">
            <h3 className="my-5">Détails de la commande #{id}</h3>



            {isFetching ? (
                <p>Chargement...</p>
            ) : !commande ? (
                <p>Commande non trouvée.</p>
            ) : !commande.listeProduitPanier || commande.listeProduitPanier.length === 0 ? (
                <p>Aucun produit dans cette commande.</p>
            ) : (
                <>
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>Nom du produit</th>
                            <th>Quantité</th>
                            <th>Prix unitaire</th>
                            <th>Sous-total</th>
                        </tr>
                        </thead>
                        <tbody>
                        {commande.listeProduitPanier.map((item, index) => (
                            <tr key={index}>
                                <td>{item.produit.nom}</td>
                                <td>{item.quantite}</td>
                                <td>{item.produit.prix.toFixed(2)} $</td>
                                <td>{(item.produit.prix * item.quantite).toFixed(2)} $</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <div className="text-end mt-4">
                        <p>
                            <strong>Sous-total :</strong>{" "}
                            {(calculTotalTTC(commande.listeProduitPanier) / 1.14975).toFixed(2)} $ CAD
                        </p>
                        <p>
                            <strong>Taxes (15%) :</strong>{" "}
                            {(calculTotalTTC(commande.listeProduitPanier) * 0.15 / 1.14975).toFixed(2)} $ CAD
                        </p>
                        <h5>
                            <strong>Total TTC :</strong> {calculTotalTTC(commande.listeProduitPanier).toFixed(2)} $ CAD
                        </h5>
                    </div>
                    <button
                        className="btn btn-secondary mb-3"
                        onClick={() => navigate("/compte")}
                    >
                        ← Retour à l'historique
                    </button>
                </>
            )}
        </div>
    );
}
