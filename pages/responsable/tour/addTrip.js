import Head from "next/head";

import style from './../../../style/pages/responsable/tour/addTrip.module.css';
import { useRef, useState } from "react";
import { Image } from "primereact/image";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import { classNames } from "primereact/utils";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
export default function AddTrip() {

    const [imageFile,setImageFile]=useState();
    const inputRef = useRef(null);

    const [visibleInclude,setVisibleInclude] = useState(false);
    const [visibleNotInclude,setVisibleNotInclude] = useState(false);

    const [listImage,setListImage] = useState([]);

    const handleClick=()=>{
        inputRef.current.click();
    }

    const handleFileUpload = () =>{
        const files = inputRef.current.files;
        if (files.length > 0 && files[0].type.startsWith('image/')) {
            const fileUrl=URL.createObjectURL(files[0]);
            const listImageCopy = [...listImage];
            listImageCopy.push(fileUrl);
            setListImage(listImageCopy);
        }
    }

    const addButtonIncluded = () =>{
        return <Button className={"button-primary"} label="Add included"/>
    }

    const addButtonNotIncluded = () =>{
        return <Button className={"button-primary"} label="Add not included"/>
    }

    return(
        <>
            <Head>
                <title>Add new Trip</title>
            </Head>

            <div className={style.top_container}>
                <div className={style.top_container_title_container}>
                    <span className={style.top_container_title}>Trip</span>
                    <span className={style.top_container_subtitle}>Carlton Hotel</span>
                </div>
            </div>

            <div className={style.container}>
                <div  className={style.image_container}>
                    <div onClick={handleClick}  className={style.button_image}>
                        <i className="pi pi-plus"/>
                        <span>Add image</span>
                        <input value={imageFile} ref={inputRef} onChange={handleFileUpload} type="file" accept="image/*" style={{display:"none"}}/>
                    </div>
                    {listImage.map((image,index)=>{
                        return(
                            <div key={index} className={style.image_add_container}>
                                <Image imageClassName={style.image} src={image} alt="image"/>
                            </div>
                        )
                    })}
                </div>
                <div className={style.room_detail_container}>
                    <span className={style.room_detail_title}>Trip information</span>
                    <div className={style.room_detail}>
                        <div className={style.left_detail}>
                            <FloatLabel>
                                <InputText className={style.input_text} id="name_input" type="text"/>
                                <label htmlFor="name_input">Name</label>
                            </FloatLabel>
                            <FloatLabel>
                                <InputText className={style.input_text} id="name_input" type="text"/>
                                <label htmlFor="name_input">Departure</label>
                            </FloatLabel>
                            <FloatLabel>
                                <InputText className={style.input_text} id="name_input" type="text"/>
                                <label htmlFor="name_input">Price per Person</label>
                            </FloatLabel>
                        </div>
                        <div className={style.right_detail}>
                            <FloatLabel>
                                <Calendar selectionMode="range" className={style.input_text} id="name_input" type="text"/>
                                <label htmlFor="name_input">Check in - Check out</label>
                            </FloatLabel>
                            <FloatLabel>
                                <InputText className={style.input_text} id="name_input" type="text"/>
                                <label htmlFor="name_input">Destination</label>
                            </FloatLabel>
                            <FloatLabel>
                                <InputText className={style.input_text} id="name_input" type="text"/>
                                <label htmlFor="name_input">Total place</label>
                            </FloatLabel>
                        </div>
                    </div>
                </div>
                <div className="separateur"></div>
                <div className={style.room_detail_container}>
                    <span className={style.room_detail_title}>Travel inclusion</span>
                    <div className={style.travel_inclusion_container}>
                        <div className={style.travel_inclusion}>
                            <i className={"pi pi-check"}/>
                            <span>Add slmdkqsmdl</span>
                            <span>Add slmdkqsmdl</span>
                            <span>Add slmdkqsmdl</span>
                            <span>Add slmdkqsmdl</span>
                            <span>Add slmdkqsmdl</span>
                            <Button onClick={()=>setVisibleInclude(true)} className={style.travel_inclusion_button} label="+ Add included"/>
                        </div>
                        <div className={style.travel_inclusion}>
                            <i className={"pi pi-times"}/>
                            <span>sqdkqmldkqmsldkqsmdqklm</span>
                            <span>sqdkqmldkqmsldkqsmdqklm</span>
                            <span>sqdkqmldkqmsldkqsmdqklm</span>
                            <span>sqdkqmldkqmsldkqsmdqklm</span>
                            <span>sqdkqmldkqmsldkqsmdqklm</span>
                            <span>sqdkqmldkqmsldkqsmdqklm</span>
                            <Button onClick={()=>setVisibleNotInclude(true)} className={style.travel_inclusion_button} label="+ Add not included"/>
                        </div>
                    </div>
                </div>
                <div className={style.room_description_container}>
                    <span className={style.room_description_title}>Trip description</span>
                    <textarea  className={style.room_description_textarea}/>
                </div>
                <div className={style.button_list}>
                    <Button className="button-secondary" raised label="Cancel"/>
                    <Button className="button-primary" label="+ Add room"/>
                </div>
            </div>

            <Dialog draggable={false} visible={visibleInclude} onHide={()=>setVisibleInclude(false)} footer={addButtonIncluded} header="Add included">
                <InputText/>
            </Dialog>

            <Dialog draggable={false} visible={visibleNotInclude} onHide={()=>setVisibleNotInclude(false)} footer={addButtonNotIncluded} header="Add not included">
                <InputText/>
            </Dialog>
        </>
    )
}