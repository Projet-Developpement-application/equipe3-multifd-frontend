import React, {useEffect, useState} from "react";
import FiltreMulti from "./Filtres/FiltreMulti.jsx";
import FiltreRadio from "./Filtres/FiltreRadio.jsx";
import {fetchAllMarque} from "../../scripts/http.js";

const Sidebar = ({ouvert, fermeture, filtres, setFiltres}) => {

    const [marques, setMarques] = useState([]);


    async function fetchMarques() {
        try {

            const json = await fetchAllMarque();
            setMarques(json);
        } catch (err) {
            console.error("Erreur filtrage:", err);
        }
    }

    useEffect(() => {
        fetchMarques();
    }, [setMarques]);

    const toggleFiltre = (type, valeur) => {
        if (type === "prixAsc") {
            setFiltres(prev => ({
                ...prev,
                [type]: !prev[type]
            }));
        } else {
            setFiltres(prev => ({
                ...prev,
                [type]: prev[type].includes(valeur)
                    ? prev[type].filter(v => v !== valeur)
                    : [...prev[type], valeur]
            }));
        }
    };


    return (
        <div className={`sidebar ${ouvert ? "open" : ""}`}>
            <div className="sidebar-header mb-4">
                <h5></h5>
                <button className="btn-close" onClick={fermeture}></button>
            </div>
            <div className="sidebar-content ">
                <div className="mb-2">
                    <h6 className="pb-2 "> Trier par :</h6>
                    <div className="ps-2">
                    <FiltreRadio valeur={"asc"} name={"prixAsc"} identifiant={"sortPriceAsc"}
                                 motAffiche={"Prix croissant"} type={true} togglefiltre={toggleFiltre} filtres={filtres}
                    />
                    <FiltreRadio valeur={"desc"} name={"prixAsc"} identifiant={"sortPriceDesc"}
                                 motAffiche={"Prix décroissant"} type={false} togglefiltre={toggleFiltre}
                                 filtres={filtres}
                    />
                    </div>
                </div>
                <hr/>
                <h5 className="py-4 "> Filtres :</h5>




            </div>

            {/* Voltage */}
            <div className="filter-section mb-4">
                <h6 className="pb-2 "><i className="bi bi-caret-right-fill"></i> Voltage</h6>
                <div className="filter-options ps-2">
                    {[600, 460, 240, 120].map((v) => (
                        <FiltreMulti key={v} typeFiltre={"voltage"} valeur={v} unite={"V"} toggleFiltre={toggleFiltre}
                                     filtres={filtres}/>
                    ))}
                </div>

            </div>
            <hr/>

            {/* Marque */}
            <div className="filter-section mb-4">
                <h6 className="pb-2 "><i class="bi bi-caret-right-fill"></i> Marque</h6>
                <div className="filter-options ps-2">
                    {marques.map((marque) => (
                        <FiltreMulti key={marque.id} typeFiltre={"marques"} valeur={marque.nom}
                                     toggleFiltre={toggleFiltre} filtres={filtres}/>
                    ))}
                </div>
            </div>
            <hr/>

            {/* HP */}
            <div className="filter-section mb-4">

                <h6 className="pb-2 "> <i className="bi bi-caret-right-fill"></i> HP</h6>

                <div className="filter-options ps-2">
                    {[1, 2, 3, 5, 7.5, 10, 15, 20, 40, 50, 100].map((v) => (
                        <FiltreMulti key={v} typeFiltre={"hp"} valeur={v} unite={"hp"} toggleFiltre={toggleFiltre}
                                     filtres={filtres}/>
                    ))}
                </div>
            </div>
            <hr/>

            {/* Disponibilité */}
            <div className="filter-section mb-4">

                <h6 className="pb-2 "><i className="bi bi-caret-right-fill"></i> Disponibilité </h6>

                <div className="filter-options ps-2">
                    <FiltreMulti typeFiltre={"disponibilite"} valeur={true} toggleFiltre={toggleFiltre}
                                 filtres={filtres} unite={'Disponible'}/>
                    <FiltreMulti typeFiltre={"disponibilite"} valeur={false} toggleFiltre={toggleFiltre}
                                 filtres={filtres} unite={'Indisponible'}/>
                </div>
            </div>
            <hr/>

            {/* État */}
            <div className="filter-section mb-4">
                <h6 className="pb-2 "><i className="bi bi-caret-right-fill"></i> État</h6>
                <div className="filter-options ps-2">
                    {['NEUF', 'RECONDITIONNE', 'OCCASION'].map((v) => (
                        <FiltreMulti key={v} typeFiltre={"etat"} valeur={v} toggleFiltre={toggleFiltre}
                                     filtres={filtres}/>
                    ))}
                </div>
            </div>
        </div>


    )
}

export default Sidebar;