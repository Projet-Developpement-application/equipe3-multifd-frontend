import CompteForm from "./Compte-form.jsx";
import CompteAffichage from "./Compte-affichage.jsx";
import {useContext, useState} from "react";
import {UtilisateurContext} from "../../assets/contexte/UtilisateurContext.jsx";
import {modifierUtilisateur} from "../../scripts/httpClient.js";
import Historique from "./Historique.jsx";

const Compte = () => {
    const [modeEdition, setModeEdition] = useState(false);
    const {utilisateur, setUtilisateur} = useContext(UtilisateurContext);

    const handleSave = (nouvellesInfos) => {
        modifierUtilisateur(utilisateur.mail, nouvellesInfos)
            .then((res) => {
                setUtilisateur(nouvellesInfos);
                setModeEdition(false);
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
            </div>
            <Historique/>
        </>
    );
};

export default Compte;