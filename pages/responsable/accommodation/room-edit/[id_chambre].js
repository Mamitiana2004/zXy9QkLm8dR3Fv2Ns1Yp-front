import Head from "next/head";
import style from '@/style/pages/responsable/accommodation/addNewRoom.module.css';
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
import { useRouter } from "next/router";

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
    const id = user.id_etablissement;
    const toast = useRef(null); // Create reference for Toast
    const [missingFields, setMissingFields] = useState({});
    const router = useRouter();
    const { id_chambre } = router.query
    const [amenitiesEdit, setAmenitiesEdit] = useState(false);
    const [nomChambre, setNomChambre] = useState("");
    const [capacity, setCapacity] = useState(false);


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
        fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/type-chambres/`)
            .then(response => response.json())
            .then(data => setTypeChambre(data))
            .catch(error => console.error('Erreur lors de la récupération des données :', error));
    }, []);

    // Recupere les donnees a editer
    useEffect(() => {
        if (id_chambre) {
            fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/get-hebergement-chambre/${id_chambre}/`)
                .then(res => res.json())
                .then(data => {
                    const dict = { id: data.chambre, type_chambre: data.type_chambre, nombre_min_personnes: 1, nombre_max_personnes: 2 }
                    setSelectedType(dict);
                    setAmenitiesEdit(data.accessoires_list);
                    setNomChambre(data.nom_chambre);
                    setPrice(data.prix_nuit_chambre);
                    setCapacity(data.capacite);
                    setSelectedStatus(statusOptions.find(option => option.id === data.chambre.status)); // Corrected: use 'id' for statusOptions
                    setDescription(data.description);
                    setListImage(data.images.map(image => image));
                    setFileImages(data.images);
                })
            .catch(err => console.error(err));

        }
    }, [id_chambre ]);

    const handleSubmit = (e) => {
         e.preventDefault(); // Prevent default form submission

        // Collecting missing fields
        const newMissingFields = {
            name: !nomChambre,
            type: !selectedType,
            capacity: !capacity,
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

        fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/edit-hebergement-chambre/${id_chambre}`, {
            method: 'PUT',
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
    };


    return (
        <>
            <Head>
                <title>Add new Room</title>
            </Head>

            <Toast ref={toast} />

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
                                <Image
                                    imageClassName={style.image}
                                    src={image.content != null ? `data:image/jpeg;base64,${image.content}` : image.url != null ? image.url : ""}
                                    alt="image" 
                                
                                    />
                            </div>
                        );
                    })}
                </div>
                <div className={style.room_detail_container}>
                    <span className={style.room_detail_title}>Room details</span>
                    <div className={style.room_detail}>
                        <FloatLabel>
                            <InputText value={nomChambre} onChange={(e) => setNomChambre(e.target.value)} className={`${style.input_text} ${missingFields.name ? style.input_missing : ''}`} id="name_input" type="text" />
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
                            <InputText value={capacity}  onChange={(e) => setCapacity(e.target.value) } className={`${style.input_text} ${missingFields.capacity ? style.input_missing : ''}`} id="capacity_input" type="text" />
                            <label htmlFor="capacity_input">Capacity</label>
                        </FloatLabel>
                        <FloatLabel>
                            <InputNumber value={price} onChange={(e) => setPrice(e.target.value)} className={`${style.input_text} ${missingFields.price ? style.input_missing : ''}`} id="price_input" />
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
                    <span value={amenitiesEdit} onChange={(e) => setAmenitiesEdit(e.target.value)} className={style.room_ammenties_title}>Room amenities</span>
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
