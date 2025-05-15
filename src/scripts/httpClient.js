import {BASE_URL_ENDPOINT} from "./http.js";

const BASE_URL_CLIENT = BASE_URL_ENDPOINT + "/client";

/**
 * Modifie un produit existant par ID
 * @param id identifiant du produit à modifier
 * @param utilisateur les nouvelles données du produit
 */
export async function modifierUtilisateur(email, utilisateur) {
    const response = await fetch(BASE_URL_CLIENT + "/modifier/" + email, {
        method: 'PUT',
        body: JSON.stringify(utilisateur),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        }
    });
    if (!response.ok) {
        throw new Error("Erreur lors de la modification de l'utilisateur " + email);
    }
    return await response.json();
}

export async function fetchUtilisateur(email) {
    const response = await fetch(BASE_URL_CLIENT + "/info/" + email, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        }
    });
    if (!response.ok) {
        throw new Error("Erreur lors de la récupération de l'utilisateur " + email);
    }
    return await response.json();
}

export async function ajouteProduitPanier(idProduit) {
    if (sessionStorage.getItem("isConnected")) {
        const response = await fetch(BASE_URL_CLIENT + "/ajouterProduitPanier?idProduit=" + idProduit, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
        });
        if (!response.ok) {
            throw new Error("Erreur lors de l'ajout du produit " + idProduit);
        }
        return response.status;
    } else return "non connecté"
}

export async function getPanierEnCours() {
    const response = await fetch(BASE_URL_CLIENT + "/getMonPanierEnCours", {
        method: 'GET',
        headers: {
            'Content-type': 'Application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        }
    })
    if (!response.ok) {
        if (response.status === 401) {
            throw new Error("aucun panier en cours")
        }
    }
    return await response.json();
}

export async function changeQuantity(produitPanier) {
    console.log(produitPanier)

    const response = await fetch(BASE_URL_CLIENT + "/changerQuantite", {
        method: 'PATCH',
        headers: {
            'Content-type': 'Application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        },
        body: JSON.stringify(produitPanier)
    })
}



