import AppTopbar from "@/layouts/AppTopbar";
import Head from "next/head";
import style from './../../../../style/pages/users/etablissement/etablissement.module.css';
import { Stepper } from "primereact/stepper";
import { Image } from "primereact/image";
import { StepperPanel } from "primereact/stepperpanel";
import { useRef, useState } from "react";
import { Button } from "primereact/button";
import { useRouter } from "next/router";
import UrlConfig from "@/util/config";
export default function AddImage() {
    const inputFileRef = useRef();
    const router = useRouter();
    const imageRef = useRef();

    const inputRef = useRef(null);

    const [fileImages, setFileImages] = useState([]);
    const [listImage, setListImage] = useState([]);


    const handleClick = () => {
        inputRef.current.click();
    };


    const handleFileUpload = () => {
        const files = Array.from(inputRef.current.files);
        const validFiles = files.filter(file => file.type.startsWith('image/'));

        const newImageUrls = validFiles.map(file => URL.createObjectURL(file));
        setListImage(prevList => [...prevList, ...newImageUrls]);
        setFileImages(prevFiles => [...prevFiles, ...validFiles]);
    };



    const handleSubmitImages = async () => {
        if (fileImages.length === 0) {
            console.log("No images to upload");
            return;
        }
        const info = JSON.parse(localStorage.getItem("responsable_info"));
        const formData = new FormData();


        formData.append('hebergement', info.id_etablissement);

        fileImages.forEach((file, index) => {
            formData.append(`image_${index}`, file);
        });
        console.log(formData);
        try {
            const response = await fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/add-hebergement-image/`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Images uploaded successfully:", data);

                setFileImages([]);
            } else {
                console.error("Failed to upload images:", response.statusText);
            }
        } catch (error) {
            console.error("Error uploading images:", error);
        }
    };
    const addImageFini = async () => {
        await handleSubmitImages().then(
            () => {
                router.push("/users/etablissement/login");
            }
        )
    };

    return (
        <div className={style.container}>
            <div className={style.left_container}>
                <Image alt="logo" src="/images/logo-aftrip.png" width={100} height={50} />
                <Stepper activeStep={3} linear className={style.stepper}>
                    <StepperPanel></StepperPanel>
                    <StepperPanel></StepperPanel>
                    <StepperPanel></StepperPanel>
                    <StepperPanel></StepperPanel>
                </Stepper>
            </div>
            <div className={style.right_container}>
                <div className={style.top_container}>
                    <span className={style.top_title}>Create your etablissement account</span>
                    <span className={style.top_subtitle}>Please add some images to your accommodation</span>
                </div>

                <div onClick={handleClick} className={style.button_image}>
                    <i className="pi pi-plus" />
                    <span>Add image</span>
                    <input
                        ref={inputRef}
                        onChange={handleFileUpload}
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        multiple
                    />
                </div>
                <div className={style.image_container}>
                    {listImage.map((image, index) => (
                        <div key={index} className={style.image_add_container}>
                            <Image
                                className={style.image_added}
                                src={image}
                                alt={`Image ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>


                <Button onClick={addImageFini} className="button-primary" label="Continue" />
            </div>
        </div>
    );
}

AddImage.getLayout = function getLayout(page) {
    return (
        <>
            <Head>
                <title>Add Image</title>
            </Head>
            <AppTopbar />
            {page}
        </>
    )
}