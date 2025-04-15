import React, { useState } from "react";

const Sidebar = ({ isOpen, onClose }) => {
    const [isAmpOpen, setIsAmpOpen] = useState(false);
    const [isVoltOpen, setIsVoltOpen] = useState(false);
    const [isBrandOpen, setIsBrandOpen] = useState(false);
    const [isHpOpen, setIsHpOpen] = useState(false);
    const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);
    const [isConditionOpen, setIsConditionOpen] = useState(false);
    const [isPriceOpen, setIsPriceOpen] = useState(false);

    return (
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
            <div className="sidebar-header mb-5">
                <h5>Filtres</h5>
                <button className="btn-close" onClick={onClose}></button>
            </div>
            <div className="sidebar-content ps-2">
                {/* Section Trier par */}
                <div className=" mb-5">
                <h6>Trier par</h6>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="sortOptions"
                        id="sortPriceAsc"
                        value="asc"
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
                        value="desc"
                    />
                    <label className="form-check-label" htmlFor="sortPriceDesc">
                        Prix décroissant
                    </label>
                </div>
                </div>

                {/* Section Filtrer */}
                <h6 className="mt-4 mb-4">Filtrer</h6>

                {/* Filtre Ampérage */}
                <div className="filter-section mb-4">
                    <div
                        className="filter-header d-flex justify-content-between align-items-center"
                        onClick={() => setIsAmpOpen(!isAmpOpen)}
                    >
                        <span>Ampérage</span>
                        <i className={`bi ${isAmpOpen ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
                    </div>
                    {isAmpOpen && (
                        <div className="filter-options">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="amp10" />
                                <label className="form-check-label" htmlFor="amp10">10A</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="amp20" />
                                <label className="form-check-label" htmlFor="amp20">20A</label>
                            </div>
                        </div>
                    )}
                </div>

                {/* Filtre Voltage */}
                <div className="filter-section mb-4">
                    <div
                        className="filter-header d-flex justify-content-between align-items-center"
                        onClick={() => setIsVoltOpen(!isVoltOpen)}
                    >
                        <span>Voltage</span>
                        <i className={`bi ${isVoltOpen ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
                    </div>
                    {isVoltOpen && (
                        <div className="filter-options">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="volt220" />
                                <label className="form-check-label" htmlFor="volt220">220V</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="volt380" />
                                <label className="form-check-label" htmlFor="volt380">380V</label>
                            </div>
                        </div>
                    )}
                </div>

                {/* Filtre Marque */}
                <div className="filter-section mb-4">
                    <div
                        className="filter-header d-flex justify-content-between align-items-center"
                        onClick={() => setIsBrandOpen(!isBrandOpen)}
                    >
                        <span>Marque</span>
                        <i className={`bi ${isBrandOpen ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
                    </div>
                    {isBrandOpen && (
                        <div className="filter-options">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="brandABB" />
                                <label className="form-check-label" htmlFor="brandABB">ABB</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="brandSiemens" />
                                <label className="form-check-label" htmlFor="brandSiemens">Siemens</label>
                            </div>
                        </div>
                    )}
                </div>

                {/* Filtre HP */}
                <div className="filter-section mb-4">
                    <div
                        className="filter-header d-flex justify-content-between align-items-center"
                        onClick={() => setIsHpOpen(!isHpOpen)}
                    >
                        <span>HP</span>
                        <i className={`bi ${isHpOpen ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
                    </div>
                    {isHpOpen && (
                        <div className="filter-options">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="hp5" />
                                <label className="form-check-label" htmlFor="hp5">5 HP</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="hp10" />
                                <label className="form-check-label" htmlFor="hp10">10 HP</label>
                            </div>
                        </div>
                    )}
                </div>

                {/* Filtre Disponibilité */}
                <div className="filter-section mb-4">
                    <div
                        className="filter-header d-flex justify-content-between align-items-center"
                        onClick={() => setIsAvailabilityOpen(!isAvailabilityOpen)}
                    >
                        <span>Disponibilité</span>
                        <i className={`bi ${isAvailabilityOpen ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
                    </div>
                    {isAvailabilityOpen && (
                        <div className="filter-options">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="inStock" />
                                <label className="form-check-label" htmlFor="inStock">En stock</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="outOfStock" />
                                <label className="form-check-label" htmlFor="outOfStock">Hors stock</label>
                            </div>
                        </div>
                    )}
                </div>

                {/* Filtre État */}
                <div className="filter-section mb-4">
                    <div
                        className="filter-header d-flex justify-content-between align-items-center"
                        onClick={() => setIsConditionOpen(!isConditionOpen)}
                    >
                        <span>État</span>
                        <i className={`bi ${isConditionOpen ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
                    </div>
                    {isConditionOpen && (
                        <div className="filter-options">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="new" />
                                <label className="form-check-label" htmlFor="new">Neuf</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="used" />
                                <label className="form-check-label" htmlFor="used">Usagé</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="refurbished" />
                                <label className="form-check-label" htmlFor="refurbished">Reconditionné</label>
                            </div>
                        </div>
                    )}
                </div>

                {/* Filtre Prix */}
                <div className="filter-section mb-4">
                    <div
                        className="filter-header d-flex justify-content-between align-items-center"
                        onClick={() => setIsPriceOpen(!isPriceOpen)}
                    >
                        <span>Prix</span>
                        <i className={`bi ${isPriceOpen ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
                    </div>
                    {isPriceOpen && (
                        <div className="filter-options">
                            <label htmlFor="priceRange">Plage de prix :</label>
                            <input
                                type="range"
                                className="form-range"
                                id="priceRange"
                                min="0"
                                max="5000"
                                step="50"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;