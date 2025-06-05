export default function CompteAffichage({ informations, onEdit }){
    return (
        <div className="border rounded border-2 p-4 bg-gris-plus-pale">
            <h3 className="mb-3">Mes informations de contact</h3>
            <div className="row mb-2">
                <div className="col-md-6"><strong>Prénom :</strong> {informations.prenom}</div>

                <div className="col-md-6"><strong>Nom :</strong> {informations.nom}</div>
            </div>
            <div className="row mb-2">
                <div className="col-md-6"><strong>Courriel :</strong> {informations.mail}</div>
                <div className="col-md-6"><strong>Entreprise :</strong> {informations.entreprise}</div>
            </div>

            <div className="d-flex justify-content-end">
                <button className="btn btn-dark btn-sm bg-bleu-bouton" onClick={onEdit}>

                    <i className="bi bi-pencil me-1"></i> Modifier
                </button>
            </div>
        </div>
    );
}