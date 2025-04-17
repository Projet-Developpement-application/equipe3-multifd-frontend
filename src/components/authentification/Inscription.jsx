import { useState } from "react";
import logo from "../../assets/logo/multifd-logo.svg";

export default function Inscription() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        company: '',
        firstName: '',
        lastName: ''
    });

    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [valid, setValid] = useState({
        email: false,
        password: false,
        confirmPassword: false,
        firstName: false,
        lastName: false,
        company: true, // Par défaut, valide s'il est vide
    });
    const [touched, setTouched] = useState({
        email: false,
        password: false,
        confirmPassword: false,
        firstName: false,
        lastName: false,
        company: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Validation
        if (name === "email") {
            setValid(prev => ({ ...prev, email: /\S+@\S+\.\S+/.test(value) }));
        }
        if (name === "password") {
            setValid(prev => ({ ...prev, password: value.length >= 8 }));
        }
        if (name === "confirmPassword") {
            setValid(prev => ({ ...prev, confirmPassword: value === formData.password }));
        }
        if (name === "firstName" || name === "lastName") {
            setValid(prev => ({ ...prev, [name]: value.length >= 2 }));
        }
        if (name === "company") {
            setValid(prev => ({ ...prev, company: value.length === 0 || value.length >= 2 }));
        }
    };

    const handleBlur = (e) => {
        setTouched(prev => ({ ...prev, [e.target.name]: true }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        setError('');
        setSubmitted(true);
        console.log("Formulaire soumis :", formData);
    };

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
            <div className="row w-100 shadow-lg rounded overflow-hidden border border-2" style={{ maxWidth: '1000px' }}>
                <div className="col-md-5 d-flex justify-content-center align-items-center bg-bleu-fonce1">
                    <img src={logo} alt="Logo multifd" className="w-100 p-4" style={{ maxHeight: "90%" }} />
                </div>

                <div className="col-md-7 bg-light p-4 text-black">
                    <h3 className="text-center mb-3 texte-bleu-fonce1">
                        <strong>Formulaire d'inscription</strong>
                    </h3>
                    <hr className="mb-5" />

                    {submitted ? (
                        <div className="alert alert-success text-center">
                            ✅ Inscription réussie !
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-3">
                                <div className="col">
                                    <div className={touched.firstName && !valid.firstName ? "has-danger" : valid.firstName ? "has-success" : ""}>
                                        <label className="form-label">Prénom <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className={`form-control ${touched.firstName && !valid.firstName ? "is-invalid" : valid.firstName ? "is-valid" : ""}`}
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required
                                            minLength={2}
                                            maxLength={50}
                                        />
                                        <div className={touched.firstName && !valid.firstName ? "invalid-feedback" : valid.firstName ? "valid-feedback" : ""}>
                                            {touched.firstName && !valid.firstName ? "Le prénom doit avoir au moins 2 caractères." : ""}
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className={touched.lastName && !valid.lastName ? "has-danger" : valid.lastName ? "has-success" : ""}>
                                        <label className="form-label">Nom <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className={`form-control ${touched.lastName && !valid.lastName ? "is-invalid" : valid.lastName ? "is-valid" : ""}`}
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required
                                            minLength={2}
                                            maxLength={50}
                                        />
                                        <div className={touched.lastName && !valid.lastName ? "invalid-feedback" : valid.lastName ? "valid-feedback" : ""}>
                                            {touched.lastName && !valid.lastName ? "Le nom doit avoir au moins 2 caractères." : ""}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-5">
                                <div className={touched.company && formData.company && !valid.company ? "has-danger" : formData.company && valid.company ? "has-success" : ""}>
                                    <label className="form-label">Entreprise</label>
                                    <input
                                        type="text"
                                        className={`form-control ${touched.company && formData.company && !valid.company ? "is-invalid" : formData.company && valid.company ? "is-valid" : ""}`}
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        minLength={2}
                                        maxLength={100}
                                    />
                                    <small className="text-muted">
                                        Si vous ne travaillez pas pour une entreprise, vous pouvez laisser ce champ vide.
                                    </small>
                                    <div className={touched.company && formData.company && !valid.company ? "invalid-feedback" : formData.company && valid.company ? "valid-feedback" : ""}>
                                        {touched.company && formData.company && !valid.company ? "Le nom de l'entreprise doit avoir au moins 2 caractères." : ""}
                                    </div>
                                </div>
                            </div>

                            <hr />

                            <div className="mb-3 mt-5">
                                <div className={touched.email && !valid.email ? "has-danger" : valid.email ? "has-success" : ""}>
                                    <label className="form-label">Courriel <span className="text-danger">*</span></label>
                                    <input
                                        type="email"
                                        className={`form-control ${touched.email && !valid.email ? "is-invalid" : valid.email ? "is-valid" : ""}`}
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        minLength={5}
                                        maxLength={100}
                                    />
                                    <div className={touched.email && !valid.email ? "invalid-feedback" : valid.email ? "valid-feedback" : ""}>
                                        {touched.email && !valid.email ? "Veuillez entrer un courriel valide." : ""}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <div className={touched.password && !valid.password ? "has-danger" : valid.password ? "has-success" : ""}>
                                    <label className="form-label">Mot de passe <span className="text-danger">*</span></label>
                                    <input
                                        type="password"
                                        className={`form-control ${touched.password && !valid.password ? "is-invalid" : valid.password ? "is-valid" : ""}`}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        minLength={8}
                                        maxLength={100}
                                    />
                                    <div className={touched.password && !valid.password ? "invalid-feedback" : valid.password ? "valid-feedback" : ""}>
                                        {touched.password && !valid.password ? "Le mot de passe doit avoir au moins 8 caractères." : ""}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <div className={touched.confirmPassword && !valid.confirmPassword ? "has-danger" : valid.confirmPassword ? "has-success" : ""}>
                                    <label className="form-label">Confirmer le mot de passe <span className="text-danger">*</span></label>
                                    <input
                                        type="password"
                                        className={`form-control ${touched.confirmPassword && !valid.confirmPassword ? "is-invalid" : valid.confirmPassword ? "is-valid" : ""}`}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        minLength={8}
                                        maxLength={100}
                                    />
                                    <div className={touched.confirmPassword && !valid.confirmPassword ? "invalid-feedback" : valid.confirmPassword ? "valid-feedback" : ""}>
                                        {touched.confirmPassword && !valid.confirmPassword ? "Les mots de passe ne correspondent pas." : ""}
                                    </div>
                                </div>
                            </div>

                            {error && <div className="alert alert-danger">{error}</div>}

                            <div className="d-grid">
                                <button type="submit" className="btn btn-dark">S'inscrire</button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
