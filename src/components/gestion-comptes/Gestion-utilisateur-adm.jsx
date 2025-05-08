import React, {useState, useEffect, useContext} from 'react';
import {fetchAllUtilisateurs, modifierUtilisateur} from '../../scripts/http.js';
import {UtilisateurContext} from '../../assets/contexte/UtilisateurContext.jsx';

const USERS_PER_PAGE = 8;
export default function GestionUtilisateursAdm() {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [originalData, setOriginalData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);
    const {utilisateur} = useContext(UtilisateurContext);


    useEffect(() => {
        setIsFetching(true);
        fetchAllUtilisateurs().then(data => {
            setUsers(data);
            setIsFetching(false);
        }).catch(err => {
            console.error("Erreur lors du fetch des utilisateurs :", err);
            setError("Erreur lors du chargement des utilisateurs.");
            setIsFetching(false);
        });
    }, []);


    const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const currentUsers = users.slice(startIndex, startIndex + USERS_PER_PAGE);

    const handleEdit = (user) => {
        setEditingUser(user.mail);
        setOriginalData(user);
    };


    const handleCancel = () => {
        setUsers(users.map(user => (user.mail === editingUser ? originalData : user)));
        setEditingUser(null);
    };


    const handleSave = (mail) => {
        const userToSave = users.find(user => user.mail === mail);
        modifierUtilisateur(mail, userToSave).then(() => {
            alert("Modifications sauvegardées avec succès !");
            setEditingUser(null);
        }).catch(err => {
            console.error("Erreur lors de la sauvegarde :", err);
            alert("Erreur lors de la sauvegarde des modifications.");
        });
    };


    const handleChange = (e, mail) => {
        const {name, value} = e.target;
        if (name === "role" && value === "ADMIN") {
            const confirmation = window.confirm("Êtes-vous sûr de vouloir rendre cet utilisateur administrateur ?");
            if (!confirmation) return;
        }
        setUsers(users.map(user => user.mail === mail ? {...user, [name]: value} : user));
    };


    return (<div className="container mt-4 position-relative" style={{minHeight: "100vh"}}>
        <h2 className="mt-5 mx-4">Gestion des utilisateurs</h2>

        {isFetching ? (<div className="d-flex justify-content-center">

            <div className="spinner-border" role="status"></div>
        </div>) : error ? (

            <div className="alert alert-danger">{error}</div>) : (<>
            {currentUsers.map(user => (<div key={user.mail}
                                            className="row border border-dark p-3 m-4 bg-light rounded">
                {editingUser === user.mail ? (<>
                    <h5 className="mb-4 mt-1">Modification des informations</h5>
                    <div className="col-12">
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label><strong>Courriel</strong></label>
                                <input type="email"
                                       name="mail"
                                       className="form-control"
                                       value={user.mail}
                                       disabled/></div>
                            <div className="col-md-6">
                                <label><strong>Rôle</strong></label>
                                <select name="role"
                                        className="form-control"
                                        value={user.role}
                                        onChange={(e) => handleChange(e, user.mail)}>
                                    <option value="CLIENT">Client</option>
                                    <option value="ADMIN">Admin</option>
                                </select></div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label><strong>Prénom</strong></label>
                                <input type="text"
                                       name="prenom"
                                       className="form-control"
                                       value={user.prenom}
                                       onChange={(e) => handleChange(e, user.mail)}/>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label><strong>Nom</strong></label>
                                <input type="text" name="nom"
                                       className="form-control"
                                       value={user.nom}
                                       onChange={(e) => handleChange(e, user.mail)}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label><strong>Entreprise</strong></label>
                                <input type="text"
                                       name="entreprise"
                                       className="form-control"
                                       value={user.entreprise}
                                       onChange={(e) => handleChange(e, user.mail)}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-secondary mx-2" onClick={handleCancel}> Annuler
                        </button>
                        <button className="btn btn-dark mx-2"
                                onClick={() => handleSave(user.mail)}> Sauvegarder
                        </button>
                    </div>
                </>) : (<>
                    <div className="col-12"><h5 className="mb-3">{user.prenom} {user.nom}</h5>
                        <h6 className="mb-3">{user.mail}</h6></div>
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-dark mx-2" onClick={() => handleEdit(user)}> Modifier
                        </button>
                        {user.mail === utilisateur.mail ? (
                            <button className="btn btn-danger mx-2" disabled> Supprimer </button>) : (
                            <button className="btn btn-danger mx-2"
                                    onClick={() => alert("Supprimer utilisateur avec mail : " + user.mail)}> Supprimer </button>)}
                    </div>
                </>)}                        </div>))}


            {/* Pagination */}
            <div className="pagination-container">
                <nav>
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                            <button className="page-link" onClick={() => setCurrentPage(1)}>&laquo;</button>
                        </li>
                        {[...Array(totalPages)].map((_, index) => (
                            <li key={index} className={`page-item ${currentPage === index + 1 && "active"}`}>
                                <button className="page-link"
                                        onClick={() => setCurrentPage(index + 1)}>                                            {index + 1}                                        </button>
                            </li>))}
                        <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
                            <button className="page-link"
                                    onClick={() => setCurrentPage(totalPages)}>&raquo;</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </>)}        </div>);
}