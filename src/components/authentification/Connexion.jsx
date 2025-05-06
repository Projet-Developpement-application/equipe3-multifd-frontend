import {Link, Navigate, useLocation, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import logo from "../../assets/logo/multifd-logo.svg";
import {connexion} from "../../scripts/http.js";
import {UtilisateurContext} from "../../assets/contexte/UtilisateurContext.jsx";
import Inscription from "./Inscription.jsx";

export default function Connexion() {
    const location = useLocation();
    const navigate = useNavigate();
    const successMessage = location.state?.successMessage || null;
    const [error, setError] = useState({error: "", message: ""});
    const {utilisateur, setUtilisateur} = useContext(UtilisateurContext);

    const [formData, setFormData] = useState({
        mail: '',
        mdp: '',
    });
    const URL = "http://172.20.46.30/siteReact/equipe3-multifd-frontend";


    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await connexion(formData, setError);
        if (response !== null) {
            setUtilisateur({
                mail: sessionStorage.getItem("mail"),
                role: sessionStorage.getItem("role"),
                nom: sessionStorage.getItem("nom"),
                prenom: sessionStorage.getItem("prenom"),
            });
            navigate("../");
        }
    }

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-start justify-content-center">
            <div className="row w-100 shadow-lg rounded overflow-hidden border border-2 marge-custom"
                 style={{maxWidth: '1000px'}}>
                <div className="col-md-5 d-flex justify-content-center align-items-center bg-bleu-fonce1">
                    <img src={logo} alt="Logo multifd" className="w-100 p-4" style={{maxHeight: "90%"}}/>
                </div>

                <div className="col-md-7 bg-light p-5 text-black p-5">
                    <h3 className="text-center mb-3 texte-bleu-fonce1">
                        <strong>Connexion à votre compte</strong>
                    </h3>
                    <hr className="mb-4"/>

                    {successMessage && (
                        <div className="alert alert-success text-center">
                            {successMessage}
                        </div>
                    )}
                    {error.error !== "" ?
                        <div className="alert alert-danger" role="alert">
                            {error.message}
                        </div>
                        : undefined}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Courriel</label>
                            <span className="text-danger">*</span>
                            <input
                                type="email"
                                name="mail"
                                className="form-control"
                                value={formData.mail}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4 position-relative">
                            <label className="form-label">Mot de passe</label>
                            <span className="text-danger">*</span>
                            <div className="input-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="mdp"
                                    className="form-control"
                                    value={formData.mdp}
                                    onChange={handleChange}
                                    required
                                />
                                <span
                                    className="input-group-text bg-white cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{cursor: "pointer"}}
                                >
                                    <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                                </span>
                            </div>
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-dark">Se connecter</button>
                        </div>
                    </form>
                    <div className="pt-5 d-flex align-items-start justify-content-center">
                    <Link to={URL+"/Inscription"} className="text-decoration-none text-dark">
                            <i className="bi bi-person-add"></i> Créer un compte
                    </Link></div>
                </div>
            </div>
        </div>
    );
}
