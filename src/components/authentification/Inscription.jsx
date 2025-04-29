import {useState} from "react";
import logo from "../../assets/logo/multifd-logo.svg";
import {useNavigate} from "react-router-dom";
import {inscription} from "../../scripts/http.js";

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
    const [valid, setValid] = useState({
        email: false,
        password: false,
        confirmPassword: false,
        firstName: false,
        lastName: false,
        company: false,
    });
    const [touched, setTouched] = useState({
        email: false,
        password: false,
        confirmPassword: false,
        firstName: false,
        lastName: false,
        company: false,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));

        if (name === "email") {
            setValid(prev => ({...prev, email: /\S+@\S+\.\S+/.test(value)}));
        }
        if (name === "password") {
            setValid(prev => ({...prev, password: value.length >= 8}));
        }
        if (name === "confirmPassword") {
            setValid(prev => ({...prev, confirmPassword: value === formData.password}));
        }
        if (name === "firstName" || name === "lastName") {
            setValid(prev => ({...prev, [name]: value.length >= 2}));
        }
        if (name === "company") {
            setValid(prev => ({...prev, company: value.length >= 2}));
        }
    };

    const handleBlur = (e) => {
        setTouched(prev => ({...prev, [e.target.name]: true}));
    };

    const getInputClass = (field) => {
        if (!touched[field]) return 'form-control';
        if (field === 'company' && formData.company.trim() === '') return 'form-control';
        return `form-control ${valid[field] ? 'is-valid' : 'is-invalid'}`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const {password, confirmPassword} = formData;

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }
        setError('');

        inscription(formData)
            .then(value => {
                if (value.status === 200) {
                    navigate("/connexion", {
                        state: {successMessage: "Votre compte a été créé avec succès. Veuillez vous connecter."}
                    });
                } else {
                    value.json().then(rep => setError(rep.erreur))
                }
            });
    };

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-start justify-content-center marge-custom ">
            <div className="row w-100 shadow-lg rounded overflow-hidden border border-2" style={{maxWidth: '1000px'}}>
                <div className="col-md-5 d-flex justify-content-center align-items-center bg-bleu-fonce1">
                    <img src={logo} alt="Logo multifd" className="w-100 p-4" style={{maxHeight: "90%"}}/>
                </div>

                <div className="col-md-7 bg-light p-5 text-black">
                    <h3 className="text-center mb-3 texte-bleu-fonce1">
                        <strong>Formulaire d'inscription</strong>
                    </h3>
                    <hr className="mb-5"/>

                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <div className="col">
                                <label className="form-label">Prénom <span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    className={getInputClass("firstName")}
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                    minLength={2}
                                    maxLength={50}
                                />
                            </div>
                            <div className="col">
                                <label className="form-label">Nom <span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    className={getInputClass("lastName")}
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                    minLength={2}
                                    maxLength={50}
                                />
                            </div>
                        </div>

                        <div className="mb-5">
                            <label className="form-label">Entreprise</label>
                            <input
                                type="text"
                                className={getInputClass("company")}
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
                        </div>

                        <hr/>

                        <div className="mb-3 mt-5">
                            <label className="form-label">Courriel <span className="text-danger">*</span></label>
                            <input
                                type="email"
                                className={getInputClass("email")}
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                minLength={5}
                                maxLength={100}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Mot de passe <span className="text-danger">*</span></label>
                            <input
                                type="password"
                                className={getInputClass("password")}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                minLength={8}
                                maxLength={100}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Confirmer le mot de passe <span
                                className="text-danger">*</span></label>
                            <input
                                type="password"
                                className={getInputClass("confirmPassword")}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                minLength={8}
                                maxLength={100}
                            />
                        </div>

                        {error && <div className="alert alert-danger">{error}</div>}

                        <div className="d-grid">
                            <button type="submit" className="btn btn-dark">S'inscrire</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
