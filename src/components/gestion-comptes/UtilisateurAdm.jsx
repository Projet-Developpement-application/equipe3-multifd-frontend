import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUtilisateur, modifierUtilisateur } from "../../scripts/http.js";

export default function UtilisateurAdm() {
    const { mail } = useParams();
    const [formData, setFormData] = useState(null);
    const [initialData, setInitialData] = useState(null);
    const [error, setError] = useState(null);
    const [devis, setDevis] = useState([]);
    const [isFetchingDevis, setIsFetchingDevis] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUtilisateur(mail)
            .then(data => {
                setFormData(data);
                setInitialData(data); // Stocke les données initiales
            })
            .catch(err => {
                console.error("Erreur lors de la récupération de l'utilisateur :", err);
                setError("Impossible de charger les informations de l'utilisateur.");
            });

        setIsFetchingDevis(true);
        setTimeout(() => {
            const fakeDevis = [
                { id: 1, date: "2023-10-01", montant: 150.0 },
                { id: 2, date: "2023-09-15", montant: 200.5 },
                { id: 3, date: "2023-08-30", montant: 99.99 },
            ];
            setDevis(fakeDevis);
            setIsFetchingDevis(false);
        }, 1000);
    }, [mail]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        modifierUtilisateur(mail, formData)
            .then(() => {
                alert("Modifications sauvegardées avec succès !");
                setInitialData(formData); // Met à jour les données initiales
            })
            .catch(err => {
                console.error("Erreur lors de la sauvegarde :", err);
                alert("Erreur lors de la sauvegarde des modifications.");
            });
    };

    const handleCancel = () => {
        setFormData(initialData); // Réinitialise les données du formulaire
    };

    const handleBack = () => {
        if (JSON.stringify(formData) !== JSON.stringify(initialData)) {
            if (window.confirm("Les modifications ne sont pas enregistrées. Voulez-vous vraiment quitter ?")) {
                navigate(-1); // Retourne à la page précédente
            }
        } else {
            navigate(-1);
        }
    };

    const handleViewDevis = (id) => {
        navigate(`/devis/${id}`);
    };

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!formData) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status"></div>
            </div>
        );
    }

    return (
        <div className="container pt-5">
            <h2 className="fw-bold mb-4">Modifier les informations de l'utilisateur</h2>
            <form className="border rounded border-2 p-4 bg-light">
                <h3 className="mb-4">Informations personnelles</h3>
                <div className="row mb-2">
                    <div className="col-md-6">
                        <label className="form-label"><strong>Nom</strong></label>
                        <input
                            type="text"
                            name="nom"
                            className="form-control"
                            value={formData.nom}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label"><strong>Prénom</strong></label>
                        <input
                            type="text"
                            name="prenom"
                            className="form-control"
                            value={formData.prenom}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row mb-5">
                    <div className="col-md-6">
                        <label className="form-label"><strong>Courriel</strong></label>
                        <input
                            type="email"
                            name="mail"
                            className="form-control"
                            value={formData.mail}
                            disabled
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label"><strong>Entreprise</strong></label>
                        <input
                            type="text"
                            name="entreprise"
                            className="form-control"
                            value={formData.entreprise}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-end gap-2">
                    <button type="button" className="btn btn-secondary me-auto" onClick={handleBack}>
                        Retour
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                        Annuler
                    </button>
                    <button type="button" className="btn btn-dark" onClick={handleSave}>
                        Sauvegarder
                    </button>
                </div>
            </form>

            <div className="mt-5">
                <h3 className="mb-4">Historique des devis</h3>
                {isFetchingDevis ? (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status"></div>
                    </div>
                ) : (
                    <>
                        {devis.map(devis => (
                            <div key={devis.id} className="row border border-dark p-3 m-4 bg-light rounded">
                                <div className="col-8">
                                    <h5 className="mb-3">{devis.date}</h5>
                                    <h6 className="mb-3">{devis.montant.toFixed(2)} $</h6>
                                </div>
                                <div className="col-4 d-flex justify-content-end align-items-center">
                                    <button
                                        className="btn btn-dark"
                                        onClick={() => handleViewDevis(devis.id)}>
                                        Voir
                                    </button>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}