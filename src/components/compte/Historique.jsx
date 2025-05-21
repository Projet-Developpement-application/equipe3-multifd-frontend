import {useEffect, useState} from "react";
import {getHistorique} from "../../scripts/httpClient.js";

export default function Historique(){
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

    return (
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
    )
}