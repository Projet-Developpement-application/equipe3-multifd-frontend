import React, {useState} from "react";
import {useProduits} from "../../assets/contexte/ProduitContext.jsx";
import {fetchProduitFilter} from "../../scripts/http.js";

export default function ZoneRecherhe({onFilterClick}) {
    const {produits,setProduits} = useProduits();
    //TODO transformer en ref
    const [motCle, setMotCle] = useState("");


    async function search() {
        try {
            const data = await fetchProduitFilter(motCle);
            setProduits(data); // ou filtrerProduit(data) si tu l’ajoutes au contexte
        } catch (err) {
            console.error("Erreur filtrage:", err);
        }
    }

    return (
        <div className="d-flex justify-content-between align-items-center mb-4 barre-recherche pt-2 pb-2">
            <button className="btn btn-outline-dark-flex align-items-center ms-3 bg-white" onClick={onFilterClick}>
                <i className="bi bi-funnel-fill me-2"></i> Filtrer
            </button>
            <div className="input-group me-4" style={{maxWidth: "300px"}}>
                <input
                    type="text"
                    className="form-control "
                    placeholder="Rechercher..."
                    onChange={(e) =>
                        setMotCle(e.target.value)
                    }
                />
                <button className="btn  btn-dark d-flex align-items-center " onClick={search}>
                    <i className="bi bi-search"></i>
                </button>
            </div>
        </div>
    );
};