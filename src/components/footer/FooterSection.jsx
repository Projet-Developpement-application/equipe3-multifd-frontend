import React from "react";

export default function FooterSection() {
    return (
        <footer className="container-fluid bg-gris-fonce text-white py-4 mt-5">
            <div className="row justify-content-between align-items-center px-5">
                <div className="col-md-6 mb-3 mb-md-0">
                    <p className="mb-3">
                        Projet d'application web réalisé dans le cadre du cours de développement d'applications lors de la 6ème et dernière session du programme Techniques de l'informatique au Cégep de Limoilou.
                        <i className="bi bi-emoji-sunglasses ps-1"></i>
                    </p>
                    <p className="mb-1">
                        Réalisé par :&nbsp;
                        <a href="https://github.com/jajanel" className=" text-decoration-none hover-underline-animation texte-bleu-pale">Janelle Bédard</a>,&nbsp;
                        <a href="https://github.com/Sara-Maud" className=" text-decoration-none hover-underline-animation texte-bleu-pale">Sara-Maud Lupien</a>&nbsp;
                        et&nbsp;
                        <a href="https://github.com/lateigne9" className=" text-decoration-none hover-underline-animation texte-bleu-pale">Fabien Terres</a>
                    </p>
                </div>
                <div className="col-md-6 text-md-end">
                    <p className="mb-0 mt-4">
                        <a href="https://github.com/Projet-Developpement-application/equipe3-multifd-frontend" className="text-white text-decoration-none hover-underline-animation mb-3 ">
                             Voir le projet sur GitHub <i className="bi bi-github"> </i>
                        </a>
                    </p>
                    <p>Juin 2025
                    </p>


                </div>
            </div>
        </footer>
    );
}
