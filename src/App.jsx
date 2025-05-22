import Navbar from "./components/navbar/Navbar.jsx";

import Compte from "./components/compte/Compte.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DevisForm from "./components/devis/Devis-form.jsx";
import Produit from "./components/produit/Produit.jsx";
import Inscription from "./components/authentification/Inscription.jsx";
import AjouterProduit from "./components/gestion-produits/Ajouter-Produit-adm.jsx";
import Connexion from "./components/authentification/Connexion.jsx";
import {UtilisateurContext} from "./assets/contexte/UtilisateurContext.jsx";
import GestionUtilisateurAdm from "./components/gestion-comptes/Gestion-utilisateur-adm.jsx";
import Catalogue from "./components/catalogue/Catalogue.jsx";
import {useEffect, useState} from "react";
import ModifierProduit from "./components/gestion-produits/Modifier-Produit-adm.jsx";
import SupprimerProduit from "./components/gestion-produits/Supprimer-Produit-adm.jsx";
import UtilisateurAdm from "./components/gestion-comptes/UtilisateurAdm.jsx";
 export const URL_ROUTE_FRONTEND = "/siteReact/equipe3-multifd-frontend";
//export const URL_ROUTE_FRONTEND = "";
export const URL_BACKEND = "http://localhost:8080";

function App() {
    const [utilisateur, setUtilisateur] = useState({
        role: null,
        mail: null,
        prenom: null,
        nom: null,
    });

    useEffect(()=>{
        if(sessionStorage.getItem("isConnected") === "true"){
            setUtilisateur({
                role: sessionStorage.getItem("role"),
                mail: sessionStorage.getItem("mail"),
                prenom: sessionStorage.getItem("prenom"),
                nom: sessionStorage.getItem("nom")
            })
        }
    },[setUtilisateur])

    return (
        <>
            <UtilisateurContext.Provider value={{utilisateur,setUtilisateur}}>
                <BrowserRouter>
                    <Navbar/>

                    <Routes>
                        <Route index element={
                            <>
                                <Catalogue/>
                            </>
                        }/>

                        <Route path={URL_ROUTE_FRONTEND+"compte"} element={<Compte/>}/>
                        <Route path={URL_ROUTE_FRONTEND+"panier"} element={<DevisForm/>}/>
                        <Route path={URL_ROUTE_FRONTEND+"produit/:id"} element={<Produit/>}/>
                        <Route path={URL_ROUTE_FRONTEND+"AjouterProduit"} element={<AjouterProduit/>}/>
                        <Route path={URL_ROUTE_FRONTEND+"ModifierProduit/:id"} element={<ModifierProduit/>}/>
                        <Route path={URL_ROUTE_FRONTEND+"SupprimerProduit/:id"} element={<SupprimerProduit/>}/>
                        <Route path={URL_ROUTE_FRONTEND+"Inscription"} element={<Inscription/>}/>
                        <Route path={URL_ROUTE_FRONTEND+"Connexion"} element={<Connexion/>}/>
                        <Route path={URL_ROUTE_FRONTEND+"GestionUtilisateur"} element={<GestionUtilisateurAdm/>}/>
                        <Route path={URL_ROUTE_FRONTEND+"utilisateur/:mail"} element={<UtilisateurAdm />} />

                    </Routes>

                </BrowserRouter>
            </UtilisateurContext.Provider>


        </>

    )
}

export default App
