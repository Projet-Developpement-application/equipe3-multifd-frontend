import React from "react";

export default function FooterSection() {
    return (
        <footer className="container-fluid bg-dark text-white py-4 mt-5">
            <div className="row justify-content-between align-items-center px-5">
                <div className="col-md-6 mb-3 mb-md-0">
                    <p className="mb-3">
                        Projet de fin de programme du <strong>DEC en Techniques de l'informatique</strong> du Cégep de Limoilou, session d'hiver 2025.
                    </p>
                </div>
                <div className="col-md-6 text-md-end">
                    <p className="mb-0">
                        <a href="https://github.com/nom-du-repo" className="text-white text-decoration-none hover-underline-animation mb-3 ">
                            Voir le projet sur GitHub
                        </a>
                    </p>
                    <p className="mb-1">
                        Réalisé par :&nbsp;
                        <a href="https://github.com/jajanel" className="text-white text-decoration-none hover-underline-animation">Janelle Bédard</a>,&nbsp;
                        <a href="https://github.com/Sara-Maud" className="text-white text-decoration-none hover-underline-animation">Sara-Maud Lupien</a>&nbsp;
                        et&nbsp;
                        <a href="https://github.com/lateigne9" className="text-white text-decoration-none hover-underline-animation">Fabien Terres</a>
                    </p>

                </div>
            </div>
        </footer>
    );
}
