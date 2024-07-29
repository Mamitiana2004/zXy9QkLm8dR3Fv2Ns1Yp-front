import Head from "next/head";
import style from './../../../style/pages/users/etablissement/etablissement.module.css';
import AppTopbar from "@/layouts/AppTopbar";
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { useRef, useState } from "react";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { FloatLabel } from "primereact/floatlabel";

import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Rating } from "primereact/rating";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
        
export default function AddEtablissement(props) {

    const {t} = useTranslation();

    const stepperRef = useRef(null);

    const [email,setEmail]=useState();

    const [etape,setEtape] = useState(0);

    const registerEmail = (e) =>{
        e.preventDefault();
        setEtape(1);
        stepperRef.current.nextCallback();
    }

    const enterEmailBeginTemplate = () =>{
        return(
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
        )
    }

    const [choixEtablissement,setChoixEtablissement] = useState(0); 

    const choixEtablissementFini = () =>{
        setEtape(2);
        stepperRef.current.nextCallback();
    }


    const choixEtablissementType = () =>{
        return(
            <div className={style.list_button}>
                <div onClick={()=>setChoixEtablissement(1)} className={choixEtablissement==1 ? style.button_container_active : style.button_container}>
                    <div className={style.image_icon}>
                        <Image imageClassName={style.icon} src="/images/users/accommodation.svg" alt="accommodation"/>
                    </div>
                    <div className={style.button_text}>
                        <span className={style.button_text_title}>{t("accommodation")}</span>
                        <span className={style.button_text_subtitle}>{t("button_home_accommodation")}</span>
                    </div>
                </div>
                <div onClick={()=>setChoixEtablissement(2)} className={choixEtablissement==2 ? style.button_container_active : style.button_container}>
                    <div className={style.image_icon}>
                        <Image imageClassName={style.icon} src="/images/users/handcraft.svg" alt="accommodation"/>
                    </div>
                    <div className={style.button_text}>
                        <span className={style.button_text_title}>{t("handcraft")}</span>
                        <span className={style.button_text_subtitle}>{t("button_home_handcraft")}</span>
                    </div>
                </div>
                <div onClick={()=>setChoixEtablissement(3)} className={choixEtablissement==3 ? style.button_container_active : style.button_container}>
                    <div className={style.image_icon}>
                        <Image imageClassName={style.icon} src="/images/users/tour.svg" alt="accommodation"/>
                    </div>
                    <div className={style.button_text}>
                        <span className={style.button_text_title}>{t("tour")}</span>
                        <span className={style.button_text_subtitle}>{t("button_home_tour")}</span>
                    </div>
                </div>
                <Button onClick={choixEtablissementFini} className="button-primary" label="continue"/>
            </div>
        )
    }


    const [rateValue,setRateValue] = useState(0);


    const informationAccommodationFini = () =>{
        setEtape(3);
    }

    const informationAccommodation = () => {
        return(
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
                                }} style={{width:"100%"}}/>
                            <label style={{display:"flex",alignItems:"center",gap:"8px"}} htmlFor="input_name">
                                <i className="pi pi-warehouse"/>
                                Accommodation type
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
                <div className={style.rate}>
                    <span>Accommodation regular rate</span>
                    <div className={style.rate_input}>
                        <Rating
                            value={rateValue}
                            onChange={(e)=>setRateValue(e.value)}
                            cancel={false}
                            pt={{
                                onIcon:()=>({
                                    style:{
                                        "color":"#FFD700"
                                    }
                                })
                            }}
                        />
                        <span className={style.rate_input_label}>Lorem ipsum dolor sit amet vero ullamcorper odio et sed no dolore sadipscing ipsum et facilisis elitr ut. Et no aliquam lorem ipsum et sit sit sed ad accumsan sadipscing eirmod hendrerit.</span>
                    </div>
                </div>
                <Button className={style.addSocial} label="Add social link" icon="pi pi-plus"/>
                <Button onClick={informationAccommodationFini} style={{width:"60%"}} className="button-primary" label="Continue"/>
            </div>
        )
    }
    
    const informationHandcraft = () => {
        return(
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
                                }} style={{width:"100%"}}/>
                            <label style={{display:"flex",alignItems:"center",gap:"8px"}} htmlFor="input_name">
                                <i className="pi pi-warehouse"/>
                                Accommodation type
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
                <div className={style.rate}>
                    <span>Accommodation regular rate</span>
                    <div className={style.rate_input}>
                        <Rating
                            value={rateValue}
                            onChange={(e)=>setRateValue(e.value)}
                            cancel={false}
                            pt={{
                                onIcon:()=>({
                                    style:{
                                        "color":"#FFD700"
                                    }
                                })
                            }}
                        />
                        <span className={style.rate_input_label}>Lorem ipsum dolor sit amet vero ullamcorper odio et sed no dolore sadipscing ipsum et facilisis elitr ut. Et no aliquam lorem ipsum et sit sit sed ad accumsan sadipscing eirmod hendrerit.</span>
                    </div>
                </div>
                <Button className={style.addSocial} label="Add social link" icon="pi pi-plus"/>
                <Button onClick={informationAccommodationFini} style={{width:"60%"}} className="button-primary" label="Continue"/>
            </div>
        )
    }

    const toastRef = useRef();
    const [files,setFiles]=useState();
    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };


    const onSelect = (e) =>{
        
        setFiles(e.files);
    }

    const onUpload = (e) =>{
        console.log(files);
    }

    const addImage = () =>{
        return(
            <>
                <FileUpload
                    onBeforeUpload={onUpload}
                    url="url admin"
                    emptyTemplate={<p>Add Image</p>}
                    name="demo[]"
                    multiple accept="image/*" 
                    chooseOptions={chooseOptions}
                    uploadOptions={uploadOptions}
                    cancelOptions={cancelOptions}
                    onSelect={onSelect}
                />
                <Toast ref={toastRef}/>
            </>
        )
    }




    const etapeComponent = [
        {subtitle:"Please enter your entreprise email to begin first",component:enterEmailBeginTemplate},
        {subtitle:"Please enter your etablissement type",component:choixEtablissementType},
        {subtitle:"Please enter information about your accommodation",component:informationAccommodation},
        {subtitle:"Please add some images for your accommodation",component:addImage},
    ]

    return(
        <>
            <div className={style.container}>
                <div className={style.left_container}>
                    <Image alt="logo" src="/images/logo-aftrip.png"/>
                    <Stepper ref={stepperRef} linear className={style.stepper}>
                        <StepperPanel></StepperPanel>
                        <StepperPanel></StepperPanel>
                        <StepperPanel></StepperPanel>
                        <StepperPanel></StepperPanel>
                    </Stepper>
                </div>

                <div className={style.right_container}>
                    <div className={style.top_container}>
                        <span className={style.top_title}>Create your etablissement account</span>
                        <span className={style.top_subtitle}>{etapeComponent[etape].subtitle}</span>
                    </div>

                    {etapeComponent[etape].component()}
                </div>



            </div>
        </>
    )
}


AddEtablissement.getLayout = function getLayout(page) {
    return(
        <>
            
            <Head>
                <title>
                    Check your email
                </title>
            </Head>

            <AppTopbar/>
            {page}



        </>
    )
}