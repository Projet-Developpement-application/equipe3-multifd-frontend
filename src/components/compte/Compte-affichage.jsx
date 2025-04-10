export default function CompteAffichage({ informations, onEdit }){
    return (
        <div className="border rounded border-2">
            <h3 className="mb-3">Mes informations de contact</h3>
            <div className="row mb-2">
                <div className="col-md-6"><strong>Nom :</strong> {informations.nom}</div>
                <div className="col-md-6"><strong>Prénom :</strong> {informations.prenom}</div>
            </div>
            <div className="row mb-2">
                <div className="col-md-6"><strong>Courriel :</strong> {informations.courriel}</div>
                <div className="col-md-6"><strong>Téléphone :</strong> {informations.telephone}</div>
            </div>
            <div className="row mb-3">
                <div className="col-md-6"><strong>Adresse :</strong> {informations.adresse}</div>
                <div className="col-md-6"><strong>Ville :</strong> {informations.ville}</div>
            </div>
            <div className="mb-2"><strong>Entreprise :</strong> {informations.entreprise}</div>
            <div className="d-flex justify-content-end">
                <button className="btn btn-outline-dark btn-sm" onClick={onEdit}>
                    Modifier
                </button>
            </div>
        </div>
    );
}