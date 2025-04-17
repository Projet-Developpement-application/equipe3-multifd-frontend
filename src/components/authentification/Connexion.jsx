import { useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/logo/multifd-logo.svg";

export default function Connexion() {
    const location = useLocation();
    const successMessage = location.state?.successMessage || null;

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
            <div className="row w-100 shadow-lg rounded overflow-hidden border border-2" style={{ maxWidth: '1000px' }}>
                <div className="col-md-5 d-flex justify-content-center align-items-center bg-bleu-fonce1">
                    <img src={logo} alt="Logo multifd" className="w-100 p-4" style={{ maxHeight: "90%" }} />
                </div>

                <div className="col-md-7 bg-light p-4 text-black">
                    <h3 className="text-center mb-3 texte-bleu-fonce1">
                        <strong>Connexion à votre compte</strong>
                    </h3>
                    <hr className="mb-4" />

                    {successMessage && (
                        <div className="alert alert-success text-center">
                            {successMessage}
                        </div>
                    )}

                    <form>
                        <div className="mb-3">
                            <label className="form-label">Courriel</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4 position-relative">
                            <label className="form-label">Mot de passe</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <span
                                    className="input-group-text bg-white cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                                </span>
                            </div>
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-dark">Se connecter</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
