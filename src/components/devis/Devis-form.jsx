import React, {useEffect, useState} from 'react';
import {changeQuantity, fetchUtilisateur, getPanierEnCours} from "../../scripts/httpClient.js";

function DevisForm() {
    const [utilisateurInfo, setUtilisateurInfo] = useState({})
    const [error, setError] = useState(false)
    const [panier, setPanier] = useState([])

    async function obentirDonneeUtilisateur() {
        return fetchUtilisateur(sessionStorage.getItem("mail"))
    }

    useEffect(() => {
        obentirDonneeUtilisateur().then(r => {
            setUtilisateurInfo({
                nom: r.nom + " " + r.prenom,
                entreprise: r.entreprise,
                mail: r.username
            })
        })
        getPanierEnCours().then(value => setPanier(value)).catch(e => setError(true))
    }, [])


    function handleChangeQuantite(e, produitPanier) {
        const nouveauProduit = {...produitPanier, quantite: parseInt(e.target.value)}
        if (isNaN(nouveauProduit.quantite)) return;
        changeQuantity(nouveauProduit)
    }

    return (
        <div className="container">
            <h1 className="my-5">Demande de devis</h1>
            {!error ? <>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <h4>Vos informations:</h4>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="contactName" className="form-label">Contact:</label>
                                <input type="text" className="form-control" id="contactName"
                                       defaultValue={utilisateurInfo.nom}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="company" className="form-label">Entreprise:</label>
                                <input type="text" className="form-control" id="company"
                                       defaultValue={utilisateurInfo.entreprise}/>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <h4>Veuillez choisir par quel moyen vous souhaitez être contacté:</h4>
                        <form>
                            <div className="form-check">
                                <input type="radio" className="form-check-input" name="contactMethod"
                                       id="contactPhone"/>
                                <label className="form-check-label" htmlFor="contactPhone">Téléphone</label>
                            </div>
                            <div className="form-check">
                                <input type="radio" className="form-check-input" name="contactMethod" id="contactEmail"
                                       defaultChecked/>
                                <label className="form-check-label" htmlFor="contactEmail">Courriel</label>
                            </div>
                            <div className="mb-3">
                                <input type="email" className="form-control" id="emailAddress"
                                       defaultValue={utilisateurInfo.mail}/>
                            </div>
                        </form>
                    </div>
                </div>

                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Description</th>
                        <th>Quantité</th>
                        <th>Prix Unitaire</th>
                        <th>Coût</th>
                    </tr>
                    </thead>
                    <tbody>
                    {panier.map(value =>
                        <tr key={value.id}>
                            <td>{value.produit.nom}</td>
                            <td>
                                <input type="number" onChange={(e) => handleChangeQuantite(e, value)}
                                       className="form-control" defaultValue={parseInt(value.quantite)} min={0}/>
                            </td>
                            <td>1850.00 $</td>
                            <td>1850.00 $</td>
                        </tr>
                    )}
                    </tbody>
                    <tfoot>
                    <tr>
                        <td colSpan={3} className="text-end">Sous-total:</td>
                        <td>185 000.00 $</td>
                    </tr>
                    <tr>
                        <td colSpan={3} className="text-end">Taxes:</td>
                        <td>2000.00 $</td>
                    </tr>
                    <tr>
                        <td colSpan={3} className="text-end">Total:</td>
                        <td>187 000.00 $</td>
                    </tr>
                    </tfoot>
                </table>

                <div className="d-flex justify-content-end mt-5 ">
                    <button type="button" className="btn btn-dark btn">
                        Envoyer la demande
                    </button>
                </div>

            </> : <div>
                aucuns panier en cours
            </div>
            }

        </div>
    );
}

export default DevisForm;