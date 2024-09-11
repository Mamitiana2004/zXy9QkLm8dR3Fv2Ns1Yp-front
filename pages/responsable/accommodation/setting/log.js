import Head from "next/head";
import style from './../../../../style/pages/responsable/accommodation/setting.module.css';
import { useContext, useState } from "react";
import { Button } from "primereact/button";
import { useRouter } from "next/router";
import ResponsableLayoutContext from "@/layouts/context/responsableLayoutContext";
export default function Log() {

    const router = useRouter();
    const { user, setUser } = useContext(ResponsableLayoutContext);

    const [menuSidebar, setMenuSidebar] = useState([
        { label: "Profil" },
        { label: "Commission" },
        { label: "Notification" },
        { label: "Log" },
        { label: "Help" }
    ]);

    const menu = 3;

    return (
        <>
            <Head>
                <title>Log</title>
            </Head>

            <div className={style.container}>
                <div className={style.left_container}>
                    <div className={style.left_top_container}>
                        <span className={style.left_top_subtitle}>{menuSidebar[menu].label}</span>
                        <span className={style.left_top_title}>{user ? user.nom_hebergement : null}</span>
                    </div>
                    <div className={style.left_body_container}>
                        {menuSidebar.map((item, index) => {
                            return <Button key={index} onClick={() => router.push("/responsable/accommodation/setting/" + item.label.toLowerCase())} text className={menu == index ? "button-secondary" : style.text_button} raised={menu == index ? true : false} label={item.label} />
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}