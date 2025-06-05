import React, {useEffect, useState} from 'react';
import {
    ajouteSpecificationPanier,
    changeQuantity,
    fetchUtilisateur, finirCommmande,
    getPanierEnCours,
    supprimerProduitFromPanier
} from "../../scripts/httpClient.js";
import {useNavigate} from "react-router-dom";
import {cad, TAXE} from "../../scripts/formatters.js";

function DevisForm({setPanierCount}) {
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
    const [errorContactValue, setErrorContactValue] = useState({error: false, message: undefined})
    const navigate = useNavigate();

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
        const message = confirm("Voulez-vous vraiment supprimer ce produit ?");
        if (!message) return;
        setPanier((ancienPanier) => ({
            ...ancienPanier,
            listeProduitPanier: ancienPanier.listeProduitPanier.filter(p => p.id !== idProduitPanier)
        }));
        // Suppression côté serveur et mise à jour du compteur
        supprimerProduitFromPanier(idProduitPanier)
            .then(() => {
                getPanierEnCours()
                    .then(panier => setPanierCount(panier.listeProduitPanier.length))
                    .catch(() => setPanierCount(0));
            });
    }

    function verifieNumTel(numero) {
        const regex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
        return regex.test(numero);
    }

    function verifieCourriel(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function verifieContactValue() {
        if (contactMethod === 'Téléphone' && !verifieNumTel(contactValue)) {
            setErrorContactValue({error: true, message: "le numéro de téléphone n'est pas bon"})
            return false;
        }
        if (contactMethod === 'Courriel' && !verifieCourriel(contactValue)) {
            setErrorContactValue({error: true, message: "le mail est invalide"})
            return false;
        }
        return true;
    }

    function envoyerDemandeDevis() {
        const good = verifieContactValue();
        if (!good) return;

        const validation = confirm("Voulez-vous confirmer votre demande de devis ?");
        if (!validation) return;

        setIsFetching(true);

        finirCommmande(panier,contactValue).then(value => {

            if (value.status === 202) {
                setPanier({
                    id: 0,
                    status: null,
                    date: null,
                    specification: null,
                    utilisateur: null,
                    listeProduitPanier: []
                });
                navigate('/confirmation');
            } else {
                alert("erreur lors de la validation du panier");
            }
        });
    }

    if (panier.listeProduitPanier !== undefined && !isFetching) {
        totalHT = panier.listeProduitPanier.reduce((acc, item) => acc + item.quantite * item.prix, 0);
        totalTVA = totalHT * TAXE;
        totalTTC = totalHT + totalTVA;
        specification = panier.specification;
    }

    function sauvegarderSpecifications() {
        ajouteSpecificationPanier(specification)
    }

    return (
        isFetching ? (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="spinner-border" role="status">
                </div>
            </div>
        ) : (
            <>
                <div className="container">
                    <h1 className="my-5">Demande de devis</h1>

                    <div className="mb-5">
                        <h4 className="pb-3">Veuillez choisir par quel moyen vous souhaitez être contacté:</h4>
                        <div className="form-check mb-4">
                            <input
                                type="radio"
                                className="form-check-input radio"
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
                            {errorContactValue.error ? <div className="alert alert-danger" role="alert">
                                {errorContactValue.message}
                            </div> : undefined}
                            {contactMethod === "Téléphone" ?
                                <input
                                    type={'tel'}
                                    className="form-control"
                                    maxLength={13}
                                    placeholder={'Numéro de téléphone format : xxx-xxxx-xxxx'}
                                    value={contactValue}
                                    onChange={(e) =>{
                                        const input = e.target.value;

                                        // Retirer tout ce qui n'est pas un chiffre
                                        const digits = input.replace(/\D/g, '');

                                        // Appliquer le format XXX-XXX-XXXX
                                        let formatted = digits;
                                        if (digits.length > 3 && digits.length <= 6) {
                                            formatted = `${digits.slice(0, 3)}-${digits.slice(3)}`;
                                        } else if (digits.length > 6) {
                                            formatted = `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
                                        }
                                        setContactValue(formatted)
                                    }
                                    }
                                /> :
                                <input
                                    type={'email'}
                                    className="form-control"
                                    placeholder={'Adresse courriel'}
                                    value={sessionStorage.getItem("mail")}
                                    onChange={(e) =>
                                        setContactValue(e.target.value)
                                    }
                                />
                            }

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
                            <div className="table-responsive">
                                <table className="table table-bordered table-light">
                                    <thead>
                                    <tr>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    {panier.listeProduitPanier.map(value => (
                                        <tr key={value.id}>
                                            <td>
                                                <p className="fs-6 fs-sm-6 fs-md-5 mb-0">{value.produit.nom}</p>
                                                <p className="fs-6 fs-sm-6 fs-md-5">{value.produit.marque.nom}</p>
                                            </td>
                                            <td className="text-center table-col-width">
                                                <input
                                                    type="number"
                                                    onChange={(e) => handleChangeQuantite(e, value)}
                                                    className="form-control w-auto py-1 px-2"
                                                    value={value.quantite}
                                                    min={0}
                                                    style={{maxWidth: '60px', fontSize: '0.95rem'}}
                                                />
                                            </td>
                                            <td className="text-center table-col-width"
                                                style={{fontSize: '0.95rem'}}>{cad.format(value.prix)}</td>
                                            <td className="text-center table-col-width">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-dark btn-sm p-1"
                                                    onClick={() => supprimerDuPanier(value.id)}
                                                    title="Supprimer"
                                                    style={{
                                                        fontSize: '1rem',
                                                        width: '2rem',
                                                        height: '2rem',
                                                        minWidth: 'unset'
                                                    }}
                                                >
                                                    <i className="bi-x-lg bi"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>


                            <div className="text-end mt-4">
                                <p>
                                    <strong>Sous-total :</strong>{" "}
                                    {cad.format(totalHT)}
                                </p>
                                <p>
                                    <strong>Taxes (15%) :</strong>{" "}
                                    {cad.format(totalTVA)}
                                </p>
                                <h5>
                                    <strong>Total TTC
                                        :</strong> {cad.format(totalTTC)}
                                </h5>
                            </div>
                            <div className="d-flex justify-content-end my-5">
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