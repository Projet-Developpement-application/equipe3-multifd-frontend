import React from "react";

const SearchFilterBar = ({ searchTerm, onSearchChange }) => {
    return (
        <div className="d-flex justify-content-between align-items-center mb-4 barre-recherche pt-2 pb-2">

            <button className="btn btn-outline-primary d-flex align-items-center ms-3 bg-white">
                <i className="bi bi-funnel-fill me-2"> </i> Filtrer
            </button>

            {/* Barre de recherche */}
            <div className="input-group me-4 " style={{maxWidth: "300px"}}>
                <input
                    type="text"
                    className="form-control bordure-recherche-input"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={onSearchChange}
                />
                <button className="btn btn-outline-primary d-flex align-items-center bg-gris-plus-pale">
                    <i className="bi bi-search"> </i></button>

            </div>
        </div>
    );
};

export default SearchFilterBar;
