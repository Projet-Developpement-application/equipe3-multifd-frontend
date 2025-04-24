import {createContext, useContext, useState, useEffect} from "react";

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

    useEffect(() => {
        const role = sessionStorage.getItem("role");
        const email = sessionStorage.getItem("mail");
        if (role || email) {
            setUtilisateur((prev) => ({
                ...prev,
                role: role,
                email: email
            }));
        }
    }, []);

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

export const useUtilisateur = () => useContext(UtilisateurContext);