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
            <button className="btn btn-outline-dark-flex align-items-center ms-3 bg-white" onClick={onFilterClick}>
                <i className="bi bi-funnel-fill me-2"></i> Filtrer
            </button>
            <div className="input-group me-4" style={{maxWidth: "300px"}}>
                <input
                    type="text"
                    className="form-control "
                    placeholder="Rechercher..."
                    value={filtres.nom || ""}
                    onChange={handleSearch}
                />
            </div>
        </div>
    );
};