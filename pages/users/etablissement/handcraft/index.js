import AppTopbar from "@/layouts/AppTopbar"
import Head from "next/head"
import style from './../../../../style/pages/users/etablissement/etablissement.module.css';
import { Button } from "primereact/button"
import { Image } from "primereact/image"
import { Stepper } from "primereact/stepper"
import { StepperPanel } from "primereact/stepperpanel"
import { Rating } from "primereact/rating";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Handcraft() {


    const router = useRouter();

    const informationHandcraftFini = () =>{
        router.push("/users/etablissement/handcraft/")
    }

    return(
        <>
            <div className={style.container}>
                <div className={style.left_container}>
                    <Image alt="logo" src="/images/logo-aftrip.png"/>
                    <Stepper activeStep={2}  linear className={style.stepper}>
                        <StepperPanel></StepperPanel>
                        <StepperPanel></StepperPanel>
                        <StepperPanel></StepperPanel>
                        <StepperPanel></StepperPanel>
                    </Stepper>
                </div>

                <div className={style.right_container}>
                    <div className={style.top_container}>
                        <span className={style.top_title}>Create your etablissement account</span>
                        <span className={style.top_subtitle}>Please enter information about your handcraft</span>
                    </div>

                    <div className={style.accommodation_1_parent}>
                        <div className={style.accommodation_1_container}>
                            <div className={style.left_accommodation_1}>
                                <FloatLabel>
                                    <InputText
                                        id="input_name"
                                    />
                                    <label style={{display:"flex",alignItems:"center",gap:"8px"}} htmlFor="input_name">
                                        <i className="pi pi-warehouse"/>
                                        Name
                                    </label>
                                </FloatLabel>
                                <FloatLabel>
                                    <InputText
                                        id="input_address"
                                    />
                                    <label style={{display:"flex",alignItems:"center",gap:"8px"}} htmlFor="input_address">
                                        <i className="pi pi-map-marker"/>
                                        Address
                                    </label>
                                </FloatLabel>
                                <FloatLabel>
                                    <InputText
                                        id="input_phone"
                                    />
                                    <label style={{display:"flex",alignItems:"center",gap:"8px"}} htmlFor="input_phone">
                                        <i className="pi pi-phone"/>
                                        Phone
                                    </label>
                                </FloatLabel>
                                <FloatLabel>
                                    <InputText
                                        id="input_phone"
                                    />
                                    <label style={{display:"flex",alignItems:"center",gap:"8px"}} htmlFor="input_phone">
                                        <i className="pi pi-credit-card"/>
                                        NIF
                                    </label>
                                </FloatLabel>
                            </div>
                            <div className={style.right_accommodation_1}>
                                <FloatLabel>
                                    <Dropdown 
                                        pt={{
                                            trigger: { style: {display:"none"} }
                                        }} style={{width:"100%"}}
                                    />
                                    <label style={{display:"flex",alignItems:"center",gap:"8px"}} htmlFor="input_name">
                                        <i className="pi pi-warehouse"/>
                                        Handcraft type
                                    </label>
                                </FloatLabel>
                                <FloatLabel>
                                    <InputText
                                        id="input_name"
                                    />
                                    <label style={{display:"flex",alignItems:"center",gap:"8px"}} htmlFor="input_name">
                                        <i className="pi pi-map-marker"/>
                                        City
                                    </label>
                                </FloatLabel>
                                <FloatLabel>
                                    <InputText
                                        id="input_name"
                                    />
                                    <label style={{display:"flex",alignItems:"center",gap:"8px"}} htmlFor="input_name">
                                        <i className="pi pi-map-marker"/>
                                        Country
                                    </label>
                                </FloatLabel>
                                <FloatLabel>
                                    <InputText
                                        id="input_name"
                                    />
                                    <label style={{display:"flex",alignItems:"center",gap:"8px"}} htmlFor="input_name">
                                        <i className="pi pi-credit-card"/>
                                        STAT
                                    </label>
                                </FloatLabel>
                            </div>
                        </div>
                        <Button className={style.addSocial} label="Add social link" icon="pi pi-plus"/>
                        <Button onClick={informationHandcraftFini} style={{width:"60%"}} className="button-primary" label="Continue"/>
                    </div>

                </div>
            </div>
        </>
    )
}

Handcraft.getLayout = function getLayout(page) {
    return(
        <>
            <Head>
                <title>Handcraft</title>
            </Head>
            <AppTopbar/>
            {page}
        </>
    )
}