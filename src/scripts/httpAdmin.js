import {BASE_URL_ENDPOINT} from "./http.js";

const BASE_URL_ADMIN = BASE_URL_ENDPOINT + "/admin";

function construitForm(produit){
    const formData = new FormData();
    let produitSansImage = {
        nom: produit.nom,
        disponible: produit.disponible,
        prix: parseInt(produit.prix),
        etat: produit.etat,
        poids: parseInt(produit.poids),
        marque: {id:produit.marque.id, nom: produit.marque.nom},
        voltage: parseInt(produit.voltage),
        amperage: parseInt(produit.amperage),
        hp: parseInt(produit.hp),
        courant: parseInt(produit.courant)
    };
    console.log(produitSansImage);
    formData.append("produit", new Blob([JSON.stringify(produitSansImage)], {type: "application/json"}));
    formData.append("image", produit.image);
    return formData;
}

/**
 * Modifie un produit existant par ID
 * @param id identifiant du produit à modifier
 * @param produit les nouvelles données du produit
 */
export async function modifierProduit(id, produit) {
    const data = construitForm(produit);
    console.log(data);
    const response = await fetch(BASE_URL_ADMIN + "/modifier/" + id, {
        method: 'POST',
        body: data,
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        }
    });
    if (!response.ok) {
        throw new Error("Erreur lors de la modification du produit ID: " + id);
    }
    return await response.json();
}

export async function ajouterProduit(produit) {
    const data = construitForm(produit);
    const response = await fetch(BASE_URL_ADMIN + "/ajouteProduit", {
        method: 'POST',
        body: data,
        headers: {'Authorization': 'Bearer ' + sessionStorage.getItem("token")}
    });
    if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du produit.");
    }
    return response;
}

/**
 * Supprime un produit par ID
 * @param id identifiant du produit à supprimer
 */
export async function supprimerProduit(id) {
    const response = await fetch(BASE_URL_ADMIN + "/supprimerProduit/" + id, {
        method: 'DELETE',
        headers: {'Authorization': 'Bearer ' + sessionStorage.getItem("token")}
    });
    if (!response.ok) {
        throw new Error("Erreur lors de la suppression du produit ID: " + id);
    }
}


export async function deleteUtilisateurByEmail(email) {
    const response = await fetch(BASE_URL_ADMIN + "/supprimer/" + email, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + sessionStorage.getItem("token")
        }
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'utilisateur : " + email);
    }
}

export async function fetchAllUtilisateurs() {
    const response = await fetch(BASE_URL_ADMIN + "/utilisateurs", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + sessionStorage.getItem("token")


        }
    });
    if (!response.ok) {
        throw new Error("Erreur lors du chargement des utilisateurs.");
    }
    return await response.json();
}

export async function fetchUtilisateur(email) {
    const response = await fetch(BASE_URL_ADMIN + "/utilisateur/" + email, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + sessionStorage.getItem("token")
        }
    });
    if (!response.ok) {
        throw new Error("Erreur lors de la récupération de l'utilisateur " + email);
    }
    return await response.json();
}


export async function modifierUtilisateur(email, utilisateur) {
    const response = await fetch(BASE_URL_ADMIN + "/modifier/" + email, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + sessionStorage.getItem("token")
        },
        body: JSON.stringify(utilisateur)
    });
    if (!response.ok) {
        throw new Error("Erreur lors de la modification de l'utilisateur " + email);
    }
}

export async function activerUtilisateurByEmail(email) {
    const response = await fetch(BASE_URL_ADMIN + "/activer/" + email, {
        method: "PUT",
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token")
        }
    });
    if (!response.ok) {
        throw new Error("Erreur lors de l'activation de l'utilisateur : " + email);
    }


}
