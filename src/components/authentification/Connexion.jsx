import { useState } from "react";
import logo from "../../assets/logo/multifd-logo.svg";

export default function Connexion() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [touched, setTouched] = useState({
        email: false,
        password: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleBlur = (e) => {
        setTouched(prev => ({ ...prev, [e.target.name]: true }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = formData;

        if (!email || !password) {
            setError("Veuillez remplir tous les champs requis.");
            return;
        }

        setError('');
        setSubmitted(true);
        console.log("Connexion réussie :", formData);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
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
                    <hr className="mb-5" />

                    {submitted ? (
                        <div className="alert alert-success text-center">
                            ✅ Connexion réussie !
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="mb-4">
                                <label className="form-label">Courriel <span className="text-danger">*</span></label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label">Mot de passe <span className="text-danger">*</span></label>
                                <div className="input-group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="form-control"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        minLength={8}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={togglePasswordVisibility}
                                        tabIndex={-1}
                                    >
                                        <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                                    </button>
                                </div>
                            </div>

                            {error && <div className="alert alert-danger">{error}</div>}

                            <div className="d-grid">
                                <button type="submit" className="btn btn-dark">Se connecter</button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
