import Navbar from "./components/navbar/Navbar.jsx";

import Compte from "./components/compte/Compte.jsx";
import Catalogue from "./components/catalogue/Catalogue.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DevisForm from "./components/devis/Devis-form.jsx";
import Produit from "./components/produit/Produit.jsx";
import Inscription from "./components/authentification/Inscription.jsx";
import GestionProduit from "./components/gestion-produits/Gestion-Produit-adm.jsx";
import {ProduitProvider} from "./assets/contexte/ProduitContext.jsx";
import Connexion from "./components/authentification/Connexion.jsx";
<<<<<<< Updated upstream

=======
import {UtilisateurContext} from "./assets/contexte/UtilisateurContext.jsx";
import GestionUtilisateurAdm from "./components/gestion-comptes/Gestion-utilisateur-adm.jsx";
import Catalogue from "./components/catalogue/Catalogue.jsx";
import {useState} from "react";
import ModifierProduit from "./components/gestion-produits/Modifier-Produit-adm.jsx";
import SupprimerProduit from "./components/gestion-produits/Supprimer-Produit-adm.jsx";
// const URL = "/siteReact/equipe3-multifd-frontend";
export const URL_BACKEND = "http://localhost:8080";
>>>>>>> Stashed changes

function App() {
    return (
        <>
            <ProduitProvider>
                <BrowserRouter>
                    <Navbar/>

                    <Routes>
                        <Route index element={
                            <>
                                <Catalogue/>
                            </>
                        }/>
<<<<<<< Updated upstream
                        <Route path="/" element={
                            <>
                                <Catalogue/>
                            </>
                        }/>
=======
>>>>>>> Stashed changes


                    <Route path="compte" element={<Compte />} />
                    <Route path="panier" element={<DevisForm />} />
                    <Route path="/produit/:id" element={<Produit />} />
                    <Route path="AjouterProduit" element={<GestionProduit/>} />
                    <Route path="Inscription" element={<Inscription/>}/>
                    <Route path="Connexion" element={<Connexion/>}/>


                    </Routes>

                </BrowserRouter>
            </ProduitProvider>

        </>

    )
}

export default App
