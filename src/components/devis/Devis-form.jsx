import React, { useEffect, useState } from 'react';
import {
    changeQuantity,
    fetchUtilisateur,
    getPanierEnCours
} from "../../scripts/httpClient.js";

function DevisForm() {
    const [panier, setPanier] = useState([]);
    const [contactMethod, setContactMethod] = useState('Courriel');
    const [contactValue, setContactValue] = useState('');

    useEffect(() => {
        fetchUtilisateur(sessionStorage.getItem("mail")).then(r => {
            setContactValue(r.username);
        });

        getPanierEnCours()
            .then(value => setPanier(value))
            .catch(() => {});
    }, []);

    function handleChangeQuantite(e, produitPanier) {
        const nouveauProduit = { ...produitPanier, quantite: parseInt(e.target.value) };
        if (isNaN(nouveauProduit.quantite)) return;
        changeQuantity(nouveauProduit);
    }

    function supprimerDuPanier(idProduit) {
        setPanier(panier.filter(item => item.id !== idProduit));
        // si tu veux aussi appeler une API pour supprimer côté serveur,
        // tu peux mettre ça ici genre: await deleteFromPanier(idProduit)
    }

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
                    <table className="table table-bordered table-striped">
                        <thead className="table-light">
                        <tr>
                            <th>Description</th>
                            <th style={{ width: '100px' }}>Quantité</th>
                            <th>Prix Unitaire</th>
                            <th>Coût</th>
                            <th>Taxes</th>
                            <th>Total</th>
                            <th style={{ width: '60px' }}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {panier.map(value => (
                            <tr key={value.id}>
                                <td>{value.produit.nom}</td>
                                <td style={{ width: '100px' }}>
                                    <input
                                        type="number"
                                        onChange={(e) => handleChangeQuantite(e, value)}
                                        className="form-control"
                                        defaultValue={parseInt(value.quantite)}
                                        min={0}
                                        style={{ maxWidth: '80px' }}
                                    />
                                </td>
                                <td>1850.00 $</td>
                                <td>{(value.quantite * 1850).toFixed(2)} $</td>
                                <td>2 000.00 $</td>
                                <td>187 000.00 $</td>
                                <td>
                                    <button
                                        className="btn btn-sm "
                                        onClick={() => supprimerDuPanier(value.id)}
                                        title="Supprimer ce produit"
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colSpan={5} className="text-end">Sous-total:</td>
                            <td>185 000.00 $</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td colSpan={5} className="text-end">Taxes:</td>
                            <td>2 000.00 $</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td colSpan={5} className="text-end">Total:</td>
                            <td>187 000.00 $</td>
                            <td></td>
                        </tr>
                        </tfoot>
                    </table>

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
