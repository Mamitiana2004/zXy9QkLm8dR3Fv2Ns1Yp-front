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
import { useEffect, useRef, useState } from 'react';
import { InputOtp } from 'primereact/inputotp';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
export default function Verify() {
    const {t} = useTranslation();

    const router= useRouter();
    const toast = useRef(null);
    const [timer,setTimer]=useState(0);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isInputDisabled, setIsInputDisabled] = useState(false);


    const [email,setEmail]=useState("");
    const [code,setCode]=useState();

    const inputCode = useRef(null);

    const resend=async (e)=>{
        setIsButtonDisabled(true);
        setTimer(120);
    }

    useEffect(()=>{
        let interval;
        if (isButtonDisabled) {
            interval = setInterval(() => {
              setTimer((prevTimer) => {
                localStorage.setItem("timer",prevTimer);
                if (prevTimer <= 1) {
                    localStorage.removeItem("timer");
                    clearInterval(interval);
                    setIsButtonDisabled(false);
                    return 0;
                }
                return prevTimer - 1;
              });
            }, 1000);
        }
        return () => clearInterval(interval);
    },[isButtonDisabled])

    const tapeCode = (e) =>{
        setCode(e.value);
        if(e.value.length==6){
            setIsInputDisabled(true);
            router.push("/users/register/create-account")
        }
    }

    useEffect(()=>{
        if (typeof window !== "undefined") {
            if(localStorage.getItem("timer")){
                setTimer(localStorage.getItem("timer"));
                setIsButtonDisabled(true);
            }
        }
        setEmail(sessionStorage.getItem("email_in_signup"));
    },[])


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
                        <span className={style.login_title}>{t("check_your_email")}</span>
                        <span className={style.login_title_label}>{t("we_sent_a_verification_PIN")}<br/> <span style={{fontWeight:700}}>{email}</span>.<br/> {t("paste_the_PIN_Code_you")} </span>
                    </div>
                    
                    <div className={style.content}>
                        <div className={style.form}>
                            <div className={style.form_group}>
                                <div className={style.form_group_input}>
                                    <span className={style.form_label}>{t("verification_code")}</span>
                                    <InputOtp disabled={isInputDisabled} value={code} onChange={tapeCode} length={6} integerOnly/>
                                </div>
                            </div>

                            <div className={style.button_group}>
                                <Button onClick={resend} text disabled={isButtonDisabled} icon="pi pi-refresh" label={t("resend_code")} iconPos='right' className={style.resend_button}/>
                                <span className={style.timer}>{timer==0 ? "" : `Please wait ${timer} seconds before resending.`}</span>
                            </div>
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


Verify.getLayout = function getLayout(page) {
    return(
        <>
            <Head>
                <title>Verify your email</title>
            </Head>
            {page}
        </>
    );
}