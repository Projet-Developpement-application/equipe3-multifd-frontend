import React from "react";

export default function ZoneRecherhe({onFilterClick,filtres, setFiltres}) {

    const handleSearch = (e) => {
        setFiltres(prev => ({
            ...prev,
            nom: e.target.value // Ajoute un filtre pour le nom
        }));
    };

    return (
        <div className="d-flex justify-content-between align-items-center mb-4 barre-recherche pt-2 pb-2">
            <button className="btn btn-light d-flex align-items-center ms-3" onClick={onFilterClick}>
                <i className="bi bi-funnel"></i>
                <span className="d-none d-md-inline ms-2">Filtrer</span>
            </button>
            <div className="input-group me-3" style={{maxWidth: "300px"}}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Rechercher le nom d'un produit..."
                    value={filtres.nom || ""}
                    onChange={handleSearch}
                />
            </div>
        </div>
    );
};