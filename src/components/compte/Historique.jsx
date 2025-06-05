import React, { useEffect, useState } from "react";
import { getHistorique } from "../../scripts/httpClient.js";
import { useNavigate } from "react-router-dom";
import CommandeTable from "./CommandeTable.jsx";

import { cad } from "../../scripts/formatters.js"

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
        <div className="row mt-5  bg-light">
            <div className="col-12">
                <div className="bg-gris-plus-pale border border-2 rounded p-4 mb-5">
                    <h3 className="mb-3">Historique de devis</h3>
                    {isFetching ? (
                        <div className="spinner-border" role="status">
                        </div>
                    ) : listeCommande.length === 0 ? (
                        <div>Aucun historique</div>
                    ) : (
                        <CommandeTable commandes={listeCommande} onClickRow={handleClick}/>
                    )}
                </div>
            </div>
        </div>
    );
}
