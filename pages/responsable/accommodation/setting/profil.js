import Head from "next/head";
import style from './../../../../style/pages/responsable/accommodation/setting.module.css';
import style_profile from "./../../../../style/pages/responsable/accommodation/setting/profil.module.css";
import { useState, useEffect, useContext } from "react";
import { Button } from "primereact/button";
import { useRouter } from "next/router";
import { Avatar } from "primereact/avatar";
import ResponsableLayoutContext from "@/layouts/context/responsableLayoutContext";
import UrlConfig from "@/util/config";


export default function Profil() {

    const router = useRouter();
    const { user } = useContext(ResponsableLayoutContext);
    const id = user ? user.id_hebergement : 1; // Mbola hovaina 

    const [responsable, setResponsable] = useState(null);
    const [infosHotels, setInfosHotels] = useState(null);

    useEffect(() => {
        if (!id) return;
        fetch(`${UrlConfig.apiBaseUrl}/api/accounts/detail-responsable/${id}/`)
            .then(response => response.json())
            .then(data => setResponsable(data))
            .catch(error => console.error('Error fetching responsable data:', error));

        fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/info/${id}/`)
            .then(response => response.json())
            .then(data => setInfosHotels(data))
            .catch(error => console.error('Error fetching hotel data:', error));

    }, [id]);

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
                        <span className={style.left_top_title}>Tik&apos;Art</span>
                    </div>
                    <div className={style.left_body_container}>
                        {menuSidebar.map((item, index) => (
                            <Button key={index} onClick={() => router.push("/responsable/accommodation/setting/" + item.label.toLowerCase())} text className={menu == index ? "button-secondary" : style.text_button} raised={menu == index} label={item.label} />
                        ))}
                    </div>
                </div>
                <div className={style.right_body_container}>
                    <div className={style_profile.container}>
                        <div className={style_profile.user_title_container}>
                            <div className={style_profile.user_title_left}>
                                <Avatar label="F" shape="circle" className={style_profile.user_avatar} />
                                {responsable && (
                                    <div className={style_profile.user_title}>
                                        <span className={style_profile.title}>{responsable.first_name} {responsable.last_name}</span>
                                        <span>Manager</span>
                                    </div>
                                )}
                            </div>
                            <Button text className={style_profile.button_edit} icon="pi pi-pen-to-square" raised label="Edit" />
                        </div>
                        <div className="separateur"></div>
                        <div className={style_profile.detail_user_container}>
                            <div className={style_profile.detail_user_top_container}>
                                <span className={style_profile.title}>Personal information</span>
                                <Button text className={style_profile.button_edit} icon="pi pi-pen-to-square" raised label="Edit" />
                            </div>
                            <div className={style_profile.detail_user_body_container}>
                                {responsable && (
                                    <>
                                        <div className={style_profile.detail_user}>
                                            <span className={style_profile.title}>First name</span>
                                            <span>{responsable.first_name}</span>
                                        </div>
                                        <div className={style_profile.detail_user}>
                                            <span className={style_profile.title}>Last name</span>
                                            <span>{responsable.last_name}</span>
                                        </div>
                                        <div className={style_profile.detail_user}>
                                            <span className={style_profile.title}>Email address</span>
                                            <span>{responsable.email}</span>
                                        </div>
                                        <div className={style_profile.detail_user}>
                                            <span className={style_profile.title}>Phone number</span>
                                            <span>{responsable.phone}</span>
                                        </div>
                                        <div className={style_profile.detail_user}>
                                            <span className={style_profile.title}>Bio</span>
                                            <span>{responsable.bio}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="separateur"></div>
                        <div className={style_profile.detail_user_container}>
                            <div className={style_profile.detail_user_top_container}>
                                <span className={style_profile.title}>Hotel information</span>
                                <Button text className={style_profile.button_edit} icon="pi pi-pen-to-square" raised label="Edit" />
                            </div>
                            <div className={style_profile.detail_user_body_container}>
                                {infosHotels && (
                                    <>
                                        <div className={style_profile.detail_user}>
                                            <span className={style_profile.title}>Hotel name</span>
                                            <span>{infosHotels.nom_hebergement || "Not available"}</span>
                                        </div>
                                        <div className={style_profile.detail_user}>
                                            <span className={style_profile.title}>Address</span>
                                            <span>{infosHotels.localisation.adresse || "Not available"}</span>
                                        </div>
                                        <div className={style_profile.detail_user}>
                                            <span className={style_profile.title}>City</span>
                                            <span>{infosHotels.localisation.ville || "Not available"}</span>
                                        </div>
                                        <div className={style_profile.detail_user}>
                                            <span className={style_profile.title}>Country</span>
                                            <span>{infosHotels.hotel_country || "Not available"}</span>
                                        </div>
                                        <div className={style_profile.detail_user}>
                                            <span className={style_profile.title}>NIF</span>
                                            <span>{infosHotels.nif || "Not available"}</span>
                                        </div>
                                        <div className={style_profile.detail_user}>
                                            <span className={style_profile.title}>STAT</span>
                                            <span>{infosHotels.stat || "Not available"}</span>
                                        </div>
                                        <div className={style_profile.detail_user}>
                                            <span className={style_profile.title}>Hotel type</span>
                                            <span>{infosHotels.type_hebergement}</span>
                                        </div>
                                        <div className={style_profile.detail_user}>
                                            <span className={style_profile.title}>Total rooms</span>
                                            <span>{infosHotels.total_rooms || "Not available"}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
