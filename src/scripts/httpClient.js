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
        if (response.status === 404) {
            throw new Error("aucun panier en cours")
        }
    }
    return await response.json();
}

export async function changeQuantity(produitPanier) {
    await fetch(BASE_URL_CLIENT + "/changerQuantite", {
        method: 'PATCH',
        headers: {
            'Content-type': 'Application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        },
        body: JSON.stringify(produitPanier)
    })
}

export async function supprimerProduitFromPanier(idProduitPanier) {
    await fetch(BASE_URL_CLIENT + "/supprimerProduitPanier/" + idProduitPanier, {
        method: 'DELETE',
        headers: {
            'Content-type': 'Application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        }
    })
}

/**
 * Envoie à l'API le message de specification de la commande
 * @param message message à envoyer
 * */
export async function ajouteSpecificationPanier(message) {
    await fetch(BASE_URL_CLIENT + "/ajouterSpecificationPanier", {
        method: 'PATCH',
        headers: {
            'Content-type': 'Application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        },
        body: JSON.stringify(message)
    })
}

export async function getHistorique() {
    const response = await fetch(BASE_URL_CLIENT + "/historiquePanier", {
        method: 'GET',
        headers: {
            'Content-type': 'Application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        }
    });
    if (!response.ok) {
        throw new Error("Erreur lors du chargement des commandes")
    }
    return await response.json();
}
export async function finirCommmande(panier,contact) {
    const demande= {panier,contact}
    const response = await fetch(BASE_URL_CLIENT + "/terminerPanier", {
        method: 'POST',
        headers: {
            'Content-type': 'Application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        },
        body:JSON.stringify(demande)
    });
    if (!response.ok) {
        throw new Error("Erreur lors du chargement des commandes")
    }
    if (response.ok){
        return response;
    }

}