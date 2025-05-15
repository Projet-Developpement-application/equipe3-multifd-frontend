import React, { useState, useEffect, useContext } from 'react';
import { fetchAllUtilisateurs } from '../../scripts/httpAdmin.js';
import { useNavigate } from 'react-router-dom';
import { UtilisateurContext } from '../../assets/contexte/UtilisateurContext.jsx';
import {deleteUtilisateurByEmail} from "../../scripts/httpAdmin.js";

const USERS_PER_PAGE = 8;

export default function GestionUtilisateursAdm() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);
    const { utilisateur } = useContext(UtilisateurContext);
    const navigate = useNavigate();

    useEffect(() => {
        setIsFetching(true);
        fetchAllUtilisateurs()
            .then(data => {
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
        navigate(`/utilisateur/${encodeURIComponent(email)}`);
    };


    function handleDeleteAccount(email) {
        const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");
        if (!confirmed) return;

        deleteUtilisateurByEmail(email)
            .then(() => {
                alert("Utilisateur supprimé avec succès !");
                setUsers(prevUsers => prevUsers.filter(user => user.mail !== email));
            })
            .catch(err => {
                console.error("Erreur lors de la suppression de l'utilisateur :", err);
                alert("Erreur lors de la suppression de l'utilisateur.");
            });
    }

    return (
        <div className="container mt-4 position-relative" style={{ minHeight: "100vh" }}>
            <h2 className="mt-5 mx-4">Gestion des utilisateurs</h2>

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
                                <h5 className="mb-3">{user.prenom} {user.nom}</h5>
                                <h6 className="mb-3">{user.mail}</h6>
                            </div>
                            <div className="col-12 d-flex justify-content-end">
                                <button
                                    className="btn btn-dark mx-2"
                                    onClick={() => handleViewAccount(user.mail)}
                                >
                                    Voir le compte
                                </button>
                                {user.mail !== utilisateur.mail && (
                                    <button className="btn btn-danger mx-2"
                                            onClick={() => handleDeleteAccount(user.mail)}
                                    >
                                        Supprimer

                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Pagination */}
                    <div className="pagination-container">
                        <nav>
                            <ul className="pagination justify-content-center">
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
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