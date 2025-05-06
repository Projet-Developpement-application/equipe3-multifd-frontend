import React, { useState, useEffect } from 'react';
import { fetchAllUtilisateurs } from '../../scripts/http.js';

const USERS_PER_PAGE = 5;

export default function GestionUtilisateursAdm() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);

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

    const handleDelete = (id) => {
        alert(`Supprimer utilisateur avec ID: ${id}`);
    };

    return (
        <div className="container mt-4">
            <h2 className="my-5">Gestion des utilisateurs</h2>

            {isFetching ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status"></div>
                </div>
            ) : error ? (
                <div className="alert alert-danger">{error}</div>
            ) : (
                <>
                    {currentUsers.map(user => (
                        <div key={user.id} className="row border border-dark  p-3 mb-4">
                            <div className="col-12">
                                <h5 className="mb-3">{user.nom}</h5>
                            </div>
                            <div className="col-12 d-flex justify-content-between">
                                <button className="btn btn-dark">{"Voir le compte"}</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>{"Supprimer"}</button>
                            </div>
                        </div>
                    ))}

                    {/* Pagination */}
                    <nav>
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                                <button className="page-link" onClick={() => setCurrentPage(1)}>&laquo;</button>
                            </li>
                            {[...Array(totalPages)].map((_, index) => (
                                <li
                                    key={index}
                                    className={`page-item ${currentPage === index + 1 && "active"}`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => setCurrentPage(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
                                <button className="page-link" onClick={() => setCurrentPage(totalPages)}>&raquo;</button>
                            </li>
                        </ul>
                    </nav>
                </>
            )}
        </div>
    );
}