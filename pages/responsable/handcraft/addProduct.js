import Head from "next/head";

import style from './../../../style/pages/responsable/handcraft/addProduct.module.css';
import { useRef, useState } from "react";
import { Image } from "primereact/image";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import { classNames } from "primereact/utils";
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
                    <span className={style.top_container_title}>Product</span>
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
                    <span className={style.room_detail_title}>Product details</span>
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
                <div className={style.room_detail_container}>
                    <span className={style.room_detail_title}>Product specification</span>
                    <div className={style.room_specification}>
                        <div className={style.add_dimension}>
                            <label htmlFor="addDimmension">Dimension</label>
                            <div className={style.input_container_add_container}>
                                <InputNumber inputClassName={style.input_add_dimension}/>
                                <InputNumber inputClassName={style.input_add_dimension}/>
                            </div>
                        </div>
                        <div className={style.add_dimension}>
                            <label htmlFor="addDimmension">Material</label>
                            <div className={style.input_container_add_container}>
                                <Dropdown className={style.select_container}/>
                            </div>
                        </div>
                        <div className={style.add_dimension}>
                            <label htmlFor="addDimmension">Weight</label>
                            <div className={style.input_container_add_container}>
                                <InputNumber inputClassName={style.select_container}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.room_detail_container}>
                    <span className={style.room_detail_title}>Product SEO</span>
                    <div className={style.room_specification}>
                        <div className={style.add_dimension}>
                            <label htmlFor="addDimmension">Product title</label>
                            <div className={style.input_container_add_container}>
                                <InputText className={style.input_title}/>
                            </div>
                        </div>
                        <div className={style.add_dimension}>
                            <label htmlFor="addDimmension">Metal keywords</label>
                            <div className={style.input_container_add_container}>
                                <InputNumber inputClassName={style.select_container}/>
                            </div>
                        </div>
                        <div className={style.add_keywords}>
                            <Chip pt={{root:{className:style.chip}}} label="Bag" removable/>
                            <Chip pt={{root:{className:style.chip}}} label="Bag" removable/>
                            <Chip pt={{root:{className:style.chip}}} label="Bag" removable/>
                            <Chip pt={{root:{className:style.chip}}} label="Bag" removable/>
                            <Chip pt={{root:{className:style.chip}}} label="Bag" removable/>
                            <Chip pt={{root:{className:style.chip}}} label="Bag" removable/>
                            <Chip pt={{root:{className:style.chip}}} label="Bag" removable/>
                            <Chip pt={{root:{className:style.chip}}} label="Bag" removable/>
                        </div>
                    </div>
                </div>
                <div className={style.room_description_container}>
                    <span className={style.room_description_title}>Product description</span>
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