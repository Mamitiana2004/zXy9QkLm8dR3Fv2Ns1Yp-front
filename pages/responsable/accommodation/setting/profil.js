import Head from "next/head";
import style from './../../../../style/pages/responsable/accommodation/setting.module.css';
import style_profile from "./../../../../style/pages/responsable/accommodation/setting/profil.module.css";
import { useState, useContext, useEffect } from "react";
import { Button } from "primereact/button";
import { useRouter } from "next/router";
import { Avatar } from "primereact/avatar";
import { Divider } from "primereact/divider";
import ResponsableLayoutContext from "@/layouts/context/responsableLayoutContext";
import { getCsrfFromToken } from '@/util/csrf';
import UrlConfig from "@/util/config";

export default function Profil() {

    const router = useRouter();

    const { user } = useContext(ResponsableLayoutContext);
    const { id } = router.query;

    const [nameHotel, setNameHotel] = useState(null);
    const [infosHotel, setInfosHotel] = useState(null);
    const [totalRooms, setTotalRooms] = useState(0);

    const [detailProfil, setDetailProfil] = useState(null);


    useEffect(() => {
        if (user) {
            const id_hebergement = user.id_etablissement;
            FetchProfil(id_hebergement, id);
        }
    }, [user]);

    function FetchProfil(id_hebergement) {
        getCsrfFromToken()
            .then(csrfToken => {
                // Fetch hotel details
                fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/get-id-hebergement/${id_hebergement}/`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFTOKEN': csrfToken,
                    }
                })
                    .then(response => response.json())
                    .then(hotelData => {
                        setNameHotel(hotelData);
                    })
                    .catch(err => console.error('Erreur lors de la récupération du nom de l\'hôtel:', err));
                
                //Fetch Detail Responsable
                fetch(`${UrlConfig.apiBaseUrl}/api/accounts/detail-responsable/${id_hebergement}/`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFTOKEN': csrfToken,
                    }
                })
                    .then(response => response.json())
                    .then(hotelData => {
                        setDetailProfil(hotelData);
                    })
                    .catch(err => console.error('Erreur lors de la récupération des details des responsable:', err));
                
                
                //Fetch Informations Hotels
                fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/info/${id_hebergement}/`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFTOKEN': csrfToken,
                    }
                })
                    .then(response => response.json())
                    .then(hotelData => {
                        setInfosHotel(hotelData);
                    })
                    .catch(err => console.error('Erreur lors de la récupération des informations des Hotels:', err));
                
                
                // Fetch Total Rooms
                fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/${id_hebergement}/stats/`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFTOKEN': csrfToken,
                    }
                })
                .then(response => response.json())
                .then(totalRoom => {
                    setTotalRooms(totalRoom);
                })
                    .catch(err => console.error('Erreur lors de la récupération des statistiques de l\'hôtel:', err));
                
            })
            .catch(err => console.error('Erreur lors de la récupération du token CSRF:', err));   
    }



    const [menuSidebar, setMenuSidebar] = useState([
        { label: "Profil" },
        { label: "Security" },
        { label: "Notification" },
        { label: "Log" },
        { label: "Help" }
    ]);

    const menu = 0;

    return (
        <>
            <Head>
                <title>Profil</title>
            </Head>

            <div className={style.container}>
                <div className={style.left_container}>
                    <div className={style.left_top_container}>
                        <span className={style.left_top_subtitle}>{menuSidebar[menu].label}</span>
                        <span className={style.left_top_title}>{nameHotel?.nom_hebergement || 'No Hotel Name'}</span>
                    </div>
                    <div className={style.left_body_container}>
                        {menuSidebar.map((item, index) => {
                            return <Button key={index} onClick={() => router.push("/responsable/accommodation/setting/" + item.label.toLowerCase())} text className={menu == index ? "button-secondary" : style.text_button} raised={menu == index ? true : false} label={item.label} />
                        })}
                    </div>
                </div>
                <div className={style.right_body_container}>
                    <div className={style_profile.container}>
                        <div className={style_profile.user_title_container}>
                            <div className={style_profile.user_title_left}>
                                <Avatar label="F" shape="circle" className={style_profile.user_avatar} />
                                <div className={style_profile.user_title}>
                                    <span className={style_profile.title}>{detailProfil?.first_name || 'No Name'}</span>
                                    <span>Manager</span>
                                </div>
                            </div>
                            <Button text className={style_profile.button_edit} icon="pi pi-pen-to-square" raised label="Edit" />
                        </div>
                        <div className="separateur"></div>
                        <div className={style_profile.detail_user_container}>
                            <div className={style_profile.detail_user_top_container}>
                                <span className={style_profile.title}>Personnal information</span>
                                <Button text className={style_profile.button_edit} icon="pi pi-pen-to-square" raised label="Edit" />
                            </div>
                            <div className={style_profile.detail_user_body_container}>
                                <div className={style_profile.detail_user}>
                                    <span className={style_profile.title}>First name</span>
                                    <span>{detailProfil?.first_name || 'No Name'}</span>
                                </div>
                                <div className={style_profile.detail_user}>
                                    <span className={style_profile.title}>Lasts name</span>
                                    <span>{detailProfil?.last_name || 'No Last name'}</span>
                                </div>
                                <div className={style_profile.detail_user}>
                                    <span className={style_profile.title}>Email address</span>
                                    <span>{detailProfil?.email || 'No Email'}</span>
                                </div>
                                <div className={style_profile.detail_user}>
                                    <span className={style_profile.title}>Phone number</span>
                                    <span>{detailProfil?.numero_responsable || 'No Number'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="separateur"></div>
                        <div className={style_profile.detail_user_container}>
                            <div className={style_profile.detail_user_top_container}>
                                <span className={style_profile.title}>Hotel information</span>
                                <Button text className={style_profile.button_edit} icon="pi pi-pen-to-square" raised label="Edit" />
                            </div>
                            <div className={style_profile.detail_user_body_container}>
                                <div className={style_profile.detail_user}>
                                    <span className={style_profile.title}>Hotel name</span>
                                    <span>{infosHotel?.nom_hebergement || 'No Number'}</span>
                                </div>
                                <div className={style_profile.detail_user}>
                                    <span className={style_profile.title}>Address</span>
                                    <span>{infosHotel?.localisation.adresse || 'No Number'}</span>
                                </div>
                                <div className={style_profile.detail_user}>
                                    <span className={style_profile.title}>City</span>
                                    <span>{infosHotel?.localisation.ville || 'No Number'}</span>
                                </div>
                                <div className={style_profile.detail_user}>
                                    <span className={style_profile.title}>NIF</span>
                                    <span>{infosHotel?.nif || 'No Number'}</span>
                                </div>
                                <div className={style_profile.detail_user}>
                                    <span className={style_profile.title}>STAT</span>
                                    <span>{infosHotel?.stat || 'No Number'}</span>
                                </div>
                                <div className={style_profile.detail_user}>
                                    <span className={style_profile.title}>Hotels type</span>
                                    <span>{infosHotel?.type_hebergement || 'No Number'}</span>
                                </div>
                                <div className={style_profile.detail_user}>
                                    <span className={style_profile.title}>Total rooms</span>
                                    <span>{totalRooms.available_room_count}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}