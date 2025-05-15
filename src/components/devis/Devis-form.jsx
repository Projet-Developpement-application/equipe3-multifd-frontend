import React, {useEffect, useState} from 'react';
import {
    changeQuantity,
    fetchUtilisateur,
    getPanierEnCours, supprimerProduitFromPanier
} from "../../scripts/httpClient.js";

function DevisForm() {
    const [panier, setPanier] = useState([]);
    const [contactMethod, setContactMethod] = useState('Courriel');
    const [contactValue, setContactValue] = useState('');
    const PRIX_UNITAIRE = 1850;

    useEffect(() => {
        fetchUtilisateur(sessionStorage.getItem("mail")).then(r => {
            setContactValue(r.username);
        });

        getPanierEnCours()
            .then(value => setPanier(value))
            .catch(() => {});
    }, []);

    function handleChangeQuantite(e, produitPanier) {
        const nouveauProduit = {...produitPanier, quantite: parseInt(e.target.value)};
        if (isNaN(nouveauProduit.quantite) || nouveauProduit.quantite <= 0) return;
        changeQuantity(nouveauProduit);
        setPanier(panier.map(p => p.id === nouveauProduit.id ? nouveauProduit : p));
    }

    function supprimerDuPanier(idProduitPanier) {
        const message = confirm("Voulez vous vraiment supprimer ce produit ?");
        if (!message) return;
        setPanier(panier.filter(item => item.id !== idProduitPanier));
        supprimerProduitFromPanier(idProduitPanier)
    }

    // Calculs totaux avec 15% de taxes
    const totalHT = panier.reduce((acc, item) => acc + item.quantite * PRIX_UNITAIRE, 0);
    const totalTVA = totalHT * 0.15;
    const totalTTC = totalHT + totalTVA;

    return (
        <div className="container">
            <h1 className="my-5">Demande de devis</h1>

            <div className="mb-4">
                <h4>Veuillez choisir par quel moyen vous souhaitez être contacté:</h4>
                <form>
                    <div className="form-check">
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
                </form>
            </div>

            {panier.length > 0 ? (
                <>
                    <table className="table table-bordered table-light" style={{ backgroundColor: '#c1d1ed' }}>
                        <thead>
                        <tr>
                            <th className="text-center">Description</th>
                            <th className="text-center">Qté</th>
                            <th className="text-center">Prix unitaire</th>
                            <th className="text-center">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {panier.map(value => (
                            <tr key={value.id}>
                                <td className="text-center">{value.produit.nom}</td>
                                <td className="text-center">
                                    <input
                                        type="number"
                                        onChange={(e) => handleChangeQuantite(e, value)}
                                        className="form-control text-center"
                                        value={value.quantite}
                                        min={0}
                                        style={{ maxWidth: '80px', margin: '0 auto' }}
                                    />
                                </td>
                                <td className="text-center">{PRIX_UNITAIRE.toFixed(2)}</td>
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

                    <table className="table table-bordered text-center" style={{ width: '30%', float: 'right' }}>
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

                    <div style={{ clear: 'both' }}></div>

                    <div className="d-flex justify-content-end mt-5">
                        <button type="button" className="btn btn-dark">
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
    );
}

export default DevisForm;
