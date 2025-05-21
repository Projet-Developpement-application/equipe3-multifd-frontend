import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProduitForm from "./Produit-Form-adm.jsx";
import {fetchAllMarque,fetchProduitParId} from "../../scripts/http.js";
import {modifierProduit} from "../../scripts/httpAdmin.js";
import {URL_BACKEND} from "../../App.jsx";


const ModifierProduit = () => {
    const { id } = useParams();
    const etats = ["NEUF", "OCCASION", "RECONDITIONNE"];
    const [marques, setMarques] = useState([]);
    const [produit, setProduit] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchAllMarque().then(setMarques);
        fetchProduitParId(id).then(data => {
            setProduit({
                ...data,
                image: null,
                imagePreview: data.imageUrl,
                disponibilite: data.disponibilite ? 'Disponible' : 'Pas en stock'
            });
        });
    }, [id]);

    const handleChange = e => {
        const { name, value } = e.target;
        setProduit(p => ({ ...p, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: null }));
    };
    const handleChangeMarque = e => {
        const { value } = e.target;
        setProduit(p => ({ ...p, marque: { nom: value } }));
        setErrors(prev => ({ ...prev, marque: null }));
    };

    const handleImageChange = e => {
        const file = e.target.files[0];
        if (file) {
            setProduit(p => ({ ...p, image: file, imagePreview: URL.createObjectURL(file) }));
            setErrors(prev => ({ ...prev, image: null }));
        }
    };

    const validate = () => {
        const newErrors = {};
        const requiredFields = ['nom', 'prix', 'courant'];

        requiredFields.forEach(field => {
            const value = produit[field];
            if (!value && value !== 0) {
                newErrors[field] = 'Ce champ est requis.';
            } else if (['prix', 'poids', 'voltage', 'hp', 'amperage', 'courant'].includes(field)) {
                const num = Number(value);
                if (isNaN(num)) {
                    newErrors[field] = 'Doit être un nombre.';
                } else if (num < 0) {
                    newErrors[field] = 'La valeur ne peut pas être négative.';
                }
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (validate()) {
            console.log(produit.disponibilite);
            const toSend = { ...produit, disponible: produit.disponibilite === 'Disponible'};


            modifierProduit(id, toSend).then(() => alert("Produit modifié !")).catch(err => {
                alert("Erreur lors de l'enregistrement du produit.");
                console.log(err);
            });
        }
    };

    if (!produit) return <div>Chargement...</div>;

    return (
        <div>
            <h1 className={"text-center"}>Modifier {produit.nom}</h1>
            <ProduitForm
                produitImage={produit.imagePath ?`${URL_BACKEND}/uploads/images/${produit.imagePath}`:null}
                produit={produit}
                marques={marques}
                etats={etats}
                errors={errors}
                handleChange={handleChange}
                handleChangeMarque={handleChangeMarque}
                handleImageChange={handleImageChange}
                handleSubmit={handleSubmit}
                isEditMode={true}
            />
        </div>
    );
};

export default ModifierProduit;
