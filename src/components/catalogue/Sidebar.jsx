import React, {useEffect, useState} from "react";
import FiltreMulti from "./Filtres/FiltreMulti.jsx";
import FiltreRadio from "./Filtres/FiltreRadio.jsx";

const Sidebar = ({ouvert, fermeture, filtres, setFiltres}) => {
    // const [amperageOuvert, setAmperageOuvert] = useState(false);
    // const [voltageOuvert, setVoltageOuvert] = useState(false);
    // const [marqueOuvert, setMarqueOuvert] = useState(false);
    // const [hpOuvert, setHpOuvert] = useState(false);
    // const [disponibiliteOuvert, setDisponibiliteOuvert] = useState(false);
    // const [conditionOuvert, setConditionOuvert] = useState(false);
    // const [prixOuvert, setPrixOuvert] = useState(false);

    const [marques, setMarques] = useState([]);


    async function fetchMarques() {
        try {
            const data = await fetch("http://localhost:8080/marques", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const json = await data.json();
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
            <div className="sidebar-header mb-5">
                <h5>Filtres</h5>
                <button className="btn-close" onClick={fermeture}></button>
            </div>
            <div className="sidebar-content ps-2">
                <div className="mb-5">
                    <h6>Trier par</h6>
                    <FiltreRadio valeur={"asc"} name={"prixAsc"} identifiant={"sortPriceAsc"}
                                 motAffiche={"Prix croissant"} type={true} togglefiltre={toggleFiltre} filtres={filtres}
                    />
                    <FiltreRadio valeur={"desc"} name={"prixAsc"} identifiant={"sortPriceDesc"}
                                 motAffiche={"Prix décroissant"} type={false} togglefiltre={toggleFiltre}
                                 filtres={filtres}
                    />
                </div>

                <h6 className="mt-4 mb-4">Filtrer</h6>

                {/* Ampérage */}
                {/*<div className="filter-section mb-4">*/}
                {/*    /!*<div*!/*/}
                {/*    /!*    className="filter-header d-flex justify-content-between align-items-center"*!/*/}
                {/*    /!*    onClick={() => setAmperageOuvert(!amperageOuvert)}*!/*/}
                {/*    /!*>*!/*/}
                {/*    <span>Ampérage</span>*/}
                {/*    /!*<i className={`bi ${amperageOuvert ? "bi-chevron-up" : "bi-chevron-down"}`}></i>*!/*/}
                {/*</div>*/}

                {/*<div className="filter-options">*/}
                {/*    <FiltreMulti typeFiltre={"amperage"} valeur={10} unite={"A"}*/}
                {/*                 toggleFiltre={toggleFiltre} filtres={filtres}*/}
                {/*    />*/}
                {/*    <FiltreMulti typeFiltre={"amperage"} valeur={20} unite={"A"}*/}
                {/*                 toggleFiltre={toggleFiltre} filtres={filtres}*/}
                {/*    />*/}
                {/*</div>*/}

            </div>

            {/* Voltage */}
            <div className="filter-section mb-4">
                {/*<div*/}
                {/*    className="filter-header d-flex justify-content-between align-items-center"*/}
                {/*    onClick={() => setVoltageOuvert(!voltageOuvert)}*/}
                {/*>*/}
                <span>Voltage</span>
                {/*<i className={`bi ${voltageOuvert ? "bi-chevron-up" : "bi-chevron-down"}`}></i>*/}
                {/*</div>*/}
                {/*{voltageOuvert && (*/}
                <div className="filter-options">
                    {[600, 460, 240, 120].map((v) => (
                        <FiltreMulti key={v} typeFiltre={"voltage"} valeur={v} unite={"V"} toggleFiltre={toggleFiltre}
                                     filtres={filtres}/>
                    ))}
                </div>
                {/*)}*/}
            </div>

            {/* Marque */}
            <div className="filter-section mb-4">
                {/*<div*/}
                {/*    className="filter-header d-flex justify-content-between align-items-center"*/}
                {/*    onClick={() => setMarqueOuvert(!marqueOuvert)}*/}
                {/*>*/}
                <span>Marque</span>
                {/*<i className={`bi ${marqueOuvert ? "bi-chevron-up" : "bi-chevron-down"}`}></i>*/}
                {/*</div>*/}
                {/*{marqueOuvert && (*/}
                <div className="filter-options">
                    {marques.map((marque) => (
                        <FiltreMulti key={marque.nom} typeFiltre={"marques"} valeur={marque.nom}
                                     toggleFiltre={toggleFiltre} filtres={filtres}/>
                    ))}
                </div>
                {/*)}*/}
            </div>

            {/* HP */}
            <div className="filter-section mb-4">
                {/*<div*/}
                {/*    className="filter-header d-flex justify-content-between align-items-center"*/}
                {/*    onClick={() => setHpOuvert(!hpOuvert)}*/}
                {/*>*/}
                <span>HP</span>
                {/*<i className={`bi ${hpOuvert ? "bi-chevron-up" : "bi-chevron-down"}`}></i>*/}
                {/*</div>*/}
                {/*{hpOuvert && (*/}
                <div className="filter-options">
                    {[1, 2, 3, 5, 7.5, 10, 15, 20, 40, 50, 100].map((v) => (
                        <FiltreMulti key={v} typeFiltre={"hp"} valeur={v} unite={"hp"} toggleFiltre={toggleFiltre}
                                     filtres={filtres}/>
                    ))}
                </div>
                {/*)}*/}
            </div>

            {/* Disponibilité */}
            <div className="filter-section mb-4">
                {/*<div*/}
                {/*    className="filter-header d-flex justify-content-between align-items-center"*/}
                {/*    onClick={() => setDisponibiliteOuvert(!disponibiliteOuvert)}*/}
                {/*>*/}
                <span>Disponibilité</span>
                {/*<i className={`bi ${disponibiliteOuvert ? "bi-chevron-up" : "bi-chevron-down"}`}></i>*/}
                {/*</div>*/}
                {/*{disponibiliteOuvert && (*/}
                <div className="filter-options">
                    {/*<FiltreRadio type={"disponibilite"} valeur={true} name={"disponibilite"}*/}
                    {/*             identifiant={"disponible"} motAffiche={"Disponible"}*/}
                    {/*             toggleFiltre={toggleFiltre} filtres={filtres}/>*/}
                    {/*<FiltreRadio type={"disponibilite"} valeur={false} name={"disponibilite"}*/}
                    {/*             identifiant={"indisponible"} motAffiche={"Indisponible"}*/}
                    {/*             toggleFiltre={toggleFiltre} filtres={filtres}/>*/}
                    <FiltreMulti typeFiltre={"disponibilite"} valeur={true} toggleFiltre={toggleFiltre}
                                 filtres={filtres} unite={'Disponible'}/>
                    <FiltreMulti typeFiltre={"disponibilite"} valeur={false} toggleFiltre={toggleFiltre}
                                 filtres={filtres} unite={'Indisponible'}/>
                </div>
                {/*)}*/}
            </div>

            {/* État */}
            <div className="filter-section mb-4">
                {/*<div*/}
                {/*    className="filter-header d-flex justify-content-between align-items-center"*/}
                {/*    onClick={() => setConditionOuvert(!conditionOuvert)}*/}
                {/*>*/}
                <span>État</span>
                {/*<i className={`bi ${conditionOuvert ? "bi-chevron-up" : "bi-chevron-down"}`}></i>*/}
                {/*</div>*/}
                {/*{conditionOuvert && (*/}
                <div className="filter-options">
                    {['NEUF', 'RECONDITIONNE', 'OCCASION'].map((v) => (
                        <FiltreMulti key={v} typeFiltre={"etat"} valeur={v} toggleFiltre={toggleFiltre}
                                     filtres={filtres}/>
                    ))}
                </div>
                {/*)}*/}
            </div>
        </div>


    )
}

export default Sidebar;