import AppTopbar from "@/layouts/AppTopbar";
import Head from "next/head";
import style from './../../../../style/pages/users/etablissement/etablissement.module.css';
import { Stepper } from "primereact/stepper";
import { Image } from "primereact/image";
import { StepperPanel } from "primereact/stepperpanel";
import { useRef, useState } from "react";
import { Button } from "primereact/button";
import { useRouter } from "next/router";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
export default function AddInfoConnexion() {

    
    const router= useRouter();


    const addInfoUserFini = () => {
        router.push("/users/etablissement/handcraft/addInfoConnexion")
    }

    return(
        <div className={style.container}>
            
                <div className={style.left_container}>
                    <Image alt="logo" src="/images/logo-aftrip.png"/>
                    <Stepper activeStep={3}  linear className={style.stepper}>
                        <StepperPanel></StepperPanel>
                        <StepperPanel></StepperPanel>
                        <StepperPanel></StepperPanel>
                        <StepperPanel></StepperPanel>
                    </Stepper>
                </div>
                <div className={style.right_container}>
                    <div className={style.top_container}>
                        <span className={style.top_title}>Create your etablissement account</span>
                        <span className={style.top_subtitle}>Please enter your information about your accommodation manager on the plateform</span>
                    </div>
                    <div className={style.addInfoConnexion_parent}>
                        <FloatLabel>
                            <InputText
                                className={style.input}
                                id="input_name"
                            />
                            <label style={{display:"flex",alignItems:"center",gap:"8px"}} htmlFor="input_name">
                                <i className="pi pi-user"/>
                                Email   
                            </label>
                        </FloatLabel>
                        <FloatLabel>
                            <InputText
                                className={style.input}
                                id="input_name"
                            />
                            <label style={{display:"flex",alignItems:"center",gap:"8px"}} htmlFor="input_name">
                                <i className="pi pi-user"/>
                                Password
                            </label>
                        </FloatLabel>
                    </div>
                    <Button onClick={addInfoUserFini}  className="button-primary" label="Continue"/>


                </div>
        </div>
    )
}

AddInfoConnexion.getLayout = function getLayout(page) {
    return(
        <>
            <Head>
                <title>Add Info user</title>
            </Head>
            <AppTopbar/>
            {page}
        </>
    )
}