import {useState} from "react";

const CompteForm = ({ informations, onSave, onCancel }) => {
    const [formData, setFormData] = useState({ ...informations });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData); // Sauvegarde vers le parent
    };

    return (
        <form className="border p-3 rounded" onSubmit={handleSubmit}>
            <fieldset>
                <legend className="h6 mb-3">Mes informations de contact</legend>

                <div className="row mb-2">
                    <div className="col-md-6">
                        <label htmlFor="nom" className="form-label mb-1">Nom</label>
                        <input
                            type="text"
                            className="form-control form-control-sm text-muted"
                            id="nom"
                            value={formData.nom}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="prenom" className="form-label mb-1">Prénom</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="prenom"
                            value={formData.prenom}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="row mb-2">
                    <div className="col-md-6">
                        <label htmlFor="courriel" className="form-label mb-1">Courriel</label>
                        <input
                            type="email"
                            className="form-control form-control-sm"
                            id="courriel"
                            value={formData.courriel}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="telephone" className="form-label mb-1">Téléphone</label>
                        <input
                            type="tel"
                            className="form-control form-control-sm"
                            id="telephone"
                            value={formData.telephone}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="mb-2">
                    <label htmlFor="entreprise" className="form-label mb-1">Entreprise</label>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        id="entreprise"
                        value={formData.entreprise}
                        onChange={handleChange}
                    />
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="adresse" className="form-label mb-1">Adresse</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="adresse"
                            value={formData.adresse}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="ville" className="form-label mb-1">Ville</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="ville"
                            value={formData.ville}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onCancel}>
                        Retour
                    </button>
                    <button type="submit" className="btn btn-secondary btn-sm">
                        Enregistrer
                    </button>
                </div>
            </fieldset>
        </form>
    );
};

export default CompteForm;
