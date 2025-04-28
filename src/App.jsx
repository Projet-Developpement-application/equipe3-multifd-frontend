import Navbar from "./components/navbar/Navbar.jsx";

import Compte from "./components/compte/Compte.jsx";
import AffichageProduits from "./components/catalogue/AffichageProduits.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import DevisForm from "./components/devis/Devis-form.jsx";
import Produit from "./components/produit/Produit.jsx";
import Inscription from "./components/authentification/Inscription.jsx";
import GestionProduit from "./components/gestion-produits/Gestion-Produit-adm.jsx";
import Connexion from "./components/authentification/Connexion.jsx";
import {UtilisateurProvider} from "./assets/contexte/UtilisateurContext.jsx";
import GestionUtilisateurAdm from "./components/gestion-comptes/Gestion-utilisateur-adm.jsx";
import Catalogue from "./components/catalogue/Catalogue.jsx";


function App() {
    return (
        <>
            <UtilisateurProvider>
                <BrowserRouter>
                    <Navbar/>

                    <Routes>
                        <Route index element={
                            <>
                                <Catalogue/>
                            </>
                        }/>
                        <Route path="/" element={
                            <>
                                <Catalogue/>
                            </>
                        }/>


                        <Route path="compte" element={<Compte/>}/>
                        <Route path="panier" element={<DevisForm/>}/>
                        <Route path="/produit/:id" element={<Produit/>}/>
                        <Route path="AjouterProduit" element={<GestionProduit/>}/>
                        <Route path="Inscription" element={<Inscription/>}/>
                        <Route path="Connexion" element={<Connexion/>}/>
                        <Route path="GestionUtilisateur" element={<GestionUtilisateurAdm/>}/>


                    </Routes>

                </BrowserRouter>
            </UtilisateurProvider>


        </>

    )
}

export default App
