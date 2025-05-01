import React from "react";

function FiltreRadio({name, motAffiche, identifiant, valeur, togglefiltre, filtres, type}) {

    return (
        <div className="form-check">
            <input
                className="form-check-input"
                type="radio"
                name={name}
                id={identifiant}
                checked={filtres[name]===type}
                onChange={(e) =>
                    togglefiltre(name, valeur)
                }
            />
            <label className="form-check-label" htmlFor={identifiant}>
                {motAffiche}
            </label>
        </div>
    )

}
export default FiltreRadio;