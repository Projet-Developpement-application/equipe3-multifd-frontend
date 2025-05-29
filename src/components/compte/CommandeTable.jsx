import React from "react";
import {cad} from "../../scripts/formatters.js";

export default function CommandeTable({ commandes, onClickRow}) {
    const calculTotalTTC = (listeProduitPanier) => {
        if (!Array.isArray(listeProduitPanier)) return "N/A";
        const sousTotal = listeProduitPanier.reduce(
            (acc, item) => acc + item.produit.prix * item.quantite,
            0
        );
        const tps = sousTotal * 0.05;
        const tvq = sousTotal * 0.09975;
        return cad.format(sousTotal + tps + tvq);
    };

    return (
        <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle mb-0">
                <thead className="table-primary border-1">
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Total</th>
                </tr>
                </thead>
                <tbody>
                {commandes.map((item, index) => {
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
                            onClick={() => onClickRow(item.id)}
                            style={{ cursor: "pointer" }}
                        >
                            <td>{dateLisible}</td>
                            <td>{calculTotalTTC(item.listeProduitPanier)}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}
