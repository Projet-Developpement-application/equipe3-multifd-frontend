import React, {useEffect, useState} from "react";
import FiltreMulti from "./Filtres/FiltreMulti.jsx";
import FiltreRadio from "./Filtres/FiltreRadio.jsx";

const Sidebar = ({ouvert, fermeture, onApplyFilter, filtres, clearFilter}) => {
    const [amperageOuvert, setAmperageOuvert] = useState(false);
    const [voltageOuvert, setVoltageOuvert] = useState(false);
    const [marqueOuvert, setMarqueOuvert] = useState(false);
    const [hpOuvert, setHpOuvert] = useState(false);
    const [disponibiliteOuvert, setDisponibiliteOuvert] = useState(false);
    const [conditionOuvert, setConditionOuvert] = useState(false);
    const [prixOuvert, setPrixOuvert] = useState(false);

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

    function ajouterFiltre(type, valeur,isChecked) {
        if (isChecked) {
            filtres.current[type].push(valeur);
        }else {
            console.log(filtres.current[type]);
            filtres.current[type] = filtres.current[type].filter(item => item !== valeur);
            console.log(filtres.current[type]);
        }
    }


    return (
        <div className={`sidebar ${ouvert ? "open" : ""}`}>
            <div className="sidebar-header mb-5">
                <h5>Filtres</h5>
                <button className="btn-close" onClick={fermeture}></button>
            </div>
            <div className="sidebar-content ps-2">
                <div className="mb-5">
                    <h6>Trier par</h6>
                    <FiltreRadio valeur={"asc"} name={"sortOptions"} identifiant={"sortPriceAsc"}
                                 motAffiche={"Prix croissant"} type={true}
                                 handleChange={ajouterFiltre}/>
                    <FiltreRadio valeur={"desc"} name={"sortOptions"} identifiant={"sortPriceDesc"}
                                 motAffiche={"Prix décroissant"} type={false}
                                 handleChange={ajouterFiltre}/>
                </div>

                <h6 className="mt-4 mb-4">Filtrer</h6>

                {/* Ampérage */}
                <div className="filter-section mb-4">
                    <div
                        className="filter-header d-flex justify-content-between align-items-center"
                        onClick={() => setAmperageOuvert(!amperageOuvert)}
                    >
                        <span>Ampérage</span>
                        <i className={`bi ${amperageOuvert ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
                    </div>
                    {amperageOuvert && (
                        <div className="filter-options">
                            <FiltreMulti typeFiltre={"amperage"} valeur={10} unite={"A"}
                                         handleChange={ajouterFiltre}
                            />
                            <FiltreMulti typeFiltre={"amperage"} valeur={20} unite={"A"}
                                         handleChange={ajouterFiltre}
                            />
                        </div>
                    )}
                </div>

                {/* Voltage */}
                <div className="filter-section mb-4">
                    <div
                        className="filter-header d-flex justify-content-between align-items-center"
                        onClick={() => setVoltageOuvert(!voltageOuvert)}
                    >
                        <span>Voltage</span>
                        <i className={`bi ${voltageOuvert ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
                    </div>
                    {voltageOuvert && (
                        <div className="filter-options">
                            <FiltreMulti typeFiltre={"voltage"} valeur={600} unite={"V"}
                                         handleChange={ajouterFiltre}/>
                            <FiltreMulti typeFiltre={"voltage"} valeur={380} unite={"V"}
                                         handleChange={ajouterFiltre}/>
                        </div>
                    )}
                </div>

                {/* Marque */}
                <div className="filter-section mb-4">
                    <div
                        className="filter-header d-flex justify-content-between align-items-center"
                        onClick={() => setMarqueOuvert(!marqueOuvert)}
                    >
                        <span>Marque</span>
                        <i className={`bi ${marqueOuvert ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
                    </div>
                    {marqueOuvert && (
                        <div className="filter-options">
                            {marques.map((marque) => (
                                <FiltreMulti key={marque.nom} typeFiltre={"marque"} valeur={marque.nom}
                                             handleChange={ajouterFiltre}/>
                            ))}
                        </div>
                    )}
                </div>

                {/* HP */}
                <div className="filter-section mb-4">
                    <div
                        className="filter-header d-flex justify-content-between align-items-center"
                        onClick={() => setHpOuvert(!hpOuvert)}
                    >
                        <span>HP</span>
                        <i className={`bi ${hpOuvert ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
                    </div>
                    {hpOuvert && (
                        <div className="filter-options">
                            <FiltreMulti typeFiltre={"hp"} valeur={5} unite={"hp"} handleChange={ajouterFiltre}
                            />
                            <FiltreMulti typeFiltre={"hp"} valeur={10} unite={"hp"} handleChange={ajouterFiltre}
                            />
                        </div>
                    )}
                </div>

                {/* Disponibilité */}
                <div className="filter-section mb-4">
                    <div
                        className="filter-header d-flex justify-content-between align-items-center"
                        onClick={() => setDisponibiliteOuvert(!disponibiliteOuvert)}
                    >
                        <span>Disponibilité</span>
                        <i className={`bi ${disponibiliteOuvert ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
                    </div>
                    {disponibiliteOuvert && (
                        <div className="filter-options">
                            <FiltreRadio type={"disponibilite"} valeur={true} name={"disponibilite"}
                                         identifiant={"disponible"} motAffiche={"Disponible"}
                                         handleChange={ajouterFiltre}/>
                            <FiltreRadio type={"disponibilite"} valeur={false} name={"disponibilite"}
                                         identifiant={"indisponible"} motAffiche={"Indisponible"}
                                         handleChange={ajouterFiltre}/>
                        </div>
                    )}
                </div>

                {/* État */}
                <div className="filter-section mb-4">
                    <div
                        className="filter-header d-flex justify-content-between align-items-center"
                        onClick={() => setConditionOuvert(!conditionOuvert)}
                    >
                        <span>État</span>
                        <i className={`bi ${conditionOuvert ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
                    </div>
                    {conditionOuvert && (
                        <div className="filter-options">
                            <FiltreMulti typeFiltre={"etat"} valeur={"Neuf"} handleChange={handleChangeFiltre}
                            />
                            <FiltreMulti typeFiltre={"etat"} valeur={"Reconditionné"} handleChange={handleChangeFiltre}
                            />
                            <FiltreMulti typeFiltre={"etat"} valeur={"Occasion"} handleChange={handleChangeFiltre}
                            />
                        </div>
                    )}
                </div>

                {/* Prix */}
                <div className="filter-section mb-4">
                    <div
                        className="filter-header d-flex justify-content-between align-items-center"
                        onClick={() => setPrixOuvert(!prixOuvert)}
                    >
                        <span>Prix</span>
                        <i className={`bi ${prixOuvert ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
                    </div>
                    {prixOuvert && (
                        <div className="filter-options">
                            <label htmlFor="priceRange">Plage de prix :</label>
                            <input
                                type="range"
                                className="form-range"
                                id="priceRange"
                                min="0"
                                max="5000"
                                step="50"
                                // value={checkedState["prix"] || 0}
                                // onChange={(e) =>
                                //     handleFilterChange("prix", e.target.value)
                                // }
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="sidebar-footer mt-auto d-flex justify-content-between p-3">
                <button className="btn btn-secondary" onClick={() => clearFilter()}>
                    Effacer
                </button>
                <button className="btn btn-primary" onClick={() => onApplyFilter()}>
                    Appliquer
                </button>
            </div>
        </div>
    );
};

export default Sidebar;