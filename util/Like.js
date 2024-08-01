import React, { useRef } from 'react'; // Import React and useRef
import { getNewAccess } from "./Cookies";
import { UrlConfig } from "./config";
import Cookies from "js-cookie";

const LikeProduct = (idProduct) => {
    let access = Cookies.get('accessToken');

    // Fonction pour gérer le "like"
    const handleLikeOperation = (accessToken) => {
        return fetch(`${UrlConfig.apiBaseUrl}/api/artisanat/produit/${idProduct}/like/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error('Error during like operation: ' + (errorData.error || 'Unknown error'));
                });
            }
            return response.json();
        })
        .then(data => {
            // Vérifie le message retourné pour déterminer si le "like" a été ajouté ou retiré

            const liked = data.message.includes('ajouté');

            if (liked) {
            console.log(data.message);

                return true;
                
            }
            else {
            console.log(data.message);

                return false;
            }
            // return liked;
        })
        .catch(error => {
            console.error('Error during like operation:', error);
            return false; // En cas d'erreur, retourner false
        });
    };

    if (!access) {
        return getNewAccess().then(() => {
            access = Cookies.get('accessToken');
            if (!access) {
                console.error('No access token available');
                return false; // Aucun token d'accès disponible
            }
            return handleLikeOperation(access);
        }).catch(error => {
            console.error('Error fetching new access token:', error);
            return false; // En cas d'erreur, retourner false
        });
    } else {
        // Si le token d'accès est déjà disponible
        return handleLikeOperation(access);
    }
};

const checkIfClientLikedProduct = async (produitId) => {
    let access = Cookies.get('accessToken');

    if (!access) {
        await getNewAccess();
        access = Cookies.get('accessToken');
    }

    if (!access) {
        console.error('No access token available');
        return false; // Return false if no token is available
    }

    try {
        const response = await fetch(`${UrlConfig.apiBaseUrl}/api/artisanat/produits/${produitId}/liked/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error('Failed to check if product is liked: ' + (errorData.error || 'Unknown error'));
        }

        const data = await response.json();
        return data.liked; 
    } catch (error) {
        console.error('Error checking like status:', error);
        return false;
    }
};

// Export functions (Toast reference needs to be used in a component)
export { LikeProduct, checkIfClientLikedProduct };
