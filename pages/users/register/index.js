import GoogleButton from '@/components/button/GoogleButton';
import style from '@/style/pages/login.module.css'
import UrlConfig from '@/util/config';
import { getCsrfTokenDirect } from '@/util/csrf';
import { emailValid } from '@/util/verify';
import Cookies from 'js-cookie';
import Head from 'next/head'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Image } from 'primereact/image';
import { Toast } from 'primereact/toast';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
export default function Register() {

    const {t}=useTranslation();

    const router= useRouter();
    const toast = useRef(null);


    const [email,setEmail]=useState("");
    const emailInput = useRef(null);

    const [emailErreur,setEmailErreur]=useState(null);

    const register=async (e)=>{
        e.preventDefault();
        let canSendData=true;
        if (email.trim()=="" || !emailValid(email)) {
            emailInput.current.className=style.form_input_erreur;
            setEmailErreur("Email required");
            canSendData=false;
        }
        if (canSendData) {
            sessionStorage.setItem("email_in_signup",email);
            router.push("/users/register/verify-email");
        }

    }


    return(
        <>
            <div className={style.container}>

                <div className={style.login_left}>
                    <Link href={"/users"}>
                        <Image src='/images/logo-aftrip.png' alt='logo' style={{width:"250px"}}/>
                    </Link>
                </div>
                <div className={style.login_right}>
                    <div className={style.login_title_container}>
                        <span className={style.login_title}>{t("sign_up")}</span>
                        <span className={style.login_title_label}>{t("welcome_sign_up")}</span>
                    </div>
                    <GoogleButton/>

                    <div className={style.separateur_container}>
                        <div className={style.separateur}></div>
                        <span>{t("or")}</span>
                        <div className={style.separateur}></div>
                    </div>

                    <div className={style.content}>
                        <form onSubmit={register} className={style.form}>
                            <div className={style.form_group}>
                                <div className={style.form_group_input}>
                                    <span className={style.form_label}>Email</span>
                                    <input 
                                        ref={emailInput}
                                        type="email" 
                                        autoFocus={true} 
                                        className={style.form_input} 
                                        placeholder={t("enter_your_email")}
                                        value={email}
                                        onChange={(e)=>{
                                            emailInput.current.className=style.form_input;
                                            setEmail(e.target.value)
                                            setEmailErreur(null);
                                        }}
                                    />
                                    <Image style={emailErreur!=null ? {display:"block"}:{display:"none"}} className={style.form_erreur_image} src="/images/auth/alert_circle.svg" alt="!"/>
                                </div>
                                <span style={emailErreur!=null ? {display:"block"}:{display:"none"}} className={style.form_erreur}>{emailErreur}</span>
                            </div>

                            <div className={style.button_group}>
                                <button type='submit' className={style.login_button}>{t("sign_up")}</button>
                            </div>
                        </form>
                        <div className={style.register_component}>
                            <span className={style.register_label}>{t("you_already_have")}, </span>
                            <Link className={style.register_link} href={"/users/login"}>{t("sign_in")}</Link>
                        </div>
                    </div>
                </div>




                <div className={style.footer}>
                    <span>Copyright 2024 - All rights reserved</span>
                    <Link style={{color:"#000"}} href={"/users/privatePolicy"}>{t("private_policy")}</Link>
                </div>

            </div>
            <Toast ref={toast}/>
        </>
    )
}


Register.getLayout = function getLayout(page) {
    return(
        <>
            <Head>
                <title>Register</title>
            </Head>
            {page}
        </>
    );
}