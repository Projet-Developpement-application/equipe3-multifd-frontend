import React, {useEffect, useRef, useState} from 'react';
import {
    ajouteSpecificationPanier,
    changeQuantity,
    fetchUtilisateur, finirCommmande,
    getPanierEnCours,
    supprimerProduitFromPanier
} from "../../scripts/httpClient.js";

function DevisForm() {
    const [panier, setPanier] = useState({
        id: 0,
        status: null,
        date: null,
        specification: null,
        utilisateur: null,
        listeProduitPanier: []
    });
    const [contactMethod, setContactMethod] = useState('Courriel');
    const [contactValue, setContactValue] = useState('');
    const [isFetching, setIsFetching] = useState(true);
    let specification;
    let totalHT, totalTVA, totalTTC;

    useEffect(() => {
        setIsFetching(true);
        fetchUtilisateur(sessionStorage.getItem("mail")).then(r => {
            setContactValue(r.username);
        });

        getPanierEnCours()
            .then(value => {
                setPanier(value);
                setIsFetching(false)
            })
            .catch(() => {
                setIsFetching(false)
            });
    }, []);

    function handleChangeQuantite(e, produitPanier) {
        const nouveauProduit = {...produitPanier, quantite: parseInt(e.target.value)};

        if (isNaN(nouveauProduit.quantite) || nouveauProduit.quantite <= 0) return;
        changeQuantity(nouveauProduit);
        setPanier((ancienPanier) => ({
            ...ancienPanier,
            listeProduitPanier: ancienPanier.listeProduitPanier.map(p =>
                p.id === nouveauProduit.id ? nouveauProduit : p
            )
        }));
    }

    function supprimerDuPanier(idProduitPanier) {
        const message = confirm("Voulez vous vraiment supprimer ce produit ?");
        if (!message) return;
        setPanier((anicenPanier) => ({
            ...anicenPanier,
            listeProduitPanier: anicenPanier.listeProduitPanier.filter(p => p.id !== idProduitPanier)
        }));
        supprimerProduitFromPanier(idProduitPanier)
    }

    function envoyerDemandeDevis() {
        finirCommmande(panier).then(value => {
            value.status === 202 ? (alert("Panier validé avec succés"), setPanier(
                    {
                        id: 0,
                        status: null,
                        date: null,
                        specification: null,
                        utilisateur: null,
                        listeProduitPanier: []

                    }))
                :
                alert("erreur lors de la validation du panier")
        })

    }

// Calculs totaux avec 15% de taxes
    if (panier.listeProduitPanier !== undefined && !isFetching) {
        totalHT = panier.listeProduitPanier.reduce((acc, item) => acc + item.quantite * item.prix, 0);
        totalTVA = totalHT * 0.15;
        totalTTC = totalHT + totalTVA;
        specification = panier.specification;
    }

    function sauvegarderSpecifications() {
        ajouteSpecificationPanier(specification)
    }

    return (
        isFetching ? (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status"></div>
            </div>
        ) : (
            <>
                <div className="container">
                    <h1 className="my-5">Demande de devis</h1>

                    <div className="mb-5">
                        <h4>Veuillez choisir par quel moyen vous souhaitez être contacté:</h4>
                        <div className="form-check mb-4">
                            <input
                                type="radio"
                                className="form-check-input"
                                name="contactMethod"
                                id="contactPhone"
                                value="Téléphone"
                                onChange={(e) => {
                                    setContactMethod(e.target.value);
                                    setContactValue('');
                                }}
                            />
                            <label className="form-check-label" htmlFor="contactPhone">Téléphone</label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                name="contactMethod"
                                id="contactEmail"
                                value="Courriel"
                                defaultChecked
                                onChange={(e) => {
                                    setContactMethod(e.target.value);
                                    fetchUtilisateur(sessionStorage.getItem("mail")).then(r => {
                                        setContactValue(r.username);
                                    });
                                }}
                            />
                            <label className="form-check-label" htmlFor="contactEmail">Courriel</label>
                        </div>
                        <div className="mb-3 mt-2">
                            <input
                                type={contactMethod === 'Téléphone' ? 'tel' : 'email'}
                                className="form-control"
                                id="contactValue"
                                placeholder={contactMethod === 'Téléphone' ? 'Numéro de téléphone' : 'Adresse courriel'}
                                value={contactValue}
                                onChange={(e) => setContactValue(e.target.value)}
                            />
                        </div>
                    </div>

                    {panier.listeProduitPanier.length > 0 ? (
                        <>
                            <h6>Ajouter des spécifications à votre devis:</h6>

                            <textarea
                                className="form-control"
                                defaultValue={specification !== "" ? specification : undefined}
                                id="message"
                                rows="3"
                                placeholder="Message (facultatif)"
                                onChange={(e) => specification = e.target.value}
                            ></textarea>
                            <div className="text-end mt-2">
                                <button onClick={sauvegarderSpecifications} className="btn btn-dark">
                                    Sauvegarder
                                </button>
                            </div>

                            <h2>Résumé de votre devis</h2>
                            <table className="table table-bordered table-light">
                                <thead>
                                <tr>
                                    <th className="text-center">Description</th>
                                    <th className="text-center">Qté</th>
                                    <th className="text-center">Prix unitaire</th>
                                    <th className="text-center">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {panier.listeProduitPanier.map(value => (
                                    <tr key={value.id}>
                                        <td className="text-center">{value.produit.nom}</td>
                                        <td className="text-center">
                                            <input
                                                type="number"
                                                onChange={(e) => handleChangeQuantite(e, value)}
                                                className="form-control text-center"
                                                value={value.quantite}
                                                min={0}
                                                style={{maxWidth: '80px', margin: '0 auto'}}
                                            />
                                        </td>
                                        <td className="text-center">{value.prix.toFixed(2)}</td>
                                        <td className="text-center">
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => supprimerDuPanier(value.id)}
                                                title="Supprimer"
                                            >
                                                <i className="bi-trash bi"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                            <table
                                className="table table-bordered text-center"
                                style={{width: '30%', float: 'right'}}
                            >
                                <tbody>
                                <tr>
                                    <td><strong>Sous-total :</strong></td>
                                    <td>{totalHT.toFixed(2)} $</td>
                                </tr>
                                <tr>
                                    <td><strong>Taxes (15%) :</strong></td>
                                    <td>{totalTVA.toFixed(2)} $</td>
                                </tr>
                                <tr>
                                    <td><strong>Total :</strong></td>
                                    <td>{totalTTC.toFixed(2)} $</td>
                                </tr>
                                </tbody>
                            </table>

                            <div style={{clear: 'both'}}></div>

                            <div className="d-flex justify-content-end mt-5">
                                <button
                                    type="button"
                                    className="btn btn-dark"
                                    onClick={envoyerDemandeDevis}
                                >
                                    Envoyer la demande
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="alert alert-warning text-center fs-4 my-5" role="alert">
                            Aucun article dans le panier pour le moment.
                        </div>
                    )}
                </div>
            </>
        )
    );

}

export default DevisForm;
