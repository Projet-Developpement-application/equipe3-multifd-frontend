import Sidebar from "./Sidebar.jsx";
import AffichageProduits from "./AffichageProduits.jsx";
import BarreRechercheFiltre from "./Barre-recherche-filtre.jsx";
import React, {useState} from "react";

export default function Catalogue() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const [filtres, setFiltres] = useState({
        amperage: [],
        voltage: [],
        marques: [],
        etat:[],
        hp:[]
    });

    return (
        <>
            <BarreRechercheFiltre onFilterClick={toggleSidebar}/>
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