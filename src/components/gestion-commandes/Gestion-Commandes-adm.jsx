import React, { useEffect, useState } from "react";
import { getHistorique } from "../../scripts/httpClient.js";
import { useNavigate } from "react-router-dom";
import {getHistoriqueTout} from "../../scripts/httpAdmin.js";
import CommandeTable from "../compte/CommandeTable.jsx";

export default function GestionCommandesAdm() {
    const navigate = useNavigate();
    const [listeCommande, setListeCommande] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        setIsFetching(true);
        getHistoriqueTout()
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
        <div className="row mt-5 w-100 bg-light p-4">
            <div className="col-12 col-md-10 mx-auto">
                <div className="bg-white border border-2 rounded p-4 mb-5">
                    <h3 className="mb-3">Gestion des commandes</h3>
                    {isFetching ? (
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Chargement...</span>
                        </div>
                    ) : listeCommande.length === 0 ? (
                        <div>Aucune commande</div>
                    ) : (
                        <CommandeTable
                            commandes={listeCommande}
                            onClickRow={handleClick}
                            afficherClient
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
