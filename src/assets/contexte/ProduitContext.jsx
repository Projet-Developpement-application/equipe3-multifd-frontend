import {createContext, useContext, useEffect, useState} from "react";
import {fetchAllProduits} from "../../scripts/http.js";

const ProduitContext = createContext();

export const useProduits = () => useContext(ProduitContext);

export const ProduitProvider = ({ children }) => {
    const [produits, setProduits] = useState([]);

    useEffect(() => {
        fetchAllProduits()
            .then(data => setProduits(data))
            .catch(err => console.error("Erreur chargement produits:", err));
    }, []);

    const ajouterProduitLocal = (nouveauProduit) => {
        setProduits(prev => [nouveauProduit, ...prev]);
    };

    return (
        <ProduitContext.Provider value={{ produits, setProduits, ajouterProduitLocal }}>
            {children}
        </ProduitContext.Provider>
    );
};