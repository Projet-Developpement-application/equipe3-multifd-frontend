import React from "react";

function FiltreMulti({typeFiltre, valeur, handleChange, unite}) {

    return (
        <div className="form-check">
            <input
                className="form-check-input"
                type="checkbox"
                id={typeFiltre + valeur}
                name={typeFiltre + valeur}
                onChange={(e) =>
                    handleChange(typeFiltre, valeur, e.target.checked)
                }
            />
            <label className="form-check-label" htmlFor={typeFiltre + valeur}>{valeur} {unite}</label>
        </div>
    )

}
export default React.memo(FiltreMulti);