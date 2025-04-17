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
        marque: marques[0],
        image: null,
        imagePreview: null
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        setErrors(prev => ({ ...prev, [name]: null }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProduct(prev => ({
                ...prev,
                image: file,
                imagePreview: URL.createObjectURL(file)
            }));
            setErrors(prev => ({ ...prev, image: null }));
        }
    };

    const validate = () => {
        const newErrors = {};
        const requiredFields = ['nom', 'prix', 'poids', 'voltage', 'hp', 'amperage', 'courant'];

        requiredFields.forEach(field => {
            const value = product[field];
            if (!value && value !== 0) {
                newErrors[field] = 'Ce champ est requis.';
            } else if (['prix', 'poids', 'voltage', 'hp', 'amperage', 'courant'].includes(field)) {
                const num = Number(value);
                if (isNaN(num)) {
                    newErrors[field] = 'Doit être un nombre.';
                } else {
                    if (num < 0) {
                        newErrors[field] = 'La valeur ne peut pas être négative.';
                    }
                }
            }
        });


        if (!product.image) {
            newErrors.image = "L'image est requise.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            alert("Produit enregistré !");
            console.log(product);
        }
    };

    return (
        <div className="container my-5">
            <form onSubmit={handleSubmit} className="border p-4 bg-light rounded">
                <div className="row">
                    <div className="col-md-4 text-center mb-3">
                        {product.imagePreview ? (
                            <img
                                src={product.imagePreview}
                                alt="Prévisualisation"
                                className="img-fluid rounded mb-2"
                                style={{ maxHeight: '250px', objectFit: 'contain' }}
                            />
                        ) : (
                            <div className="bg-secondary text-white d-flex align-items-center justify-content-center rounded" style={{ height: '250px' }}>
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
                                    value={product.nom}
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
                                    value={product.prix}
                                    onChange={handleChange}
                                    className={`form-control ${errors.prix ? 'is-invalid' : ''}`}
                                />
                                {errors.prix && <div className="invalid-feedback">{errors.prix}</div>}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Marque</label>
                                <select name="marque" value={product.marque} onChange={handleChange}
                                        className="form-select">
                                    {marques.map((marque, index) => <option key={index}
                                                                            value={marque}>{marque}</option>)}
                                </select>
                            </div>

                            <div className="col-md-6 mb-4 d-flex align-items-end">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="disponible"
                                        checked={product.disponible}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label">Disponible</label>
                                </div>
                            </div>

                            <h3>Caractéristiques</h3>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Poids (kg)</label>
                                <input
                                    type="text"
                                    name="poids"
                                    value={product.poids}
                                    onChange={handleChange}
                                    className={`form-control ${errors.poids ? 'is-invalid' : ''}`}
                                />
                                {errors.poids && <div className="invalid-feedback">{errors.poids}</div>}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Voltage (V)</label>
                                <input
                                    type="text"
                                    name="voltage"
                                    value={product.voltage}
                                    onChange={handleChange}
                                    className={`form-control ${errors.voltage ? 'is-invalid' : ''}`}
                                />
                                {errors.voltage && <div className="invalid-feedback">{errors.voltage}</div>}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">HP</label>
                                <input
                                    type="text"
                                    name="hp"
                                    value={product.hp}
                                    onChange={handleChange}
                                    className={`form-control ${errors.hp ? 'is-invalid' : ''}`}
                                />
                                {errors.hp && <div className="invalid-feedback">{errors.hp}</div>}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Ampérage (A)</label>
                                <input
                                    type="text"
                                    name="amperage"
                                    value={product.amperage}
                                    onChange={handleChange}
                                    className={`form-control ${errors.amperage ? 'is-invalid' : ''}`}
                                />
                                {errors.amperage && <div className="invalid-feedback">{errors.amperage}</div>}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Courant (Phase)</label>
                                <input
                                    type="text"
                                    name="courant"
                                    value={product.courant}
                                    onChange={handleChange}
                                    className={`form-control ${errors.courant ? 'is-invalid' : ''}`}
                                />
                                {errors.courant && <div className="invalid-feedback">{errors.courant}</div>}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">État</label>
                                <select name="etat" value={product.etat} onChange={handleChange}
                                        className="form-select">
                                    {etats.map((etat, index) => <option key={index} value={etat}>{etat}</option>)}
                                </select>
                            </div>

                            <div className="col-12 d-flex justify-content-between">
                                <button type="submit" className="btn btn-dark"> Enregistrer</button>
                            </div>

                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default GestionProduit;
