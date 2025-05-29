import React, { useEffect, useState } from "react";
import {useParams, Link, redirect, useNavigate} from "react-router-dom";
import { fetchProduitParId } from "../../scripts/http.js";
import {ajouteProduitPanier} from "../../scripts/httpClient.js";
import {URL_BACKEND, URL_ROUTE_FRONTEND} from "../../App.jsx";
import image from "../../assets/generique.jpg";
import { cad } from "../../scripts/formatters.js";

export default function Produit() {
    const { id } = useParams();
    const [produit, setProduit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProduitParId(id)
            .then(data => {
                setProduit(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Erreur lors du chargement du produit:", err);
                setError("Impossible de charger les informations du produit.");
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Chargement des informations du produit...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    function ajouteProduit(){
        ajouteProduitPanier(produit.id).then(data=>{
            if (data==="non connecté"){
                navigate(URL_ROUTE_FRONTEND+"/Connexion")
                return
            }
            if (data === 201){
                alert("Le produit a été ajouté au panier");
            }
        });
    }

    return (
        <div className="container-fluid p-0">
            <div className="container py-5 mt-5">
                <div className="row mx-3">
                    <div className="col-12 col-lg-5 d-flex flex-column align-items-start mb-4 mb-lg-0">
                        <div
                            className="bg-light d-flex justify-content-center align-items-center mb-3 w-100"
                            style={{ height: "400px" }}
                        >{produit.imagePath != null ? (
                            <img src={`${URL_BACKEND}/uploads/images/${produit.imagePath}`} className="object-fit-contain h-100 w-100"
                                 alt={produit.nom}/>
                        ):<img src={image} className="object-fit-contain h-100 w-100"
                               alt={produit.nom}/>}
                        </div>
                    </div>

                    <div className="col-12 col-lg-7 d-flex flex-column justify-content-between" style={{ minHeight: "400px" }}>
                        <div>
                            <h2 className="m-0 p-0 "><strong>{produit && produit.nom + produit.marque.nom ? produit.marque.nom +" - "+ produit.nom  : "Nom du produit indisponible"}</strong></h2>

                            <div className="mt-1 d-flex align-items-center justify-content-start">
                                <span className="texte-bleu-bouton h4 mb-0">
                                    {produit && produit.prix ? cad.format(produit.prix): "Prix non disponible"}
                                </span>
                                <i className="bi bi-dash ms-1 text-dark"> </i>
                                <span className="ms-1 h4 mb-0">
                                    {produit && produit.disponible ? "En stock" : "Indisponible"}
                                </span>
                            </div>
                            <h4 className="mt-5"><strong>Détails du produit</strong></h4>
                            <table className="table w-lg-75 w-md-50">
                                <tbody>
                                <tr>
                                    <td className="pe-3 py-2" style={{ width: "40%" }}>État</td>
                                    <td className="py-2">{produit && produit.etat ? produit.etat : "Non spécifié"}</td>
                                </tr>
                                <tr>
                                    <td className="pe-3 py-2">Poids</td>
                                    <td className="py-2">{produit && produit.poids ? produit.poids + " kg" : "Non spécifié"}</td>
                                </tr>
                                <tr>
                                    <td className="pe-3 py-2">Voltage</td>
                                    <td className="py-2">{produit && produit.voltage ? produit.voltage + " V" : "Non spécifié"}</td>
                                </tr>
                                <tr>
                                    <td className="pe-3 py-2">Puissance (HP)</td>
                                    <td className="py-2">{produit && produit.hp ? produit.hp + " HP" : "Non spécifié"}</td>
                                </tr>
                                <tr>
                                    <td className="pe-3 py-2">Amperage</td>
                                    <td className="py-2">{produit && produit.amperage ? produit.amperage + " A" : "Non spécifié"}</td>
                                </tr>
                                <tr>
                                    <td className="pe-3 py-2">Courant</td>
                                    <td className="py-2">{produit && produit.courant ? produit.courant + " phases" : "Non spécifié"}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="d-flex justify-content-end w-100 w-lg-75 mt-5 mt-lg-5">
                            <Link to={"/"} className="text-decoration-none">
                                <button className="btn btn-outline-dark ms-2">
                                    <i className="bi bi-arrow-left"></i> Retour à la boutique
                                </button>
                            </Link>
                            <button className="btn bg-bleu-bouton ms-2 text-light" onClick={()=>{
                                    ajouteProduit();
                            }}>
                                <i className="bi bi-cart"></i> Ajouter au panier
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}