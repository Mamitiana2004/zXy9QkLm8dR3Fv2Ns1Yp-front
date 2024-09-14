import Head from "next/head";
import style from '@/style/pages/responsable/handcraft/addProduct.module.css';
import { useRef, useState, useContext, useEffect } from "react";
import { Image } from "primereact/image";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { MultiSelect } from 'primereact/multiselect';
import ResponsableLayoutContext from "@/layouts/context/responsableLayoutContext";
import UrlConfig from "@/util/config";
import { useRouter } from 'next/router';
import { Toast } from "primereact/toast";

export default function EditProduct() {
    const { user } = useContext(ResponsableLayoutContext);
    const inputRef = useRef(null);
    const [listImage, setListImage] = useState([]);
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const [selectedStatus, setSelectedStatus] = useState(null);
    const [productWeight, setProductWeight] = useState(null);
    const [productWidth, setProductWidth] = useState(null);
    const [productHeight, setProductHeight] = useState(null);
    const [productQuantity, setProductQuantity] = useState(null);
    const [productCategorie, setProductCategorie] = useState([]);
    const toast = useRef(null);

    const router = useRouter();

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
            prix_artisanat: parseFloat(productPrice) ? productPrice.toFixed(2) : "0.00",
            disponible_artisanat: selectedStatus,
            poid_kg: parseFloat(productWeight) !== null ? productWeight : null,
            largeur: parseInt(productWidth) !== null ? productWidth : null,
            hauteur: parseInt(productHeight) !== null ? productHeight : null,
            nb_produit_dispo: productQuantity !== null ? productQuantity : 0,
            artisanat: id_artisanat,
            specifications: selectedCategories.map(category => category.id),
        };
        console.log(payload);
        fetch(`${UrlConfig.apiBaseUrl}/api/artisanat/${id_artisanat}/produits/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(response => {
                if (!response.ok) {
                    toast.current.show({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Please complete all fields',
                        life: 3000
                    });
                    return null;
                }
                return response.json()
            })
            .then(data => {
                if (data) {
                    const files = inputRef.current.files;
                    if (files.length > 0) {
                        uploadImages(files, data.id);
                    }
                }

            })
            .catch(err => console.error('Error adding product:', err));
    };

    const handleFileUpload = () => {
        const files = inputRef.current.files;
        if (files.length > 0) {
            const fileUrls = Array.from(files).map(file => {
                if (file.type.startsWith('image/')) {
                    return URL.createObjectURL(file);
                }
                return null;
            }).filter(url => url !== null);

            setListImage(prevList => [...prevList, ...fileUrls]);
        }
    };

    const uploadImages = (files, productId) => {
        const formData = new FormData();
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                formData.append('image[]', file);
            }
        });

        formData.append('produit', productId);

        fetch(`${UrlConfig.apiBaseUrl}/api/artisanat/images-produits/`, {
            method: "POST",
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error('Backend error:', data.error);
                } else {
                    resetForm();
                    toast.current.show({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Product added succefuly',
                        life: 3000
                    });
                    setListImage(prevList => [...prevList, ...data]);
                }
            })
            .catch(err => console.error('Error uploading images:', err));
    };


    const resetForm = () => {
        setListImage([]);
        setProductName("");
        setProductDescription("");
        setProductPrice(null);
        setSelectedCategories([]);
        setSelectedStatus(null);
        setProductWeight(null);
        setProductWidth(null);
        setProductHeight(null);
        setProductQuantity(null);
        setProductCategorie([]);
    };
    return (
        <>
            <Head>
                <title>Edit Product</title>
            </Head>
            <div className={style.container}>
                <div className={style.image_container}>
                    <div onClick={() => inputRef.current.click()} className={style.button_image}>
                        <i className="pi pi-plus" />
                        <span>Add image</span>
                        <input
                            ref={inputRef}
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleFileUpload}
                            multiple
                        />
                    </div>
                    {listImage.map((image, index) => (
                        <div key={index} className={style.image_add_container}>
                            <Image imageClassName={style.image} src={image} alt="image" />
                        </div>
                    ))}
                </div>

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
                            <div className={style.add_dimension}>
                                <label htmlFor="categories">Categories</label>
                                <MultiSelect
                                    id="categories"
                                    value={selectedCategories}
                                    options={productCategorie}
                                    onChange={(e) => setSelectedCategories(e.value)}
                                    optionLabel="name"
                                    placeholder="Select Categories"
                                    className={style.multiselect}
                                    display="chip"
                                    filter
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

                <div className={style.room_description_container}>
                    <span className={style.room_description_title}>Product description</span>
                    <textarea className={style.room_description_textarea} value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
                </div>

                <div className={style.button_list}>
                    <Button className="button-secondary" raised label="Cancel" />
                    <Button className="button-primary" label=" Edit product" onClick={handleSubmit} />
                </div>
            </div>
            <Toast ref={toast} />
        </>
    );
}
