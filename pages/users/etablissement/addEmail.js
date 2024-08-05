import Head from "next/head";
import style from './../../../style/pages/users/etablissement/etablissement.module.css';
import AppTopbar from "@/layouts/AppTopbar";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Image } from "primereact/image";
import { useRef, useState } from "react";
import { Button } from "primereact/button";
import { useRouter } from "next/router";

export default function AddEmail() {
    
    const router = useRouter();
    const [email,setEmail] = useState("");

    

    const registerEmail = (e) =>{
        e.preventDefault();
        localStorage.setItem("email_etablissement",email);
        router.push("/users/etablissement/choixType");
    }
    

    return(
        <>
            <div className={style.container}>
                <div className={style.left_container}>
                    <Image alt="logo" src="/images/logo-aftrip.png"/>
                    <Stepper activeStep={0}  linear className={style.stepper}>
                        <StepperPanel></StepperPanel>
                        <StepperPanel></StepperPanel>
                        <StepperPanel></StepperPanel>
                        <StepperPanel></StepperPanel>
                    </Stepper>
                </div>

                <div className={style.right_container}>
                    <div className={style.top_container}>
                        <span className={style.top_title}>Create your etablissement account</span>
                        <span className={style.top_subtitle}>Please enter your entreprise email to begin first</span>
                    </div>
                    <form onSubmit={registerEmail} className={style.email_formulaire_container}>
                        <div className={style.form_group}>
                            <div className={style.form_group_input}>
                                <span className={style.form_label}>Email address or etablissement</span>
                                <input 
                                    type="email" 
                                    autoFocus={true} 
                                    className={style.form_input} 
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e)=>{
                                        setEmail(e.target.value)
                                    }}
                                    required
                                />
                            </div>
                        </div>
                        <Button style={{width:"60%"}} type="submit" className="button-primary" label="Continue"/>
                    </form>
                </div>



            </div>
        </>
    )
}

AddEmail.getLayout = function getLayout(page) {
    return(
        <>
            <Head>
                <title>Add email</title>
            </Head>
            <AppTopbar/>
            {page}
        </>
    )
}