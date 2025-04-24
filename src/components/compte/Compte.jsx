import CompteForm from "./Compte-form.jsx";
import CompteAffichage from "./Compte-affichage.jsx";
import {useState} from "react";
import {useUtilisateur} from "../../assets/contexte/UtilisateurContext.jsx";

const Compte = () => {
    const [modeEdition, setModeEdition] = useState(false);
    const { utilisateur, updateUtilisateur } = useUtilisateur();

    const handleSave = (nouvellesInfos) => {
        updateUtilisateur(nouvellesInfos);
        setModeEdition(false);
    };

    return (
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
    );
};

export default Compte;