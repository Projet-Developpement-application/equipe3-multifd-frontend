// const BASE_URL_ENDPOINT = "http://172.20.46.45:8080/backend-projet-prod";
export const BASE_URL_ENDPOINT = "http://localhost:8080";

export async function fetchTexteClient() {
    const response = await fetch(BASE_URL_ENDPOINT + "/user/produits");
    if (!response.ok) {
        throw new Error("Erreur lors du chargement du message client.");
    }
    return await response.text();
}

//Re ajout random

/**
 * Récupère tous les produits du backend
 */
export async function fetchAllProduits() {
    const response = await fetch(BASE_URL_ENDPOINT + "/toutProduits", {
        method: "GET",
        headers: {"Content-type": "application/json"}
    });
    if (!response.ok) {
        throw new Error("Erreur lors du chargement des produits.");
    }
    return await response.json();
}

/**
 * Récupère un produit par son ID
 * @param id identifiant du produit
 */
export async function fetchProduitParId(id) {
    const response = await fetch(BASE_URL_ENDPOINT + "/produit/" + id, {
        method: "GET",
        headers: {"Content-type": "application/json"}
    });
    if (!response.ok) {
        throw new Error("Erreur lors du chargement du produit avec ID: " + id);
    }
    return await response.json();
}


export async function inscription(formData) {
    const donnee = {
        mail: formData.email,
        entreprise: formData.company,
        mdp: formData.password,
        nom: formData.lastName,
        prenom: formData.firstName
    };
    return fetch(BASE_URL_ENDPOINT + '/inscription', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(donnee)
    })
}

export async function connexion(formData, setError) {
    const response = await fetch(BASE_URL_ENDPOINT + '/connexion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (!response.ok) {
        if (response.status === 400) {
            setError({error: "Erreur authentification", message: "le courriel ou le mot de passe ne sont pas bon"});
        }
        return null;
    }

    const data = await response.json();
    sessionStorage.setItem("token", data.bearer);
    sessionStorage.setItem("mail", data.mail);
    sessionStorage.setItem("role", data.role);
    sessionStorage.setItem("isConnected", true);
    sessionStorage.setItem("nom", data.nom);
    sessionStorage.setItem("prenom", data.prenom);
    return data; // Retourne les informations utilisateur
}


export async function fetchAllMarque() {
    const response = await fetch(BASE_URL_ENDPOINT + "/marques", {
        method: "GET",
        headers: {"Content-type": "application/json"}
    });
    if (!response.ok) {
        throw new Error("Erreur lors du chargement des marques.");
    }
    return await response.json();
}


export async function fetchAllUtilisateurs() {
    const response = await fetch(BASE_URL_ENDPOINT + "/admin/utilisateurs", {
        method: "GET",
        headers: {
            "Content-type": "application/json",

        }
    });
    if (!response.ok) {
        throw new Error("Erreur lors du chargement des utilisateurs.");
    }
    return await response.json();
}
