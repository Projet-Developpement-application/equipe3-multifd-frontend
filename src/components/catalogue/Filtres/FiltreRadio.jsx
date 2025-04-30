import React from "react";

function FiltreRadio({name, motAffiche, identifiant, valeur, handleChange}) {


    return (
        <div className="form-check">
            <input
                className="form-check-input"
                type="radio"
                name={name}
                id={identifiant}
                onChange={(e) =>
                    handleChange(name, valeur, e.target.checked)
                }
            />
            <label className="form-check-label" htmlFor={identifiant}>
                {motAffiche}
            </label>
        </div>
    )

}
export default FiltreRadio;