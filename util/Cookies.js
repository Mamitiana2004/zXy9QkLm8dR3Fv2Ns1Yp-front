import Cookies from 'js-cookie';
import { UrlConfig } from './config';

/**
 * Enregistre les tokens dans les cookies de manière sécurisée.
 * @param {string} refreshToken - Le token de rafraîchissement.
 * @param {string} accessToken - Le token d'accès.
 */
const setTokensInCookies = (refreshToken, accessToken) => {
    Cookies.set('refreshToken', refreshToken, {
        expires: 1,
        secure: true,
        sameSite: 'Strict'
    });

    Cookies.set('trucdu_genre', accessToken, {
        expires: 5 / 1440,
        secure: true,
        sameSite: 'Strict'
    });
    return true
};

function removeAllAdminAccess() {
    const accessToken = Cookies.get('isthisanotherpaimon');

    if (accessToken) {
        Cookies.remove('isthisanotherpaimon', { secure: true, sameSite: 'strict' });
    }

    const refreshToken = Cookies.get('yesthisisanotherpaimon');

    if (refreshToken) {
        Cookies.remove('yesthisisanotherpaimon', { secure: true, sameSite: 'strict' });
    }

    localStorage.removeItem('adminUser');
}
const getAccessAdmin = async () => {
    const accessToken = Cookies.get('isthisanotherpaimon');

    if (accessToken) {
        return accessToken;
    } else {
        try {
            const access = await getNewAdminAccess();
            return access;
        } catch (error) {
            console.error("amn'azy amn'azy");
            return null;
        }
    }
};
const getNewAdminAccess = () => {
    const refreshToken = Cookies.get('yesthisisanotherpaimon');

    if (!refreshToken) {
        console.error('No refresh token found in cookies');
        return Promise.reject('No refresh token found in cookies');
    }

    return fetch(`${UrlConfig.apiBaseUrl}/api/token/refresh/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refresh: refreshToken })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to refresh access token');
            }
            return response.json();
        })
        .then(data => {
            const { access } = data;

            Cookies.set('isthisanotherpaimon', access, {
                expires: 5 / 1440,
                secure: true,
                sameSite: 'Strict'
            });
            return data.access;
        })
        .catch(error => {
            console.error('Error while refreshing access token:', error);
        });
};


const getNewAccess = () => {
    const refreshToken = Cookies.get('refreshToken');

    if (!refreshToken) {
        console.error('No refresh token found in cookies');
        return Promise.reject('No refresh token found in cookies');
    }

    return fetch(`${UrlConfig.apiBaseUrl}/api/token/refresh/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refresh: refreshToken })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to refresh access token');
            }
            return response.json();
        })
        .then(data => {
            const { access } = data;

            Cookies.set('accessToken', access, {
                expires: 5 / 1440,
                secure: true,
                sameSite: 'Strict'
            });
        })
        .catch(error => {
            console.error('Error while refreshing access token:', error);
        });
};


const getNewResponsabeAccess = () => {
    const refreshToken = Cookies.get('responsable_refresh_token');

    if (!refreshToken) {
        console.error('No refresh token found in cookies');
        return Promise.reject('No refresh token found in cookies');
    }

    return fetch(`${UrlConfig.apiBaseUrl}/api/token/refresh/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refresh: refreshToken })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to refresh access token');
            }
            return response.json();
        })
        .then(data => {
            const { access } = data;
            Cookies.set('responsable_access_token', access, {
                expires: 5 / 1440,
                secure: true,
                sameSite: 'Strict'
            });
            return access;
        })
        .catch(error => {
            console.error('Error while refreshing access token:', error);
            throw error;
        });
};

function getResponsableAccessToken() {
    return new Promise((resolve, reject) => {
        const accessToken = Cookies.get('responsable_access_token');

        if (accessToken) {
            console.log(accessToken);
            resolve(accessToken);
        } else {
            getNewResponsabeAccess()
                .then(() => {
                    const newAccessToken = Cookies.get('responsable_access_token');
                    if (newAccessToken) {
                        resolve(newAccessToken);
                    } else {
                        reject('Failed to retrieve new access token.');
                    }
                })
                .catch(error => reject(error));
        }
    });
}

export { setTokensInCookies, getNewAccess, getResponsableAccessToken, removeAllAdminAccess, getNewResponsabeAccess, getAccessAdmin, getNewAdminAccess };
