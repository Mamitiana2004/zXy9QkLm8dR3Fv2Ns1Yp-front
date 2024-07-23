import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import Cookies from "js-cookie";
import React, { useEffect, useState, useRef } from 'react';
import { getCsrfTokenDirect } from "@/util/csrf";
import { UrlConfig } from "@/util/config";
import { Toast } from 'primereact/toast';
import style from '@/style/components/button/GoogleButton.module.css';
import { Button } from "primereact/button";

const setCookieWithExpiry = (name, value, days, secure = true, sameSite = 'Strict') => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    Cookies.set(name, value, {
        expires: date,
        secure: secure,
        sameSite: sameSite
    });
};

const verifyUserInfo = (firebaseInfoUser, setIsLoggedIn, toast) => {
    try {
        const csrfToken = getCsrfTokenDirect();
        fetch(`${UrlConfig.apiBaseUrl}/api/accounts/client/loginwithemail/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': csrfToken,
            },
            body: JSON.stringify({ email: firebaseInfoUser.email, emailProviderUid: firebaseInfoUser.providerData[0].uid }),
        })
            .then(response => response.json().then(data => ({ status: response.status, body: data })))
            .then(({ status, body }) => {
                if (status !== 200) {
                    const errorMessage = status === 404
                        ? 'Email incorrect ou n\'existe pas'
                        : 'Erreur de connexion';
                    toast.current.show({ severity: 'error', summary: 'Error', detail: errorMessage, life: 5000 });
                    return;
                }

                setCookieWithExpiry("csrfToken", csrfToken, 5);
                setCookieWithExpiry("access_token", body.access, 5);
                Cookies.set("refresh_token", body.refresh, { expires: 1, secure: true, sameSite: 'Strict' });

                const info = localStorage.getItem("user_register_info");
                if (info) {
                    const parsedInfo = JSON.parse(info);
                    Cookies.set("profile_user", parsedInfo.photoURL, { expires: 1, secure: true, sameSite: 'Strict' });
                    Cookies.set("username", parsedInfo.displayName, { expires: 1, secure: true, sameSite: 'Strict' });
                }

                localStorage.removeItem("user_register_info");

                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Connexion réussie', life: 2000 });
                setIsLoggedIn(true);
                setTimeout(() => {
                    window.location.href = "/";
                }, 1000);
            })
            .catch(error => {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Erreur de connexion', life: 2000 });
                console.error(error);
            });
    } catch (error) {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Erreur de connexion', life: 2000 });
        console.error(error);
    }
};

export default function GoogleLoginButton() {
    const apikey = process.env.NEXT_PUBLIC_GOOGLE_API_FIREBASE;
    const auth_domain = process.env.NEXT_PUBLIC_GOOGLE_FIREBASE_AUTHDOMAIN;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    const toast = useRef(null);
    const firebaseConfig = {
        apiKey: apikey,
        authDomain: auth_domain,
        projectId: "test-ce224",
        storageBucket: "test-ce224.appspot.com",
        messagingSenderId: "758626351874",
        appId: "1:758626351874:web:4e0e954eb74dde33c3a01b",
        measurementId: "G-9B4HNZLJ79"
    };

    const app = initializeApp(firebaseConfig);

    const handleSignIn = () => {
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        const auth = getAuth(app);
        auth.languageCode = 'fr';
        provider.setCustomParameters({ 'login_hint': 'user@example.com' });

        signInWithPopup(auth, provider)
            .then(result => {
                const user = result.user;
                localStorage.setItem("user_register_info", JSON.stringify(user));
                setUserInfo({
                    displayName: user.displayName || '',
                    email: user.email || '',
                    photoURL: user.photoURL || '',
                    providerData: user.providerData
                });
            })
            .catch(error => {
                console.error("Error Code: ", error.code);
                console.error("Error Message: ", error.message);
            });
    };

    useEffect(() => {
        const info = localStorage.getItem("user_register_info");
        if (info) {
            setUserInfo(JSON.parse(info));
        }
    }, []);

    useEffect(() => {
        if (userInfo) {
            verifyUserInfo(userInfo, setIsLoggedIn, toast);
        }
    }, [userInfo]);

    return (
        <>
            <Button className={style.button_container} onClick={handleSignIn}>
                <Image imageClassName={style.image_google} width={25} height={25} alt="G" src="/images/google.png" />
                Log in with Google
            </Button>
            <Toast ref={toast} />
        </>
    );
}
