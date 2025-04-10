import CompteForm from "./Compte-form.jsx";
import CompteAffichage from "./Compte-affichage.jsx";
import {useState} from "react";

const Compte = () => {
    const [modeEdition, setModeEdition] = useState(false);
    const [informations, setInformations] = useState({
        nom: "SMITH",
        prenom: "Justine",
        courriel: "sjuju@vroom.com",
        telephone: "(418) 888-9090",
        entreprise: "Vroom Vroom Inc.",
        adresse: "123 rue de la mécanique",
        ville: "Sainte-Industrie",
    });

    const handleSave = (nouvellesInfos) => {
        setInformations(nouvellesInfos);
        setModeEdition(false);
    };

    return (
        <div className="container pt-5">
            <h2 className="mb-5 fw-bold">Mon compte</h2>
            {modeEdition ? (
                <CompteForm
                    informations={informations}
                    onSave={handleSave}
                    onCancel={() => setModeEdition(false)}
                />
            ) : (
                <CompteAffichage
                    informations={informations}
                    onEdit={() => setModeEdition(true)}
                />
            )}
        </div>
    );
};

export default Compte;