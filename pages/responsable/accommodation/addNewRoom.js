import Head from "next/head";

import style from './../../../style/pages/responsable/accommodation/addNewRoom.module.css'
import { useRef, useState } from "react";
import { Image } from "primereact/image";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
export default function AddNewRoom() {

    const [imageFile,setImageFile]=useState();
    const inputRef = useRef(null);

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

    return(
        <>
            <Head>
                <title>Add new Room</title>
            </Head>

            <div className={style.top_container}>
                <div className={style.top_container_title_container}>
                    <span className={style.top_container_title}>Room</span>
                    <span className={style.top_container_subtitle}>Brajas Hotel</span>
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
                    <span className={style.room_detail_title}>Room details</span>
                    <div className={style.room_detail}>
                        <FloatLabel>
                            <InputText className={style.input_text} id="name_input" type="text"/>
                            <label htmlFor="name_input">Name</label>
                        </FloatLabel>
                        <FloatLabel>
                            <Dropdown
                                id="type_select"
                                className={style.dropdown}
                            />
                            <label htmlFor="type_select">Type</label>
                        </FloatLabel>
                        <FloatLabel>
                            <InputText className={style.input_text} id="capacity_input" type="text"/>
                            <label htmlFor="capacity_input">Capacity</label>
                        </FloatLabel>
                        <FloatLabel>
                            <InputNumber className={style.input_text} id="price_input" type="text"/>
                            <label htmlFor="price_input">Price per night</label>
                        </FloatLabel>
                        <FloatLabel>
                            <Dropdown
                                id="status_select"
                                className={style.dropdown}
                            />
                            <label htmlFor="status_select">Add status</label>
                        </FloatLabel>
                    </div>
                </div>
                <div className={style.room_ammenties_container}>
                    <span className={style.room_ammenties_title}>Room ammenties</span>
                    <div className={style.room_ammenties}>
                        <div className={style.room_ammenties_check_container}>
                            <input type="checkbox"/>
                            <span>Wi-fi</span>
                        </div>
                        <div className={style.room_ammenties_check_container}>
                            <input type="checkbox"/>
                            <span>Wi-fi</span>
                        </div>
                        <div className={style.room_ammenties_check_container}>
                            <input type="checkbox"/>
                            <span>Wi-fi</span>
                        </div>
                        <div className={style.room_ammenties_check_container}>
                            <input type="checkbox"/>
                            <span>Wi-fi</span>
                        </div>
                        <div className={style.room_ammenties_check_container}>
                            <input type="checkbox"/>
                            <span>Wi-fi</span>
                        </div>
                        <div className={style.room_ammenties_check_container}>
                            <input type="checkbox"/>
                            <span>Wi-fi</span>
                        </div>
                        <div className={style.room_ammenties_check_container}>
                            <input type="checkbox"/>
                            <span>Wi-fi</span>
                        </div>
                        <div className={style.room_ammenties_check_container}>
                            <input type="checkbox"/>
                            <span>Wi-fi</span>
                        </div>
                        <div className={style.room_ammenties_check_container}>
                            <input type="checkbox"/>
                            <span>Wi-fi</span>
                        </div>
                        <div className={style.room_ammenties_check_container}>
                            <input type="checkbox"/>
                            <span>Wi-fi</span>
                        </div>
                    </div>
                </div>
                <div className={style.room_description_container}>
                    <span className={style.room_description_title}>Room description</span>
                    <textarea  className={style.room_description_textarea}/>
                </div>
                <div className={style.button_list}>
                    <Button className="button-secondary" raised label="Cancel"/>
                    <Button className="button-primary" label="+ Add room"/>
                </div>
            </div>
        </>
    )
}