const BASE_URL = "http://172.20.46.45:8080/backend-projet-prod";
//const BASE_URL = "http://localhost:8080";

export async function fetchTexteClient() {
    const response = await fetch(BASE_URL + "/user/produits");
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
    const response = await fetch(BASE_URL + "/toutProduits", {
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
    const response = await fetch(BASE_URL + "/produit/" + id, {
        method: "GET",
        headers: {"Content-type": "application/json"}
    });
    if (!response.ok) {
        throw new Error("Erreur lors du chargement du produit avec ID: " + id);
    }
    return await response.json();
}

/**
 * Ajoute un nouveau produit au backend
 * @param produit les données du produit à ajouter
 */
export async function ajouterProduit(produit) {
    let nouveau = {
        nom: produit.nom,
        disponible: produit.disponible,
        prix: parseInt(produit.prix),
        etat: produit.etat,
        poids: parseInt(produit.poids),
        marque: {nom: produit.marque},
        voltage: parseInt(produit.voltage),
        amperage: parseInt(produit.amperage),
        hp: parseInt(produit.hp),
        courant: parseInt(produit.courant)
    };

    const response = await fetch(BASE_URL + "/admin/ajouteProduit", {
        method: 'POST',
        body: JSON.stringify(nouveau),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        }
    });
    if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du produit.");
    }

    return response;
}

/**
 * Modifie un produit existant par ID
 * @param id identifiant du produit à modifier
 * @param produit les nouvelles données du produit
 */
export async function modifierProduit(id, produit) {

    let nouveau = {
        nom: produit.nom,
        disponible: produit.disponible,
        prix: produit.prix,
        etat: produit.etat,
        poids:produit.poids,
        marque: {nom: produit.marque},
        voltage: produit.voltage,
        amperage: produit.amperage,
        hp: produit.hp,
        courant: produit.courant
    };
    console.log(produit);
    //console.log(produitModifer);
    const response = await fetch(BASE_URL + "/admin/modifier/" + id, {
        method: 'PUT',
        body: JSON.stringify(nouveau),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        }
    });
    if (!response.ok) {
        throw new Error("Erreur lors de la modification du produit ID: " + id);
    }
    return await response.json();
}

/**
 * Supprime un produit par ID
 * @param id identifiant du produit à supprimer
 */
export async function supprimerProduit(id) {
    const response = await fetch(BASE_URL + "/" + id, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error("Erreur lors de la suppression du produit ID: " + id);
    }
}

export async function fetchUtilisateur(email) {
    const response = await fetch(BASE_URL + "/client/info/" + email, {
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

/**
 * Modifie un produit existant par ID
 * @param id identifiant du produit à modifier
 * @param utilisateur les nouvelles données du produit
 */
export async function modifierUtilisateur(email, utilisateur) {
    const response = await fetch(BASE_URL + "/client/modifier/" + email, {
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

export async function inscription(formData) {
    const donnee = {
        mail: formData.email,
        entreprise: formData.company,
        mdp: formData.password,
        nom: formData.lastName,
        prenom: formData.firstName
    };
    return fetch(BASE_URL + '/inscription', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(donnee)
    })
}

export async function connexion(formData, setError) {
    const response = await fetch(BASE_URL + '/connexion', {
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
    //todo mettre dans cookie ici ou dans composant connexion
    sessionStorage.setItem("token", data.bearer);
    sessionStorage.setItem("mail", data.mail);
    sessionStorage.setItem("role", data.role);
    sessionStorage.setItem("isConnected", true);
    sessionStorage.setItem("nom", data.nom);
    sessionStorage.setItem("prenom", data.prenom);
    return data; // Retourne les informations utilisateur
}

export function fetchProduitFilter(motCle) {
    return fetch(BASE_URL + "/rechercheProduit?nomFiltre=" + motCle, {
        method: "GET",
        headers: {"Content-type": "application/json"}
    })
        .then((r) => {
            if (r.ok) {
                return r.json();
            } else {
                throw new Error("Erreur réseau");
            }
        });
}

export async function fetchAllMarque() {
    const response = await fetch(BASE_URL + "/marques", {
        method: "GET",
        headers: {"Content-type": "application/json"}
    });
    if (!response.ok) {
        throw new Error("Erreur lors du chargement des marques.");
    }
    return await response.json();
}



export async function fetchAllUtilisateurs() {
    const response = await fetch(BASE_URL + "/admin/utilisateurs", {
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
