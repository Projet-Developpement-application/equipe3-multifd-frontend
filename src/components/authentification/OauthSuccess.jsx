import { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UtilisateurContext } from "../../assets/contexte/UtilisateurContext.jsx";

export default function OauthSuccess() {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const { setUtilisateur } = useContext(UtilisateurContext);

    useEffect(() => {
        const token = params.get("token");
        const mail = params.get("mail");
        const role = params.get("role");
        const nom = params.get("nom");
        const prenom = params.get("prenom");

        if (token && mail && role) {
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("mail", mail);
            sessionStorage.setItem("role", role);
            sessionStorage.setItem("nom", nom);
            sessionStorage.setItem("prenom", prenom);
            sessionStorage.setItem("isConnected", "true");

            setUtilisateur({ mail, role, nom, prenom });

            navigate("/"); // redirection vers l'accueil
        } else {
            navigate("/Connexion"); // s'il manque des infos
        }
    }, []);

    return <p>Connexion en cours...</p>;
}
