import Navbar from "./components/navbar/Navbar.jsx";

import Compte from "./components/compte/Compte.jsx";
import Catalogue from "./components/catalogue/Catalogue.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import DevisForm from "./components/devis/Devis-form.jsx";
import Produit from "./components/produit/Produit.jsx";
import CatalogueTest from "./components/catalogue/CatalogueTestBackend.jsx";


function App() {
    return (
        <>
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


                </Routes>

            </BrowserRouter>
        </>

    )
}

export default App
