
import React, { useState } from 'react';

const GestionProduit = () => {

    const etats = ["Neuf", "Usagé", "Remis à neuf"];
    const marques = ["Siemens", "ABB", "Schneider", "Eaton"];

    const [product, setProduct] = useState({
        nom: '',
        disponible: false,
        prix: '',
        etat: etats[0],
        poids: '',
        voltage: '',
        hp: '',
        amperage: '',
        courant: '',
        marque: marques[0]
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Produit ajouté :", product);
        alert("Produit enregistré !");
    };

    return (
        <div className="container mt-5">

            <form onSubmit={handleSubmit} className="border p-4 rounded bg-light">
                <h3 className="mb-4">Ajouter un produit</h3>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Nom</label>
                        <input type="text" className="form-control" name="nom" value={product.nom}
                               onChange={handleChange}/>
                    </div>
                    <div className="col-md-6 d-flex align-items-end">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="disponible"
                                   checked={product.disponible} onChange={handleChange}/>
                            <label className="form-check-label">Disponible</label>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Prix unitaire ($)</label>
                        <input type="number" className="form-control" name="prix" value={product.prix}
                               onChange={handleChange}/>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">État</label>
                        <select className="form-select" name="etat" value={product.etat} onChange={handleChange}>
                            {etats.map((etat, index) => (
                                <option key={index} value={etat}>{etat}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Poids (kg)</label>
                        <input type="number" className="form-control" name="poids" value={product.poids}
                               onChange={handleChange}/>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Voltage (V)</label>
                        <input type="number" className="form-control" name="voltage" value={product.voltage}
                               onChange={handleChange}/>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">HP</label>
                        <input type="number" className="form-control" name="hp" value={product.hp}
                               onChange={handleChange}/>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Ampérage (A)</label>
                        <input type="number" className="form-control" name="amperage" value={product.amperage}
                               onChange={handleChange}/>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Courant (A)</label>
                        <input type="number" className="form-control" name="courant" value={product.courant}
                               onChange={handleChange}/>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Marque</label>
                        <select className="form-select" name="marque" value={product.marque} onChange={handleChange}>
                            {marques.map((marque, index) => (
                                <option key={index} value={marque}>{marque}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-dark">Enregistrer</button>
                </div>
            </form>
        </div>
    );
};

export default GestionProduit;
