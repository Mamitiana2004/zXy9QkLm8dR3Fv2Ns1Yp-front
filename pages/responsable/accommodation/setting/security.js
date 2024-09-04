import Head from "next/head";
import style from './../../../../style/pages/responsable/accommodation/setting.module.css';
import { useState } from "react";
import { Button } from "primereact/button";
import { useRouter } from "next/router";
import { Slider } from "primereact/slider";
import styleDropdown from '@/style/components/ListCheckbox.module.css';
import { getResponsableAccessToken } from "@/util/Cookies";

export default function Security() {

    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [menuSidebar, setMenuSidebar] = useState([
        { label: "Profil" },
        { label: "Security" },
        { label: "Notification" },
        { label: "Log" },
        { label: "Help" }
    ]);

    const menu = 1;
    const [priceIntervalle, setPriceIntervalle] = useState([0, 100]);
    const [commission, setCommission] = useState(7);
    const [selectedCommission, setSelectedCommission] = useState(7);

    const priceByPourcentage = (percentage) => {
        const minValue = 7;
        const maxValue = 15;

        if (percentage < 0 || percentage > 100) {
            throw new Error("Le pourcentage doit être entre 0 et 100.");
        }

        const value = minValue + (percentage / 100) * (maxValue - minValue);


        return value.toFixed(2);
    }
    const filterPrice = (e) => {
        setCommission(e.value);
        let commission = priceByPourcentage(e.value);
        setSelectedCommission(commission);
    }
    const saveChange = () => {
        setIsEditing(!isEditing);
    }
    function handleSave() {
        getResponsableAccessToken()
            .then(access => {
                fetch(`${UrlConfig.apiBaseUrl}/api/accounts/detail-responsable/${user.id}/`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                        // 'X-CSRFTOKEN': csrfToken,
                    },
                    body: JSON.stringify(detailProfil),
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Erreur lors de la mise à jour');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Données mises à jour:', data);
                        setIsEditing(!isEditing);
                    })
                    .catch(err => console.error('Erreur lors de la mise à jour des informations personnelles:', err));

            })
            .catch(err => console.error('Erreur lors de la récupération du token CSRF:', err));
    }

    return (
        <>
            <Head>
                <title>Security</title>
            </Head>

            <div className={style.container}>
                <div className={style.left_container}>
                    <div className={style.left_top_container}>
                        <span className={style.left_top_subtitle}>{menuSidebar[menu].label}</span>
                        <span className={style.left_top_title}>Tik&apos;Art</span>
                    </div>
                    <div className={style.left_body_container}>
                        {menuSidebar.map((item, index) => {
                            return <Button key={index} onClick={() => router.push("/responsable/accommodation/setting/" + item.label.toLowerCase())} text className={menu == index ? "button-secondary" : style.text_button} raised={menu == index ? true : false} label={item.label} />
                        })}
                    </div>
                </div>
                <div className={style.right_body_container}>
                    <div className={style.left_top_container}>
                        <span className={style.left_top_subtitle}>Accommodation</span>
                        <span className={style.left_top_title}>Please choose a commission for your etablishment</span>
                        <span className={style.left_top_title}><br></br></span>
                    </div>
                    <hr style={{ marginBottom: "3rem" }} />
                    <div style={{ display: "flex", flexDirection: "column" }} className={styleDropdown.checkbox_container}>
                        <Slider style={{ width: "100%" }} value={commission} disabled={isEditing} onChange={filterPrice} />
                        <div className={styleDropdown.price}>
                            <span>{priceByPourcentage(priceIntervalle[0])} %</span>
                            <h1>{selectedCommission} %</h1>
                            <span>{priceByPourcentage(priceIntervalle[1])} %</span>
                        </div>
                    </div>
                    <hr />
                    <div style={{ display: "flex", gap: 20, alignItems: "flex-end", justifyContent: "flex-end", marginTop: "2rem" }}>
                        <Button
                            text
                            icon="pi pi-pen-to-square"
                            raised
                            label="Edit"
                            disabled={!isEditing}
                            onClick={() => setIsEditing(!isEditing)}
                        />

                        <Button
                            text
                            icon="pi pi-pen-to-square"
                            raised
                            label="Save"
                            disabled={isEditing}
                            onClick={() => saveChange()}
                        />
                    </div>
                </div>
            </div >
        </>
    )
}