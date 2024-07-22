import style from '@/style/pages/login.module.css'
import Head from 'next/head'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Image } from 'primereact/image';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import { useRef, useState } from 'react';
import stylePassword from '@/style/components/PasswordInput.module.css';
import { Divider } from 'primereact/divider';
import { useTranslation } from 'react-i18next';
export default function NewPassword() {

    const {t} = useTranslation();

    const router= useRouter();
    const toast = useRef(null);


    const [password,setPassword]=useState("");
    const passwordInput = useRef(null);
    const [passwordErreur,setPasswordErreur]=useState(null);

    const [confPassword,setConfPassword]=useState("");
    const [confPasswordErreur,setConfPasswordErreur]=useState(null);
    const confPasswordInput=useRef(null);

    //
    const [checkLenght,setCheckLenght]=useState(false);
    const [checkUppercase,setCheckUppercase]=useState(false);
    const [checkLowercase,setCheckLowercase]=useState(false);
    const [checkNumber,setCheckNumber]=useState(false);
    const [checkSpecial,setCheckSpecial]=useState(false);

    const checkChacun = (password) =>{
        setCheckLenght(password.length > 8);
        setCheckSpecial(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password));
        setCheckNumber(/\d/.test(password) );
        setCheckUppercase(/[A-Z]/.test(password));
        setCheckLowercase(/[a-z]/.test(password));
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        let canSendData=true;
        if(password.length < 8 || password.trim()==""){
            passwordInput.current.className=style.form_input_erreur;
            setPasswordErreur("Password required");
            canSendData=false;
        }
        if(confPassword != password){
            confPasswordInput.current.className=style.form_input_erreur;
            setConfPasswordErreur("Password does not match");
            canSendData=false;
        }
        if (canSendData) {
            
        }

    }

    const passwordInputHeader =<span className={stylePassword.header_container}>Pick a new password</span>;

    const passwordInputFooter = (
        <>
            <Divider/>
            <div className={stylePassword.check_wrapper}>
                <div className={stylePassword.check}>
                    <Image alt='check' imageClassName={stylePassword.check_logo} src={checkLenght ? "/images/auth/check_logo.svg" : "/images/auth/check_unknow.svg"} />
                    <span className={stylePassword.check_label}>{t("must_8_charactere")}</span>
                </div>
                <div className={stylePassword.check}>
                    <Image alt='check' imageClassName={stylePassword.check_logo} src={checkUppercase ? "/images/auth/check_logo.svg" : "/images/auth/check_unknow.svg"} />
                    <span className={stylePassword.check_label}>{t("must_uppercase")}</span>
                </div>
                <div className={stylePassword.check}>
                    <Image alt='check' imageClassName={stylePassword.check_logo} src={checkLowercase ? "/images/auth/check_logo.svg" : "/images/auth/check_unknow.svg"} />
                    <span className={stylePassword.check_label}>{t("must_lowercase")}</span>
                </div>
                <div className={stylePassword.check}>
                    <Image alt='check' imageClassName={stylePassword.check_logo} src={checkNumber ? "/images/auth/check_logo.svg" : "/images/auth/check_unknow.svg"} />
                    <span className={stylePassword.check_label}>{t("must_number")}</span>
                </div>
                <div className={stylePassword.check}>
                    <Image alt='check' imageClassName={stylePassword.check_logo} src={checkSpecial ? "/images/auth/check_logo.svg" : "/images/auth/check_unknow.svg"} />
                    <span className={stylePassword.check_label}>{t("must_special")}</span>
                </div>
            </div>
        </>
    )

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
                        <span className={style.login_title}>{t("set_password")}</span>
                        <span className={style.login_title_label}>{t("your_new_password_must")}</span>
                    </div>

                    <div className={style.content}>
                        <form onSubmit={handleSubmit} className={style.form}>
                            
                        <div className={style.form_group}>
                                <div className={style.form_group_input}>
                                    <span className={style.form_label}>Password</span>
                                    <Password 
                                        ref={passwordInput}
                                        inputClassName={style.form_input_password} 
                                        className={style.form_input_password_container} 
                                        placeholder="Enter your pasword"
                                        value={password}
                                        toggleMask
                                        header={passwordInputHeader}
                                        footer={passwordInputFooter}
                                        onChange={(e)=>{
                                            passwordInput.current.className=style.form_input;
                                            setPassword(e.target.value)
                                            setPasswordErreur(null);
                                            checkChacun(e.target.value);
                                        }}
                                    />
                                </div>
                                <span style={passwordErreur!=null ? {display:"block"}:{display:"none"}} className={style.form_erreur}>{passwordErreur}</span>
                            </div>

                            <div className={style.form_group}>
                                <div className={style.form_group_input}>
                                    <span className={style.form_label}>{t("confirm_password")}</span>
                                    <input 
                                        ref={confPasswordInput}
                                        type="password"  
                                        className={style.form_input} 
                                        placeholder={t("confirm_your_password")}
                                        value={confPassword}
                                        onChange={(e)=>{
                                            confPasswordInput.current.className=style.form_input;
                                            setConfPassword(e.target.value)
                                            setConfPasswordErreur(null);
                                        }}
                                    />
                                    <Image style={confPasswordErreur!=null ? {display:"block"}:{display:"none"}} className={style.form_erreur_image} src="/images/auth/alert_circle.svg" alt="!"/>
                                </div>
                                <span style={confPasswordErreur!=null ? {display:"block"}:{display:"none"}} className={style.form_erreur}>{confPasswordErreur}</span>
                            </div>

                            <div className={style.button_group}>
                                <button type='submit' className={style.login_button}>{t("confirm")}</button>
                            </div>
                        </form>
                        <div className={style.register_component}>
                            <Link className={style.register_link} href={"/users/login"}>
                            <i  className="pi pi-angle-left"/> {t("back_to_login")}
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


NewPassword.getLayout = function getLayout(page) {
    return(
        <>
            <Head>
                <title>New Password</title>
            </Head>
            {page}
        </>
    );
}