import {Link} from "react-router-dom";
import React from "react";

export default function ConfirmationDevis(){

    return(
        <>
            <div className="container ">
                <h1 className="text-center m-5">Votre devis a bien été confirmé.</h1>
                <h3 className="text-center">Nous vous contacterons dans les plus brefs délais.</h3>
                <div className="text-center my-5">
                    <Link to={"/"} className="text-decoration-none">
                        <button className="btn btn-outline-dark ms-2">
                            Retour à la boutique
                        </button>
                    </Link>
                </div>
            </div>

        </>
    )
}