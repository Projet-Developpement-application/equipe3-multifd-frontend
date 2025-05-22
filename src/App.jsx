import Navbar from "./components/navbar/Navbar.jsx";
import Compte from "./components/compte/Compte.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DevisForm from "./components/devis/Devis-form.jsx";
import Produit from "./components/produit/Produit.jsx";
import Inscription from "./components/authentification/Inscription.jsx";
import AjouterProduit from "./components/gestion-produits/Ajouter-Produit-adm.jsx";
import Connexion from "./components/authentification/Connexion.jsx";
import { UtilisateurContext } from "./assets/contexte/UtilisateurContext.jsx";
import GestionUtilisateurAdm from "./components/gestion-comptes/Gestion-utilisateur-adm.jsx";
import Catalogue from "./components/catalogue/Catalogue.jsx";
import { useEffect, useState } from "react";
import ModifierProduit from "./components/gestion-produits/Modifier-Produit-adm.jsx";
import SupprimerProduit from "./components/gestion-produits/Supprimer-Produit-adm.jsx";
import UtilisateurAdm from "./components/gestion-comptes/UtilisateurAdm.jsx";
export const URL_BACKEND = "http://172.20.46.45:8080/backend-projet-prod";
export const URL_ROUTE_FRONTEND = "";
function App() {
    const [utilisateur, setUtilisateur] = useState({
        role: null,
        mail: null,
        prenom: null,
        nom: null,
    });

    useEffect(() => {
        if (sessionStorage.getItem("isConnected") === "true") {
            setUtilisateur({
                role: sessionStorage.getItem("role"),
                mail: sessionStorage.getItem("mail"),
                prenom: sessionStorage.getItem("prenom"),
                nom: sessionStorage.getItem("nom")
            });
        }
    }, [setUtilisateur]);

    return (
        <UtilisateurContext.Provider value={{ utilisateur, setUtilisateur }}>
            <BrowserRouter basename="/siteReact/equipe3-multifd-frontend">
                <Navbar />
                <Routes>
                    <Route index element={<Catalogue />} />
                    <Route path="compte" element={<Compte />} />
                    <Route path="panier" element={<DevisForm />} />
                    <Route path="produit/:id" element={<Produit />} />
                    <Route path="AjouterProduit" element={<AjouterProduit />} />
                    <Route path="ModifierProduit/:id" element={<ModifierProduit />} />
                    <Route path="SupprimerProduit/:id" element={<SupprimerProduit />} />
                    <Route path="Inscription" element={<Inscription />} />
                    <Route path="Connexion" element={<Connexion />} />
                    <Route path="GestionUtilisateur" element={<GestionUtilisateurAdm />} />
                    <Route path="utilisateur/:mail" element={<UtilisateurAdm />} />
                </Routes>
            </BrowserRouter>
        </UtilisateurContext.Provider>
    );
}

export default App;