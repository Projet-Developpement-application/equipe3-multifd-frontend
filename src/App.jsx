import Navbar from "./components/navbar/Navbar.jsx";

import Compte from "./components/compte/Compte.jsx";
import Catalogue from "./components/catalogue/Catalogue.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import DevisForm from "./components/devis/Devis-form.jsx";
import Produit from "./components/produit/Produit.jsx";
import CatalogueTest from "./components/catalogue/CatalogueTestBackend.jsx";
import Inscription from "./components/authentification/Inscription.jsx";
import GestionProduit from "./components/gestion-produits/Gestion-Produit-adm.jsx";
import {ProduitProvider} from "./assets/contexte/ProduitContext.jsx";
import Connexion from "./components/authentification/Connexion.jsx";



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
                        <Route path="/" element={
                            <>
                                <Catalogue/>
                            </>
                        }/>


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
