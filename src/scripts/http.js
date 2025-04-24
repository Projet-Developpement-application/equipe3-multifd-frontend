const BASE_URL = "http://localhost:8080";

export async function fetchTexteClient() {
    const response = await fetch(BASE_URL+"/user/produits");
    if (!response.ok) {
        throw new Error("Erreur lors du chargement du message client.");
    }
    return await response.text();
}


/**
 * Récupère tous les produits du backend
 */
export async function fetchAllProduits() {
    const response = await fetch(BASE_URL+"/toutProduits",{
        method:"GET",
        headers:{"Content-type":"application/json"}
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
    const response = await fetch(BASE_URL + "/produit/" + id,{
        method:"GET",
        headers:{"Content-type":"application/json"}
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
    console.log(produit);
    produit.disponible = true;
    let nouveau = {
        nom: produit.nom,
        disponible: true,
        prix: parseInt(produit.prix),
        etat: 'NEUF',
        poids: parseInt(produit.poids),
        marque: {nom: produit.marque},
        voltage: parseInt(produit.voltage),
        amperage: parseInt(produit.amperage),
        hp: parseInt(produit.hp),
        courant: parseInt(produit.courant)
    };
    console.log(nouveau);

    const response = await fetch(BASE_URL+"/admin/ajouteProduit", {
        method: 'POST',
        body: JSON.stringify(nouveau),
        headers: {
            'Content-Type': 'application/json'
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
    const response = await fetch(BASE_URL + "/admin/" + id, {
        method: 'PUT',
        body: JSON.stringify(produit),
        headers: {
            'Content-Type': 'application/json'
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

/**
 * Modifie un produit existant par ID
 * @param id identifiant du produit à modifier
 * @param utilisateur les nouvelles données du produit
 */
export async function modifierUtilisateur(id, utilisateur) {
    const response = await fetch(BASE_URL + "/" + id, {
        method: 'PUT',
        body: JSON.stringify(utilisateur),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error("Erreur lors de la modification du produit ID: " + id);
    }
    return await response.json();
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
            setError({ error: "Erreur authentification", message: "le courriel ou le mot de passe ne sont pas bon" });
        }
        return null;
    }

    const data = await response.json();
    sessionStorage.setItem("token", data.bearer);
    sessionStorage.setItem("mail", data.mail);
    sessionStorage.setItem("role", data.role);
    sessionStorage.setItem("isConnected", true);
    return data; // Retourne les informations utilisateur
}

export function fetchProduitFilter(motCle) {
    return fetch("http://localhost:8080/rechercheProduit?nomFiltre=" + motCle,{
        method:"GET",
        headers:{"Content-type":"application/json"}
    })
        .then((r) => {
            if (r.ok) {
                return r.json();
            } else {
                throw new Error("Erreur réseau");
            }
        });
}

