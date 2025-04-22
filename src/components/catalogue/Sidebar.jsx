import React, { useState } from "react";

const Sidebar = ({ ouvert, fermeture, onApplyFilters, onClearFilters }) => {
    const [selectedFilters, setSelectedFilters] = useState({});
    const [checkedState, setCheckedState] = useState({});
    const [amperageOuvert, setAmperageOuvert] = useState(false);
    const [voltageOuvert, setVoltageOuvert] = useState(false);
    const [marqueOuvert, setMarqueOuvert] = useState(false);
    const [hpOuvert, setHpOuvert] = useState(false);
    const [disponibiliteOuvert, setDisponibiliteOuvert] = useState(false);
    const [conditionOuvert, setConditionOuvert] = useState(false);
    const [prixOuvert, setPrixOuvert] = useState(false);

    const handleFilterChange = (filterCategory, value) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [filterCategory]: value,
        }));
        setCheckedState((prev) => ({
            ...prev,
            [filterCategory]: value,
        }));
    };

    const handleApply = () => {
        onApplyFilters(selectedFilters);
    };

    const handleClear = () => {
        setSelectedFilters({});
        setCheckedState({});
        onClearFilters();
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
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="sortOptions"
                            id="sortPriceAsc"
                            checked={checkedState["sort"] === "asc"}
                            onChange={() => handleFilterChange("sort", "asc")}
                        />
                        <label className="form-check-label" htmlFor="sortPriceAsc">
                            Prix croissant
                        </label>
                    </div>
                    <div className="form-check mb-4">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="sortOptions"
                            id="sortPriceDesc"
                            checked={checkedState["sort"] === "desc"}
                            onChange={() => handleFilterChange("sort", "desc")}
                        />
                        <label className="form-check-label" htmlFor="sortPriceDesc">
                            Prix décroissant
                        </label>
                    </div>
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
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="amp10"
                                    checked={!!checkedState["amperage10A"]}
                                    onChange={(e) =>
                                        handleFilterChange("amperage10A", e.target.checked ? "10A" : null)
                                    }
                                />
                                <label className="form-check-label" htmlFor="amp10">10A</label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="amp20"
                                    checked={!!checkedState["amperage20A"]}
                                    onChange={(e) =>
                                        handleFilterChange("amperage20A", e.target.checked ? "20A" : null)
                                    }
                                />
                                <label className="form-check-label" htmlFor="amp20">20A</label>
                            </div>
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
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="volt220"
                                    checked={!!checkedState["voltage220V"]}
                                    onChange={(e) =>
                                        handleFilterChange("voltage220V", e.target.checked ? "220V" : null)
                                    }
                                />
                                <label className="form-check-label" htmlFor="volt220">220V</label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="volt380"
                                    checked={!!checkedState["voltage380V"]}
                                    onChange={(e) =>
                                        handleFilterChange("voltage380V", e.target.checked ? "380V" : null)
                                    }
                                />
                                <label className="form-check-label" htmlFor="volt380">380V</label>
                            </div>
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
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="brandABB"
                                    checked={!!checkedState["marqueABB"]}
                                    onChange={(e) =>
                                        handleFilterChange("marqueABB", e.target.checked ? "ABB" : null)
                                    }
                                />
                                <label className="form-check-label" htmlFor="brandABB">ABB</label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="brandSiemens"
                                    checked={!!checkedState["marqueSiemens"]}
                                    onChange={(e) =>
                                        handleFilterChange("marqueSiemens", e.target.checked ? "Siemens" : null)
                                    }
                                />
                                <label className="form-check-label" htmlFor="brandSiemens">Siemens</label>
                            </div>
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
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="hp5"
                                    checked={!!checkedState["hp5"]}
                                    onChange={(e) =>
                                        handleFilterChange("hp5", e.target.checked ? "5HP" : null)
                                    }
                                />
                                <label className="form-check-label" htmlFor="hp5">5 HP</label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="hp10"
                                    checked={!!checkedState["hp10"]}
                                    onChange={(e) =>
                                        handleFilterChange("hp10", e.target.checked ? "10HP" : null)
                                    }
                                />
                                <label className="form-check-label" htmlFor="hp10">10 HP</label>
                            </div>
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
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="inStock"
                                    checked={!!checkedState["disponibiliteEnStock"]}
                                    onChange={(e) =>
                                        handleFilterChange("disponibiliteEnStock", e.target.checked ? "En stock" : null)
                                    }
                                />
                                <label className="form-check-label" htmlFor="inStock">En stock</label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="outOfStock"
                                    checked={!!checkedState["disponibiliteHorsStock"]}
                                    onChange={(e) =>
                                        handleFilterChange("disponibiliteHorsStock", e.target.checked ? "Hors stock" : null)
                                    }
                                />
                                <label className="form-check-label" htmlFor="outOfStock">Hors stock</label>
                            </div>
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
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="new"
                                    checked={!!checkedState["etatNeuf"]}
                                    onChange={(e) =>
                                        handleFilterChange("etatNeuf", e.target.checked ? "Neuf" : null)
                                    }
                                />
                                <label className="form-check-label" htmlFor="new">Neuf</label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="used"
                                    checked={!!checkedState["etatUsage"]}
                                    onChange={(e) =>
                                        handleFilterChange("etatUsage", e.target.checked ? "Usagé" : null)
                                    }
                                />
                                <label className="form-check-label" htmlFor="used">Usagé</label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="refurbished"
                                    checked={!!checkedState["etatReconditionne"]}
                                    onChange={(e) =>
                                        handleFilterChange("etatReconditionne", e.target.checked ? "Reconditionné" : null)
                                    }
                                />
                                <label className="form-check-label" htmlFor="refurbished">Reconditionné</label>
                            </div>
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
                                value={checkedState["prix"] || 0}
                                onChange={(e) =>
                                    handleFilterChange("prix", e.target.value)
                                }
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="sidebar-footer mt-auto d-flex justify-content-between p-3">
                <button className="btn btn-secondary" onClick={handleClear}>
                    Effacer
                </button>
                <button className="btn btn-primary" onClick={handleApply}>
                    Appliquer
                </button>
            </div>
        </div>
    );
};

export default Sidebar;