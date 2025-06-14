import React, {useState, useEffect, useContext} from 'react';
import {fetchAllUtilisateurs} from '../../scripts/httpAdmin.js';
import {useNavigate} from 'react-router-dom';
import {UtilisateurContext} from '../../assets/contexte/UtilisateurContext.jsx';
import {deleteUtilisateurByEmail, activerUtilisateurByEmail} from "../../scripts/httpAdmin.js";
import {URL_ROUTE_FRONTEND} from "../../App.jsx";

const USERS_PER_PAGE = 6;

export default function GestionUtilisateursAdm() {
    const [allUsers,setAllUsers]= useState([]);
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);
    const {utilisateur} = useContext(UtilisateurContext);
    const navigate = useNavigate();

    useEffect(() => {
        setIsFetching(true);
        fetchAllUtilisateurs()
            .then(data => {
                setAllUsers(data);
                setUsers(data);
                setIsFetching(false);
            })
            .catch(err => {
                console.error("Erreur lors du fetch des utilisateurs :", err);
                setError("Erreur lors du chargement des utilisateurs.");
                setIsFetching(false);
            });
    }, []);

    const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const currentUsers = users.slice(startIndex, startIndex + USERS_PER_PAGE);

    const handleViewAccount = (email) => {
        navigate(URL_ROUTE_FRONTEND + `/utilisateur/${encodeURIComponent(email)}`);
    };


    function handleDeleteAccount(email) {
        const confirmed = window.confirm("Êtes-vous sûr de vouloir désactiver cet utilisateur ?");
        if (!confirmed) return;

        deleteUtilisateurByEmail(email)
            .then(() => {
                alert("Utilisateur désactivé avec succès !");
                setUsers(prevUsers => prevUsers.filter(user => user.mail !== email));
            })
            .catch(err => {
                console.error("Erreur lors de la désactivation de l'utilisateur :", err);
                alert("Erreur lors de la désactivation de l'utilisateur.");
            });
    }


    function handleToggleAccount(email, actif) {
        const action = actif ? "désactiver" : "activer";
        const confirmed = window.confirm(`Êtes-vous sûr de vouloir ${action} ce compte ?`);
        if (!confirmed) return;

        const apiCall = actif ? deleteUtilisateurByEmail : activerUtilisateurByEmail;
        apiCall(email)
            .then(() => {
                setUsers(prevUsers =>
                    prevUsers.map(user =>
                        user.mail === email ? {...user, actif: !actif} : user
                    )
                );
            })
            .catch(err => {
                console.error(`Erreur lors de la modification du compte :`, err);
                alert(`Erreur lors de la modification du compte.`);
            });
    }

    function filtreRecherche(nom){
        if (nom.trim() === "") {
            setUsers(allUsers);
        } else {
            const filtered = allUsers.filter(user =>
                user.mail.toLowerCase().includes(nom.toLowerCase()) ||
                user.nom.toLowerCase().includes(nom.toLowerCase()) ||
                user.prenom.toLowerCase().includes(nom.toLowerCase())
            );

            setUsers(filtered);
            setCurrentPage(1);
        }
    }

    return (
        <div className="container my-4 mb-5 position-relative" style={{minHeight: "130vh"}}>
            <h2 className="mt-5 mx-4">Gestion des utilisateurs</h2>

            <h5>Recherche</h5>
            <input type={"text"} onChange={(e)=>filtreRecherche(e.target.value)}/>


            {isFetching ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status"></div>
                </div>
            ) : error ? (
                <div className="alert alert-danger">{error}</div>
            ) : (
                <>
                    {currentUsers.map(user => (
                        <div key={user.mail} className="row border border-dark p-3 m-4 bg-light rounded">
                            <div className="col-12">
                                <h5 className="mb-3 fs-4">{user.prenom} {user.nom}</h5>
                                <h6 className="mb-3">{user.mail}</h6>
                            </div>
                            <div className="col-12 d-flex justify-content-end">

                                <button
                                    className="btn btn-dark mx-2"
                                    onClick={() => handleViewAccount(user.mail)}
                                >
                                    Voir le compte
                                </button>
                                {user.role !== "ADMIN" && (
                                    <button
                                        className={`btn ${user.actif ? "btn-danger" : "btn-success"} mx-2`}
                                        onClick={() => handleToggleAccount(user.mail, user.actif)}
                                    >
                                        {user.actif ? "Désactiver le compte" : "Activer le compte"}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Pagination */}
                    <div className="pagination-container">
                        <nav>
                            <ul className="pagination m-0 justify-content-center ">
                                {Array.from({length: totalPages}, (_, index) => (
                                    <li key={index}
                                        className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                                        <button onClick={() => setCurrentPage(index + 1)} className="page-link">
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </>
            )}
        </div>
    );
}