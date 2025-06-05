// ProduitForm.jsx
import React from 'react';
import {Link} from "react-router-dom";
import {URL_ROUTE_FRONTEND} from "../../App.jsx";

const ProduitForm = ({ produitImage, produit, marques, etats, errors, handleChange,handleChangeMarque, handleImageChange, handleSubmit, isEditMode }) => {
    return (
        <div className="container my-5 ">
            <form onSubmit={handleSubmit} className="border border-black  p-4 bg-light rounded">
                <div className="row">
                    <div className="col-md-4 text-center mb-3">
                        {produit.imagePreview || produitImage ? (
                            <img
                                src={produit.imagePreview || produitImage}
                                alt="Prévisualisation"
                                className="img-fluid rounded mb-2"
                                style={{
                                    width: '100%',
                                    maxWidth: '300px',
                                    height: '300px',
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                }}
                            />
                        ) : (
                            <div
                                className="bg-secondary text-white d-flex align-items-center justify-content-center rounded border m-2"
                                style={{ width: '100%', maxWidth: '300px', height: '300px' }}>
                                <span>Prévisualisation image</span>
                            </div>
                        )}
                        <input
                            type="file"
                            className={`form-control mt-2 ${errors.image ? 'is-invalid' : ''}`}
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {errors.image && <div className="invalid-feedback">{errors.image}</div>}
                    </div>

                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Nom du produit</label>
                                <input
                                    type="text"
                                    name="nom"
                                    value={produit.nom}
                                    onChange={handleChange}
                                    className={`form-control ${errors.nom ? 'is-invalid' : ''}`}
                                />
                                {errors.nom && <div className="invalid-feedback">{errors.nom}</div>}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Prix ($)</label>
                                <input
                                    type="number"
                                    name="prix"

                                    value={produit.prix}
                                    onChange={handleChange}
                                    className={`form-control ${errors.prix ? 'is-invalid' : ''}`}
                                />
                                {errors.prix && <div className="invalid-feedback">{errors.prix}</div>}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Marque</label>
                                <select name="marque" value={produit.marque.nom} onChange={handleChangeMarque}
                                        className="form-select">
                                    {marques.map(m => <option key={m.id} value={m.nom}>{m.nom}</option>)}
                                </select>
                                {errors.marque && <div className="invalid-feedback">{errors.marque}</div>}
                            </div>

                            <div className="col-md-6 mb-4">
                                <label className="form-label">Disponibilité</label>
                                <select name="disponibilite" value={produit.disponibilite} onChange={handleChange}
                                        className="form-select">
                                    <option value="Disponible">Disponible</option>
                                    <option value="Pas en stock">Pas en stock</option>
                                </select>
                            </div>

                            <h3>Caractéristiques</h3>
                            {['poids', 'voltage', 'hp', 'amperage', 'courant'].map(attr => (
                                <div key={attr} className="col-md-6 mb-3">
                                    <label className="form-label">{attr.charAt(0).toUpperCase() + attr.slice(1)}</label>
                                    <input
                                        type="number"
                                        name={attr}
                                        value={produit[attr]}
                                        onChange={handleChange}
                                        className={`form-control ${errors[attr] ? 'is-invalid' : ''}`}
                                    />
                                    {errors[attr] && <div className="invalid-feedback">{errors[attr]}</div>}
                                </div>
                            ))}

                            <div className="col-md-6 mb-3">
                                <label className="form-label">État</label>
                                <select name="etat" value={produit.etat} onChange={handleChange}
                                        className="form-select">
                                    {etats.map((etat, idx) => <option key={idx} value={etat}>{etat}</option>)}
                                </select>
                            </div>

                            <div className="col-12 d-flex justify-content-between">
                                <Link to={URL_ROUTE_FRONTEND+"/"} className="btn btn-dark">
                                    Retour
                                </Link>
                                <button type="submit" className="btn btn-dark bg-bleu-bouton">
                                    {isEditMode ? 'Modifier' : 'Enregistrer'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProduitForm;
