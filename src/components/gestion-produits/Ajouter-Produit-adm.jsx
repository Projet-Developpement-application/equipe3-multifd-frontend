import React, {useEffect, useState} from 'react';
import {fetchAllMarque} from '../../scripts/http';
import {ajouterProduit} from '../../scripts/httpAdmin.js';
import ProduitForm from "./Produit-Form-adm.jsx";



const AjouterProduit = () => {
    const etats = ["NEUF", "OCCASION", "RECONDITIONNE"];
    const [marques, setMarques] = useState([]);
    const [produit, setProduit] = useState({
        nom: '', disponibilite: 'Disponible', prix: '', etat: etats[0], poids: '',
        voltage: '', hp: '', amperage: '', courant: '', marque: {nom: ' '}, image: null, imagePreview: null
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchAllMarque().then(
            tabMarque => {
                const tableau = [{id: 0, nom: ' '}, ...tabMarque];
                setMarques(tableau);
            }
        ).catch(console.error);
    }, []);

    const handleChange = e => {
        const {name, value, type, checked} = e.target;
        setProduit(p => ({...p, [name]: type === 'checkbox' ? checked : value}));
        setErrors(prev => ({...prev, [name]: null}));
    };
    const handleChangeMarque = e => {
        console.log(produit.marque);
        const {value} = e.target;
        setProduit(p => ({...p, marque: {nom: value}}));
        setErrors(prev => ({...prev, marque: null}));
    };

    const handleImageChange = e => {
        const file = e.target.files[0];
        if (file) {
            setProduit(p => ({...p, image: file, imagePreview: URL.createObjectURL(file)}));
            setErrors(prev => ({...prev, image: null}));
        }
    };

    const validate = () => {
        const newErrors = {};
        const requiredFields = ['nom', 'prix', 'courant', 'voltage', 'hp', 'amperage', 'poids', 'image'];

        // Champs requis
        requiredFields.forEach(field => {
            const value = produit[field];
            if (!value && value !== 0) {
                newErrors[field] = 'Ce champ est requis.';
            }
        });

        // Marque requise
        if (!produit.marque || !produit.marque.nom || produit.marque.nom.trim() === '') {
            newErrors.marque = 'La marque est requise.';
        }

        // Validation numérique bornée
        ['prix', 'poids', 'voltage', 'hp', 'amperage', 'courant'].forEach(field => {
            const value = produit[field];
            if (value !== '' && value !== undefined) {
                const num = Number(value);
                if (isNaN(num)) {
                    newErrors[field] = 'Doit être un nombre.';
                } else if (num < 0) {
                    newErrors[field] = 'La valeur ne peut pas être négative.';
                } else if (num > 9999) {
                    newErrors[field] = 'La valeur ne peut pas dépasser 9999.';
                }
            }
        });

        // Validation image
        if (produit.image) {
            const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
            if (!validTypes.includes(produit.image.type)) {
                newErrors.image = "Format d'image non supporté (jpg, jpeg, png, gif uniquement).";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (validate()) {
            const toSend = { ...produit, disponible: produit.disponibilite === 'Disponible' };
            ajouterProduit(toSend).then(() => alert("Produit ajouté !")).catch(err => {
                alert("Erreur lors de l'enregistrement du produit.");
                console.log(err);
            });
        }
    };

    return (
        <ProduitForm
            produit={produit}
            marques={marques}
            etats={etats}
            errors={errors}
            handleChange={handleChange}
            handleChangeMarque={handleChangeMarque}
            handleImageChange={handleImageChange}
            handleSubmit={handleSubmit}
            isEditMode={false}
        />
    );
};

export default AjouterProduit;
