import Sidebar from "./Sidebar.jsx";
import AffichageProduits from "./AffichageProduits.jsx";
import BarreRechercheFiltre from "./Barre-recherche-filtre.jsx";
import React, {useRef, useState} from "react";

export default function Catalogue() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const [appliedFilters, setAppliedFilters] = useState({presenceFiltre: false, filtres: {}});
    const filtres = useRef({
        sortOptions: "",
        amperage: [],
        voltage: [],
        marque: [],
        hp: [],
        disponibilite: null,
        etat: []
    });

    function handleApplyFilter() {
        setAppliedFilters({presenceFiltre: true, filtres: filtres.current}); // Met à jour les filtres appliqués
    }

    function clearFilter() {
        filtres.current = {
            sortOptions: "",
            amperage: [],
            voltage: [],
            marque: [],
            hp: [],
            disponibilite: null,
            etat: []
        };
        setAppliedFilters({presenceFiltre: false, filtres: {}});
    }

    return (
        <>
            <BarreRechercheFiltre onFilterClick={toggleSidebar}/>
            {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
            <Sidebar ouvert={isSidebarOpen}
                     fermeture={toggleSidebar}
                     filtres={filtres}
                     onApplyFilter={handleApplyFilter}
                     clearFilter={clearFilter}
            />
            <AffichageProduits filtres={appliedFilters}/>
        </>
    );
}