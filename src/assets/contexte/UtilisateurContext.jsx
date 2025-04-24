import {createContext, useContext, useState} from "react";

const UtilisateurContext = createContext();

export const UtilisateurProvider = ({ children }) => {
    const [utilisateur, setUtilisateur] = useState({
        email: null,
        role: null,
        nom: '',
        prenom: '',
        courriel: '',
        telephone: '',
        entreprise: '',
        adresse: '',
        ville: ''
    });

    const updateUtilisateur = (nouvellesInfos) => {
        setUtilisateur((prev) => ({
            ...prev,
            ...nouvellesInfos
        }));
    };

    return (
        <UtilisateurContext.Provider value={{ utilisateur, updateUtilisateur }}>
            {children}
        </UtilisateurContext.Provider>
    );
};


export const useUtilisateur  = () => useContext(UtilisateurContext);