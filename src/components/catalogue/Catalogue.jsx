import Sidebar from "./Sidebar.jsx";
import AffichageProduits from "./AffichageProduits.jsx";
import BarreRechercheFiltre from "./Barre-recherche-filtre.jsx";
import React, {useState} from "react";

export default function Catalogue() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const [filtres, setFiltres] = useState({
        prixAsc:true,
        amperage: [],
        voltage: [],
        marques: [],
        etat: [],
        hp: [],
        disponibilite: [],
        nom:""
    });

    return (
        <>
            <BarreRechercheFiltre onFilterClick={toggleSidebar} filtres={filtres} setFiltres={setFiltres}/>
            {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
            <Sidebar ouvert={isSidebarOpen}
                     fermeture={toggleSidebar}
                     filtres={filtres}
                     setFiltres={setFiltres}
            />
            <AffichageProduits filtres={filtres}/>
        </>
    );
}