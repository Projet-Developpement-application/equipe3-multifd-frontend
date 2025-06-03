import { useParams, useNavigate } from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import { getHistorique } from "../../scripts/httpClient.js";
import {UtilisateurContext} from "../../assets/contexte/UtilisateurContext.jsx";
import {getHistoriqueAdm, getHistoriqueAdmTout} from "../../scripts/httpAdmin.js";
import { cad } from "../../scripts/formatters.js"

export default function DevisDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [commande, setCommande] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const {utilisateur} = useContext(UtilisateurContext);

    useEffect(() => {
        if (!utilisateur) return;

        setIsFetching(true);
        const fetchData = async () => {
            try {
                let historique;
                if (utilisateur.role === "ADMIN") {
                    historique = await getHistoriqueAdmTout();
                    const cmd = historique.find((c) => String(c.id) === String(id));
                    setCommande(cmd || null);
                } else if (utilisateur.role === "CLIENT") {
                    historique = await getHistorique();
                    const cmd = historique.find((c) => String(c.id) === String(id));
                    setCommande(cmd || null);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsFetching(false);
            }
        };

        fetchData();
    }, [id, utilisateur]);

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
            <h3 className="my-5">Détails de la demande #{id}</h3>



            {isFetching ? (
                <p>Chargement...</p>
            ) : !commande ? (
                <p>Commande non trouvée.</p>
            ) : !commande.listeProduitPanier || commande.listeProduitPanier.length === 0 ? (
                <p>Aucun produit dans cette demande.</p>
            ) : (
                <>
                    <div className="mb-4">
                        <p><strong>Date de la demande : </strong>
                            {commande.date && new Date(commande.date).toLocaleString("fr-FR", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </p>
                        {utilisateur.role === "ADMIN" && commande.utilisateur && (
                            <>
                                <p><strong>Email du client :</strong> {commande.utilisateur.mail}</p>
                                <p><strong>Nom du client :</strong> {commande.utilisateur.prenom} {commande.utilisateur.nom}</p>
                            </>
                        )}
                        {commande.specification ? (
                            <div className="mb-4">
                                <p><strong>Spécification :</strong></p>
                                <div className="border p-3 bg-light rounded">{commande.specification}</div>
                            </div>
                        ) : (
                            <p className="text-muted"><em>Aucune spécification n'a été ajouté pour cette demande.</em></p>
                        )}

                    </div>

                    <table className="table table-bordered table-light">
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

                                <td>{cad.format(item.produit.prix)}</td>
                                <td>{cad.format((item.produit.prix * item.quantite))}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <div className="text-end mt-4">
                        <p>
                            <strong>Sous-total :</strong>{" "}
                            {cad.format(calculTotalTTC(commande.listeProduitPanier) / 1.14975)}
                        </p>
                        <p>
                            <strong>Taxes (15%) :</strong>{" "}
                            {cad.format(calculTotalTTC(commande.listeProduitPanier) * 0.14975 / 1.14975) }
                        </p>
                        <h5>
                            <strong>Total TTC :</strong> {cad.format(calculTotalTTC(commande.listeProduitPanier))}
                        </h5>
                    </div>
                    {
                        utilisateur.role === "CLIENT" &&
                        <button
                            className="btn btn-dark mb-3 bg-bleu-bouton"
                            onClick={() => navigate("/compte")}
                        >
                            <i className="bi bi-arrow-left"> </i> Retour à l'historique
                        </button>
                    }
                    {
                        utilisateur.role === "ADMIN" &&
                        <button
                            className="btn btn-dark bg-bleu-bouton mb-3"
                            onClick={() => navigate("/GestionUtilisateur")}
                        >
                            <i className="bi bi-arrow-left"> </i> Retour aux commandes
                        </button>
                    }

                </>
            )}
        </div>
    );
}
