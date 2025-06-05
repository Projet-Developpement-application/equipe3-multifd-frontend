import React from "react";

function FiltreMulti({typeFiltre, valeur, toggleFiltre, unite,filtres}) {
    return (
        <div className="form-check">
            <input
                className="form-check-input border-dark"
                type="checkbox"
                id={typeFiltre + valeur}
                name={typeFiltre + valeur}
                checked={filtres[typeFiltre].includes(valeur)}
                onChange={() =>
                    toggleFiltre(typeFiltre, valeur)
                }
            />
            <label className="form-check-label" htmlFor={typeFiltre + valeur}>{valeur} {unite}</label>
        </div>
    )

}
export default FiltreMulti;