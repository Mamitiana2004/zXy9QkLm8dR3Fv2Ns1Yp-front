import AppTopbar from "@/layouts/AppTopbar";
import Head from "next/head";
import style from './../../../../style/pages/users/etablissement/etablissement.module.css';
import { Stepper } from "primereact/stepper";
import { Image } from "primereact/image";
import { StepperPanel } from "primereact/stepperpanel";
import { useRef, useState } from "react";
import { Button } from "primereact/button";
import { useRouter } from "next/router";
export default function AddImage() {

    const inputFileRef = useRef();
    const imageRef = useRef();
    const router= useRouter();

    const [imageFile,setImageFile] = useState();
    const [imageLink,setImageLink] = useState(null);

    const addImage = () =>{
        inputFileRef.current.click();
    }

    const handleFileUpload = () =>{
        const files = inputFileRef.current.files;
        if (files.length > 0 && files[0].type.startsWith('image/')) {
            const fileUrl=URL.createObjectURL(files[0]);
            imageRef.current.src=fileUrl;
            setImageFile(files[0]);
            setImageLink(fileUrl);
        }
    }

    const addImageFini = () => {
        router.push("/users/etablissement/handcraft/addInfoUser")
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
                        <span className={style.top_subtitle}>Please some image to your accommodation</span>
                    </div>
                    <div className={style.image_parent}>
                        <div onClick={addImage} className={style.image_container}>
                            <i className="pi pi-plus"/>
                            <span>Add image</span>
                            <input onChange={handleFileUpload} ref={inputFileRef} type="file" style={{display:"none"}} accept="image/*" />
                            <Image style={{display:imageLink!=null ? "block" : "none"}} src={imageLink!=null ? imageLink : "/images/logo-aftrip.png"} alt="" ref={imageRef} imageClassName={style.image}/>
                        </div>
                    </div>
                    <Button onClick={addImageFini}  className="button-primary" label="Continue"/>


                </div>
        </div>
    )
}

AddImage.getLayout = function getLayout(page) {
    return(
        <>
            <Head>
                <title>Add Image</title>
            </Head>
            <AppTopbar/>
            {page}
        </>
    )
}