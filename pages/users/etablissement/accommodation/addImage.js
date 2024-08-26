import AppTopbar from "@/layouts/AppTopbar";
import Head from "next/head";
import style from './../../../../style/pages/users/etablissement/etablissement.module.css';
import { Stepper } from "primereact/stepper";
import { Image } from "primereact/image";
import { StepperPanel } from "primereact/stepperpanel";
import { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { useRouter } from "next/router";
import UrlConfig from "@/util/config";
import { Galleria } from "primereact/galleria";
import WaitSpinner from "@/components/WaitSpinner";
import { Toast } from "primereact/toast";
export default function AddImage() {
    const router = useRouter();
    const [isSpinnerVisible, setIsSpinnerVisible] = useState(false);
    const toast = useRef(null);

    const inputRef = useRef(null);

    const [fileImages, setFileImages] = useState([]);
    const [listImage, setListImage] = useState([]);
    const [images, setImages] = useState(null);
    const responsiveOptions = [
        {
            breakpoint: '991px',
            numVisible: 4
        },
        {
            breakpoint: '767px',
            numVisible: 3
        },
        {
            breakpoint: '575px',
            numVisible: 1
        }
    ];


    useEffect(() => {
        const updatedImages = fileImages.map(file => {
            const imageUrl = URL.createObjectURL(file);
            return {
                itemImageSrc: imageUrl,
                thumbnailImageSrc: imageUrl,
                alt: file.name
            };
        });

        setImages(updatedImages);
    }, [fileImages]);

    const itemTemplate = (item) => {
        // return <Image src={item.itemImageSrc} alt={item.alt} style={{ width: '100%' }} />
        return <Image src={item.itemImageSrc} className={style.selectedItem} alt={item.alt} />
    }

    const thumbnailTemplate = (item) => {
        return <Image src={item.thumbnailImageSrc} alt={item.alt} style={{ width: '10px' }} className={style.listItems} />
    }

    const handleFileUpload = () => {
        const files = Array.from(inputRef.current.files);
        const validFiles = files.filter(file => file.type.startsWith('image/'));

        const newImageUrls = validFiles.map(file => URL.createObjectURL(file));
        setListImage(prevList => [...prevList, ...newImageUrls]);
        setFileImages(prevFiles => [...prevFiles, ...validFiles]);
    };
    const handleClick = () => {
        inputRef.current.click();
    };



    const handleSubmitImages = async () => {

        if (fileImages.length === 0) {
            console.log("No images to upload");
            setIsSpinnerVisible(false);

            return;
        }
        const info = JSON.parse(localStorage.getItem("responsable_info"));
        const formData = new FormData();


        formData.append('hebergement', info.id_etablissement);

        fileImages.forEach((file, index) => {
            formData.append(`image_${index}`, file);
        });

        try {
            const response = await fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/add-hebergement-image/`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Images uploaded successfully:", data);
                setTimeout(() => {
                    setIsSpinnerVisible(false);

                    router.push("/users/etablissement/we");
                }, 3000);
                setFileImages([]);
            } else {
                toast.current.show({
                    severity: "error",
                    summary: "Error",
                    detail: (
                        <>
                            {response.statusText}
                        </>
                    ),
                    life: 5000
                })
                console.error("Failed to upload images:", response.statusText);
            }
        } catch (error) {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: (
                    <>
                        Error on upload images: {response.statusText}
                    </>
                ),
                life: 5000
            });
            console.error("Error uploading images:", error);
        }
    };
    const addImageFini = async () => {
        setIsSpinnerVisible(true);
        handleSubmitImages();
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


                <div className={style.card}>

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
                    <Galleria value={images} className={style.imageContainerPrime} responsiveOptions={responsiveOptions} numVisible={5} style={{}}
                        item={itemTemplate} thumbnail={thumbnailTemplate} />

                    <Button
                        onClick={() => {
                            setListImage([]);
                            setFileImages([]);
                            setImages([]);
                        }}
                        className="button-secondary"
                        label="Reset"
                    />

                </div>




                <Button onClick={addImageFini} className="button-primary" label="Continue" />
                <WaitSpinner visible={isSpinnerVisible} />

            </div>
            <Toast ref={toast} />
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