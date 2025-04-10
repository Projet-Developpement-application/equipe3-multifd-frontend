import React, { useState } from "react";

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
        // Validation simple des champs
        if (!formData.nom) newErrors.nom = "Le nom est requis";
        if (!formData.prenom) newErrors.prenom = "Le prénom est requis";
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!formData.courriel) {
            newErrors.courriel = "Le courriel est requis";
        } else if (!emailRegex.test(formData.courriel)) {
            newErrors.courriel = "Le courriel n'est pas valide";
        }
        if (!formData.telephone) newErrors.telephone = "Le téléphone est requis";
        if (!formData.entreprise) newErrors.entreprise = "L'entreprise est requise";
        if (!formData.adresse) newErrors.adresse = "L'adresse est requise";
        if (!formData.ville) newErrors.ville = "La ville est requise";

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
        <form onSubmit={handleSubmit}>
            <div className="border p-3 rounded">
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
                        <label htmlFor="courriel" className="form-label">Courriel</label>
                        <input
                            type="text"
                            id="courriel"
                            name="courriel"
                            className="form-control"
                            value={formData.courriel}
                            onChange={handleChange}
                        />
                        {errors.courriel && <div className="text-danger">{errors.courriel}</div>}
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="telephone" className="form-label"><strong>Téléphone</strong></label>
                        <input
                            type="tel"
                            id="telephone"
                            name="telephone"
                            className="form-control"
                            value={formData.telephone}
                            onChange={handleChange}
                        />
                        {errors.telephone && <div className="text-danger">{errors.telephone}</div>}
                    </div>
                </div>

                <div className="mb-2">
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

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="adresse" className="form-label"><strong>Adresse</strong></label>
                        <input
                            type="text"
                            id="adresse"
                            name="adresse"
                            className="form-control"
                            value={formData.adresse}
                            onChange={handleChange}
                        />
                        {errors.adresse && <div className="text-danger">{errors.adresse}</div>}
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="ville" className="form-label"><strong>Ville</strong></label>
                        <input
                            type="text"
                            id="ville"
                            name="ville"
                            className="form-control"
                            value={formData.ville}
                            onChange={handleChange}
                        />
                        {errors.ville && <div className="text-danger">{errors.ville}</div>}
                    </div>
                </div>
                <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onCancel}>Annuler</button>

                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-dark btn-sm ml-2">Sauvegarder</button>
                </div>
            </div>
        </form>
    );
};

export default CompteForm;
