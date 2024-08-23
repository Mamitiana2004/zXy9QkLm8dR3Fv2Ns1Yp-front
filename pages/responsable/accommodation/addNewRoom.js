import Head from "next/head";
import style from './../../../style/pages/responsable/accommodation/addNewRoom.module.css';
import { useEffect, useRef, useState, useContext } from "react";
import { Image } from "primereact/image";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast"; // Import Toast
import RoomAmenities from "@/components/RoomAmenities";
import { UrlConfig } from "@/util/config";
import ResponsableLayoutContext from "@/layouts/context/responsableLayoutContext";
import { getResponsableAccessToken } from "@/util/Cookies";

export default function AddNewRoom() {
    const [typeChambre, setTypeChambre] = useState([]);
    const [imageFile, setImageFile] = useState();
    const inputRef = useRef(null);
    const [selectedType, setSelectedType] = useState();
    const [selectedStatus, setSelectedStatus] = useState();
    const [price, setPrice] = useState();
    const [fileImages, setFileImages] = useState([]);
    const [amenities, setAmenities] = useState([]);
    const [listImage, setListImage] = useState([]);
    const [description, setDescription] = useState();
    const { user } = useContext(ResponsableLayoutContext);
    const id = user ? user.id_etablissement : 0;
    const toast = useRef(null); // Create reference for Toast
    const [missingFields, setMissingFields] = useState({});

    const handleClick = () => {
        inputRef.current.click();
    };

    const statusOptions = [
        { id: 1, name: 'Available' },
        { id: 2, name: 'Not Available' }
    ];

    const handleFileUpload = () => {
        const files = inputRef.current.files;
        if (files.length > 0 && files[0].type.startsWith('image/')) {
            const fileUrl = URL.createObjectURL(files[0]);
            const listImageCopy = [...listImage];
            listImageCopy.push(fileUrl);
            setListImage(listImageCopy);
            const filesCopy = [...fileImages];
            filesCopy.push(files[0]);
            setFileImages(filesCopy);
        }
    };

    useEffect(() => {
        getResponsableAccessToken().then((access) => {
            fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/type-chambres/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access}`,
                },

            })
                .then(response => response.json())
                .then(data => setTypeChambre(data))
                .catch(error => console.error('Erreur lors de la récupération des données :', error));
        })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Collecting missing fields
        const newMissingFields = {
            name: !document.getElementById('name_input').value,
            type: !selectedType,
            capacity: !document.getElementById('capacity_input').value,
            price: !price,
            status: !selectedStatus,
            description: !description,
        };

        setMissingFields(newMissingFields);

        // Check if any fields are missing
        if (Object.values(newMissingFields).some(isMissing => isMissing)) {
            toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'All fields are required', life: 3000 });
            return;
        }

        const formData = new FormData();
        formData.append('nom_chambre', document.getElementById('name_input').value);
        formData.append('hebergement', id);
        formData.append('chambre', selectedType.id);
        formData.append('capacite', document.getElementById('capacity_input').value);
        formData.append('prix_nuit_chambre', price);
        formData.append('status', selectedStatus.id);
        formData.append('description', description);

        fileImages.forEach((file, index) => {
            formData.append(`images[${index}]`, file);
        });

        amenities.forEach((accessory, index) => {
            formData.append(`accessories[${index}]`, accessory.id);
        });

        getResponsableAccessToken().then((access) => {
            fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/add-hebergement-chambre/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access}`,
                },
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Room added successfully', life: 2000 });

                    setTimeout(() => {
                        setTypeChambre([]);
                        setImageFile();
                        setSelectedType();
                        setSelectedStatus();
                        setPrice();
                        setFileImages([]);
                        setAmenities([]);
                        setListImage([]);
                        setDescription("");

                        window.location.reload();
                    }, 2000);
                })
                .catch(error => {
                    console.error('Error:', error);
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to add room', life: 3000 });
                });
        })

    };


    return (
        <>
            <Head>
                <title>Add new Room</title>
            </Head>

            <Toast ref={toast} /> {/* Toast Component */}

            <div className={style.top_container}>
                <div className={style.top_container_title_container}>
                    <span className={style.top_container_title}>Room</span>
                    <span className={style.top_container_subtitle}>Brajas Hotel</span>
                </div>
            </div>

            <div className={style.container}>
                <div className={style.image_container}>
                    <div onClick={handleClick} className={style.button_image}>
                        <i className="pi pi-plus" />
                        <span>Add image</span>
                        <input value={imageFile} ref={inputRef} onChange={handleFileUpload} type="file" accept="image/*" style={{ display: "none" }} />
                    </div>
                    {listImage.map((image, index) => {
                        return (
                            <div key={index} className={style.image_add_container}>
                                <Image imageClassName={style.image} src={image} alt="image" />
                            </div>
                        );
                    })}
                </div>
                <div className={style.room_detail_container}>
                    <span className={style.room_detail_title}>Room details</span>
                    <div className={style.room_detail}>
                        <FloatLabel>
                            <InputText className={`${style.input_text} ${missingFields.name ? style.input_missing : ''}`} id="name_input" type="text" />
                            <label htmlFor="name_input">Name</label>
                        </FloatLabel>
                        <FloatLabel>
                            <Dropdown
                                id="id"
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.value)}
                                options={typeChambre}
                                optionLabel="type_chambre"
                                className={`${style.dropdown} ${missingFields.type ? style.input_missing : ''}`}
                            />
                            <label htmlFor="type_select">Type</label>
                        </FloatLabel>
                        <FloatLabel>
                            <InputText className={`${style.input_text} ${missingFields.capacity ? style.input_missing : ''}`} id="capacity_input" type="text" />
                            <label htmlFor="capacity_input">Capacity</label>
                        </FloatLabel>
                        <FloatLabel>
                            <InputNumber className={`${style.input_text} ${missingFields.price ? style.input_missing : ''}`} id="price_input" value={price}
                                onChange={(e) => setPrice(e.value)} />
                            <label htmlFor="price_input">Price per night</label>
                        </FloatLabel>
                        <FloatLabel>
                            <Dropdown
                                id="status_select"
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.value)}
                                options={statusOptions}
                                optionLabel="name"
                                className={`${style.dropdown} ${missingFields.status ? style.input_missing : ''}`}
                            />
                            <label htmlFor="status_select">Add status</label>
                        </FloatLabel>
                    </div>
                </div>
                <div className={style.room_ammenties_container}>
                    <span className={style.room_ammenties_title}>Room amenities</span>
                    <RoomAmenities setAmenities={setAmenities} />
                </div>
                <div className={style.room_description_container}>
                    <span className={style.room_description_title}>Room description</span>
                    <textarea
                        className={`${style.room_description_textarea} ${missingFields.description ? style.input_missing : ''}`}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className={style.button_list}>
                    <Button className="button-secondary" raised label="Cancel" />
                    <Button className="button-primary" label="+ Add room" onClick={handleSubmit} />
                </div>
            </div>
        </>
    );
}
