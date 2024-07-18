import React from "react";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import style from '@/style/components/button/GoogleButton.module.css'
import { Button } from "primereact/button";

const GoogleSignupButton = () => {
    const apikey = process.env.NEXT_PUBLIC_GOOGLE_API_FIREBASE;
    const auth_domain = process.env.NEXT_PUBLIC_GOOGLE_FIREBASE_AUTHDOMAIN ;
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

    const handleSignUp = () => {
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        const auth = getAuth(app);
        auth.languageCode = 'fr';
        provider.setCustomParameters({
            'login_hint': 'user@example.com'
        });

        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);

                if (credential) {
                    const token = credential.accessToken;
                }

                const user = result.user;
                localStorage.setItem("user_register_info", JSON.stringify(user));
                window.location.href = "/users/register/create-password";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData?.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.error("Error Code: ", errorCode);
                console.error("Error Message: ", errorMessage);
                console.error("Email: ", email);
                console.error("Credential: ", credential);
            });
    };

    return (
        <Button className={style.button_container} onclick={handleSignUp}>
            <Image imageClassName={style.image_google} width={25} height={25}  alt="G" src="/images/google.png"/>
            Signup with Google
        </Button>
    );
};

export default GoogleSignupButton;
