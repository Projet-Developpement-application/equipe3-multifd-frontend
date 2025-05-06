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
import {useState} from "react";
import ModifierProduit from "./components/gestion-produits/Modifier-Produit-adm.jsx";


function App() {
    const [utilisateur, setUtilisateur] = useState({
        role: null,
        mail: null,
        prenom: null,
        nom: null,
    })


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
                        <Route path="siteReact/equipe3-multifd-frontend/" element={
                            <>
                                <Catalogue/>
                            </>
                        }/>

                        <Route path="siteReact/equipe3-multifd-frontend/compte" element={<Compte/>}/>
                        <Route path="siteReact/equipe3-multifd-frontend/panier" element={<DevisForm/>}/>
                        <Route path="siteReact/equipe3-multifd-frontend/produit/:id" element={<Produit/>}/>
                        <Route path="siteReact/equipe3-multifd-frontend/AjouterProduit" element={<AjouterProduit/>}/>
                        <Route path="siteReact/equipe3-multifd-frontend/ModifierProduit/:id" element={<ModifierProduit/>}/>
                        <Route path="siteReact/equipe3-multifd-frontend/Inscription" element={<Inscription/>}/>
                        <Route path="siteReact/equipe3-multifd-frontend/Connexion" element={<Connexion/>}/>
                        <Route path="siteReact/equipe3-multifd-frontend/GestionUtilisateur" element={<GestionUtilisateurAdm/>}/>


                    </Routes>

                </BrowserRouter>
            </UtilisateurContext.Provider>


        </>

    )
}

export default App
