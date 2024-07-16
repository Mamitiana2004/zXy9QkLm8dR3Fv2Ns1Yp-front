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
export default function Forgot() {

    const router= useRouter();
    const toast = useRef(null);


    const [email,setEmail]=useState("");
    const emailInput = useRef(null);

    const [emailErreur,setEmailErreur]=useState(null);

    const forgot=async (e)=>{
        e.preventDefault();
        let canSendData=true;
        if (email.trim()=="" || !emailValid(email)) {
            emailInput.current.className=style.form_input_erreur;
            setEmailErreur("Email required");
            canSendData=false;
        }
        if (canSendData) {
            router.push("/users/forgot/newPassword")
        }

    }


    return(
        <>
            <div className={style.container}>

                <div className={style.login_left}>
                    
                </div>
                <div className={style.login_right}>
                    <div className={style.login_title_container}>
                        <span className={style.login_title}>Forgot password ?</span>
                        <span className={style.login_title_label}>No worries, we’ll send you reset instructions.</span>
                    </div>

                    <div className={style.content}>
                        <form onSubmit={forgot} className={style.form}>
                            <div className={style.form_group}>
                                <div className={style.form_group_input}>
                                    <span className={style.form_label}>Email</span>
                                    <input 
                                        ref={emailInput}
                                        type="email" 
                                        autoFocus={true} 
                                        className={style.form_input} 
                                        placeholder="Enter your email"
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
                                <button type='submit' className={style.login_button}>Confirm</button>
                            </div>
                        </form>
                        <div className={style.register_component}>
                            <Link className={style.register_link} href={"/users/login"}>
                            <i  className="pi pi-angle-left"/> Back to Login
                            </Link>
                        </div>
                    </div>
                </div>




                <div className={style.footer}>
                    <span>Copyright 2024 - All rights reserved</span>
                    <Link style={{color:"#000"}} href={"/users/privatePolicy"}>Pivate policy</Link>
                </div>

            </div>
            <Toast ref={toast}/>
        </>
    )
}


Forgot.getLayout = function getLayout(page) {
    return(
        <>
            <Head>
                <title>Forgot</title>
            </Head>
            {page}
        </>
    );
}