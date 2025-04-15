import React, { useEffect, useState } from "react";
import { fetchTexteClient } from "../../scripts/http.js";

const CatalogueTest = () => {
    const [texte, setTexte] = useState("");

    useEffect(() => {
        fetchTexteClient()
            .then(data => setTexte(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <h2>{texte}</h2>
        </div>
    );
};

export default CatalogueTest;
