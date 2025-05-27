import React, { useState } from "react";
import "/src/compte.css";
const CompteForm = ({ informations, onSave, onCancel }) => {
    const [formData, setFormData] = useState(informations);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.nom) newErrors.nom = "Le nom est requis";
        if (!formData.prenom) newErrors.prenom = "Le prénom est requis";
        if (!formData.entreprise) newErrors.entreprise = "L'entreprise est requise";
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSave(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-light">
            <div className="border rounded border-2 p-4">
                <h3 className="mb-3">Modifier mes informations de contact</h3>

                <div className="row mb-2">
                    <div className="col-md-6">
                        <label htmlFor="nom" className="form-label"><strong>Nom</strong></label>
                        <input
                            type="text"
                            id="nom"
                            name="nom"
                            className="form-control"
                            value={formData.nom}
                            onChange={handleChange}
                        />
                        {errors.nom && <div className="text-danger">{errors.nom}</div>}
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="prenom" className="form-label"><strong>Prénom</strong></label>
                        <input
                            type="text"
                            id="prenom"
                            name="prenom"
                            className="form-control"
                            value={formData.prenom}
                            onChange={handleChange}
                        />
                        {errors.prenom && <div className="text-danger">{errors.prenom}</div>}
                    </div>
                </div>

                <div className="row mb-2">
                    <div className="col-md-6">
                        <label htmlFor="entreprise" className="form-label"><strong>Entreprise</strong></label>
                        <input
                            type="text"
                            id="entreprise"
                            name="entreprise"
                            className="form-control"
                            value={formData.entreprise}
                            onChange={handleChange}
                        />
                        {errors.entreprise && <div className="text-danger">{errors.entreprise}</div>}
                    </div>
                </div>


                <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-dark btn-sm" onClick={onCancel}>
                        Annuler
                    </button>

                    <button type="submit" className="btn btn-dark btn-sm ml-2">
                        Sauvegarder
                    </button>
                </div>
            </div>
        </form>
    );
};

export default CompteForm;
