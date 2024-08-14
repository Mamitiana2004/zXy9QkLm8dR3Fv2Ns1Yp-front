import Head from "next/head";
import style from './../../../style/pages/responsable/handcraft/addProduct.module.css';
import { useRef, useState, useContext, useEffect } from "react";
import { Image } from "primereact/image";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import ResponsableLayoutContext from "@/layouts/context/responsableLayoutContext";
import UrlConfig from "@/util/config";

export default function AddNewRoom() {
    const { user } = useContext(ResponsableLayoutContext);
    const inputRef = useRef(null);
    const [listImage, setListImage] = useState([]);

    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [productWeight, setProductWeight] = useState(null);
    const [productWidth, setProductWidth] = useState(null);
    const [productHeight, setProductHeight] = useState(null);
    const [productQuantity, setProductQuantity] = useState(null);
    const [productCategorie, setProductCategorie] = useState([]);
    
    const [statusOptions] = useState([
        { label: 'Available', value: true },
        { label: 'Unavailable', value: false },
    ]);

    useEffect(() => {
        if (user) {
            const id_artisanat = user.id_etablissement;
            FetchList_Orders(id_artisanat);
        }
    }, [user]);

    function FetchList_Orders(id_artisanat) {
        fetch(`${UrlConfig.apiBaseUrl}/api/artisanat/specifications/`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            const formattedData = data.map(item => ({
                id: item.id || 'N/A',
                name: item.type_specification || 'N/A',
            }));
            setProductCategorie(formattedData);
        })
        .catch(err => console.error('Erreur lors de la récupération des Listes des Categorie:', err));
    }

    const handleSubmit = () => {
    const id_artisanat = user.id_etablissement;

    const payload = {
        nom_produit_artisanal: productName,
        description_artisanat: productDescription,
        prix_artisanat: productPrice ? productPrice.toFixed(2) : "0.00", // Format price as a string
        disponible_artisanat: selectedStatus,
        poid_kg: productWeight !== null ? productWeight : null,
        largeur: productWidth !== null ? productWidth : null,
        hauteur: productHeight !== null ? productHeight : null,
        nb_produit_dispo: productQuantity !== null ? productQuantity : 0,
        artisanat: id_artisanat,
        specifications: selectedCategory ? [selectedCategory.id] : [], // Array of selected specification IDs
    };

    fetch(`${UrlConfig.apiBaseUrl}/api/artisanat/${id_artisanat}/produits/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Product added:', data);
        // Handle success, e.g., show a notification or redirect
    })
    .catch(err => console.error('Erreur lors de l ajoute des Products', err));
};


    return (
        <>
            <Head>
                <title>Add new Room</title>
            </Head>
            <div className={style.container}>
                {/* Image Upload Section (No changes) */}
                <div className={style.image_container}>
                    <div onClick={() => inputRef.current.click()} className={style.button_image}>
                        <i className="pi pi-plus" />
                        <span>Add image</span>
                        <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }} />
                    </div>
                    {listImage.map((image, index) => (
                        <div key={index} className={style.image_add_container}>
                            <Image imageClassName={style.image} src={image} alt="image" />
                        </div>
                    ))}
                </div>

                {/* Product Details Section */}
                <div className={style.room_detail_container}>
                    <span className={style.room_detail_title}>Product details</span>
                    <div className={style.room_detail}>
                        <FloatLabel>
                            <InputText className={style.input_text} id="name_input" type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
                            <label htmlFor="name_input">Name</label>
                        </FloatLabel>
                        <FloatLabel>
                            <InputText className={style.input_text} id="capacity_input" type="text" value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} />
                            <label htmlFor="capacity_input">Number Product available</label>
                        </FloatLabel>
                        <FloatLabel>
                            <InputNumber className={style.input_text} id="price_input" value={productPrice} onChange={(e) => setProductPrice(e.value)} />
                            <label htmlFor="price_input">Price per unit</label>
                        </FloatLabel>
                        <FloatLabel>
                            <Dropdown
                                id="status_select"
                                value={selectedStatus}
                                options={statusOptions}
                                onChange={(e) => setSelectedStatus(e.value)}
                                optionLabel="label"
                                placeholder="Select a Status"
                                className={style.dropdown}
                            />
                            <label htmlFor="status_select">Add status</label>
                        </FloatLabel>
                    </div>
                </div>

                {/* Product Specification Section */}
                <div className={style.room_detail_container}>
                    <span className={style.room_detail_title}>Product specification</span>
                    <div className={style.room_specification}>
                        <div className={style.add_dimension}>
                            <label htmlFor="addDimmension">Dimension</label>
                            <div className={style.input_container_add_container}>
                                <InputNumber inputClassName={style.input_add_dimension} value={productWidth} onChange={(e) => setProductWidth(e.value)} placeholder="Width" />
                                <InputNumber inputClassName={style.input_add_dimension} value={productHeight} onChange={(e) => setProductHeight(e.value)} placeholder="Height" />
                            </div>
                        </div>
                        <div className={style.add_dimension}>
                            <label htmlFor="addDimmension">Categories</label>
                            <div className={style.input_container_add_container}>
                                <Dropdown
                                    value={selectedCategory}
                                    options={productCategorie}
                                    onChange={(e) => setSelectedCategory(e.value)}
                                    optionLabel="name"
                                    placeholder="Select a Category"
                                    className={style.select_container}
                                />
                            </div>
                        </div>
                        <div className={style.add_dimension}>
                            <label htmlFor="addDimmension">Weight</label>
                            <div className={style.input_container_add_container}>
                                <InputNumber inputClassName={style.select_container} value={productWeight} onChange={(e) => setProductWeight(e.value)} placeholder="Weight" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Description Section */}
                <div className={style.room_description_container}>
                    <span className={style.room_description_title}>Product description</span>
                    <textarea className={style.room_description_textarea} value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
                </div>

                {/* Buttons */}
                <div className={style.button_list}>
                    <Button className="button-secondary" raised label="Cancel" />
                    <Button className="button-primary" label="+ Add room" onClick={handleSubmit} />
                </div>
            </div>
        </>
    );
}
