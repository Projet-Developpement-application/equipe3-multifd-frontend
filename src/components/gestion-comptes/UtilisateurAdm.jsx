import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {fetchUtilisateur, getHistoriqueAdm, modifierUtilisateur} from "../../scripts/httpAdmin.js";
import {URL_ROUTE_FRONTEND} from "../../App.jsx";
import CommandeTable from "../compte/CommandeTable.jsx";

export default function UtilisateurAdm() {
    const {mail} = useParams();
    const [formData, setFormData] = useState(null);
    const [initialData, setInitialData] = useState(null);
    const [error, setError] = useState(null);
    const [devis, setDevis] = useState([]);
    const [isFetchingDevis, setIsFetchingDevis] = useState(false);
    const navigate = useNavigate();
    const [listeCommande, setListeCommande] = useState([]);

    useEffect(() => {
        fetchUtilisateur(mail)
            .then(data => {
                setFormData(data);
                setInitialData(data);
            })
            .catch(err => {
                console.error("Erreur lors de la récupération de l'utilisateur :", err);
                setError("Impossible de charger les informations de l'utilisateur.");
            });
    }, [mail]);

    useEffect(() => {
        setIsFetchingDevis(true);
        getHistoriqueAdm(mail)
            .then(value => {
                setListeCommande(value);
                setIsFetchingDevis(false);
            })
            .catch(reason => {
                setIsFetchingDevis(false);
                console.log(reason);
            });
    }, []);

    const handleClick = (id) => {
        navigate(`/commande/${id}`);
    };
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSave = () => {
        modifierUtilisateur(mail, formData)
            .then(() => {
                alert("Modifications sauvegardées avec succès !");
                setInitialData(formData);
            })
            .catch(err => {
                console.error("Erreur lors de la sauvegarde :", err);
                alert("Erreur lors de la sauvegarde des modifications.");
            });
    };

    const handleCancel = () => {
        setFormData(initialData);
    };

    const handleBack = () => {
        if (JSON.stringify(formData) !== JSON.stringify(initialData)) {
            if (window.confirm("Les modifications ne sont pas enregistrées. Voulez-vous vraiment quitter :( ?")) {
                navigate(-1);
            }
        } else {
            navigate(-1);
        }
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
                <div className="row mt-5 w-100 bg-light p-4">
                    <div className="col-12 col-md-10 mx-auto">
                        <div className="bg-white border border-2 rounded p-4 mb-5">
                            <h3 className="mb-3">Gestion des commandes</h3>
                            {isFetchingDevis ? (
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Chargement...</span>
                                </div>
                            ) : listeCommande.length === 0 ? (
                                <div>Aucune commande</div>
                            ) : (
                                <CommandeTable
                                    commandes={listeCommande}
                                    onClickRow={handleClick}
                                    afficherClient
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}