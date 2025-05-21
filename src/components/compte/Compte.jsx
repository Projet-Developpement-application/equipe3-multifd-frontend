import CompteForm from "./Compte-form.jsx";
import CompteAffichage from "./Compte-affichage.jsx";
import {useContext, useEffect, useState} from "react";
import {UtilisateurContext} from "../../assets/contexte/UtilisateurContext.jsx";
import {getHistorique, modifierUtilisateur} from "../../scripts/httpClient.js";

const Compte = () => {
    const [modeEdition, setModeEdition] = useState(false);
    const {utilisateur, setUtilisateur} = useContext(UtilisateurContext);
    const [listeCommande, setListeCommande] = useState([])
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        setIsFetching(true);
        getHistorique().then(value => {
            setListeCommande(value);
            setIsFetching(false);
        }).catch(reason => {
            setIsFetching(false);
            console.log(reason);
        })
    }, [])

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
            <div className="container pt-5">
                {isFetching ?
                    (<div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>) :
                    //TODO finir d'implementer ici
                    listeCommande.length > 0 ?
                        (listeCommande.map((value) => {
                            <div key={value.id}>
                                {console.log(value)}
                            </div>
                        })) : (
                            <div>
                                aucun historique
                            </div>
                        )
                }
            </div>
        </>
    );
};

export default Compte;