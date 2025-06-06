// import {createContext, useContext, useEffect, useState} from "react";
// import {fetchUtilisateur, modifierUtilisateur} from "../../scripts/http.js";
//
//
// const UtilisateurContext = createContext();
//
// export const UtilisateurProvider = ({ children }) => {
//     const [utilisateur, setUtilisateur] = useState({
//         email: null,
//         role: null,
//         nom: '',
//         prenom: '',
//         courriel: '',
//         entreprise: '',
//     });
//
//     useEffect(() => {
//         const role = sessionStorage.getItem("role");
//         const email = sessionStorage.getItem("mail");
//         if (role || email) {
//             setUtilisateur((prev) => ({
//                 ...prev,
//                 role: role,
//                 email: email
//             }));
//         }
//     }, []);
//
//     const updateUtilisateur = (nouvellesInfos) => {
//         setUtilisateur((prev) => ({
//             ...prev,
//             ...nouvellesInfos
//         }));
//     };
//     const modifierUtil = async (email, utilisateurModifie) => {
//         const data = await modifierUtilisateur(email, utilisateurModifie);
//         updateUtilisateur(data);
//         return data;
//     };
//
//     useEffect(() => {
//         const email = sessionStorage.getItem('mail');
//         const role = sessionStorage.getItem('role');
//
//         if (email && role) {
//             fetchUtilisateur(email)
//                 .then(data => {
//                     setUtilisateur({ ...data, email, role });
//                 })
//                 .catch(err => {
//                     console.error("Erreur de chargement des infos utilisateur", err);
//                 });
//         }
//     }, []);
//     return (
//         <UtilisateurContext.Provider value={{ utilisateur, updateUtilisateur }}>
//             {children}
//         </UtilisateurContext.Provider>
//     );
// };
//
// export const useUtilisateur = () => useContext(UtilisateurContext);

import {createContext} from "react";

export const UtilisateurContext = createContext({
    mail: null,
    role: null,
    nom: '',
    prenom: '',
    entreprise:''
});