import CompteForm from "./Compte-form.jsx";
import CompteAffichage from "./Compte-affichage.jsx";
import {useContext, useEffect, useState} from "react";
import {UtilisateurContext} from "../../assets/contexte/UtilisateurContext.jsx";
import {fetchUtilisateur, modifierUtilisateur} from "../../scripts/httpClient.js";
import Historique from "./Historique.jsx";

const Compte = () => {
    const [modeEdition, setModeEdition] = useState(false);
    const {utilisateur, setUtilisateur} = useContext(UtilisateurContext);

    useEffect(() => {
        const email = sessionStorage.getItem("mail");
        if (!email) {

            return;
        }

        fetchUtilisateur(email)
            .then(data => {
                setUtilisateur(data);
                sessionStorage.setItem("nom", data.nom);
                sessionStorage.setItem("prenom", data.prenom);
                sessionStorage.setItem("entreprise", data.entreprise);
            })
            .catch(err => {
                console.error("Erreur de chargement utilisateur :", err);
            })
            .finally(() => {

            });
    }, []);

    const handleSave = (nouvellesInfos) => {
        modifierUtilisateur(utilisateur.mail, nouvellesInfos)
            .then((res) => {
                setUtilisateur(nouvellesInfos);
                setModeEdition(false);
                sessionStorage.setItem("nom", nouvellesInfos.nom);
                sessionStorage.setItem("prenom", nouvellesInfos.prenom);
                sessionStorage.setItem("entreprise", nouvellesInfos.entreprise);
            })
            .catch(err => {
                console.error("Erreur lors de la modification :", err);

                alert("Erreur lors de la modification.");
            });
    };

    return (
        <>
            <div className="container pt-5">
                <h2 className="mb-5 fw-bold">Mon compte</h2>
                {modeEdition ? (
                    <CompteForm
                        informations={utilisateur}
                        onSave={handleSave}
                        onCancel={() => setModeEdition(false)}
                    />
                ) : (
                    <CompteAffichage
                        informations={utilisateur}
                        onEdit={() => setModeEdition(true)}
                    />
                )}
                <Historique/>

            </div>
        </>
    );
};

export default Compte;