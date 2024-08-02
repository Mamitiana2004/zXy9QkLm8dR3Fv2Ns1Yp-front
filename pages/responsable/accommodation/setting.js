import Head from "next/head";
import style from './../../../style/pages/responsable/accommodation/setting.module.css';
import { useState } from "react";
import { Button } from "primereact/button";

export default function Setting() {

    const [menuSidebar, setMenuSidebar] = useState([
        { label: "Profil" },
        { label: "Security" },
        { label: "Notification" },
        { label: "Log" },
        { label: "Help" }
    ]);

    const [menu, setMenu] = useState(0);

    return (
        <>
            <Head>
                <title>Setting</title>
            </Head>

            <div className={style.container}>
                <div className={style.left_container}>
                    <div className={style.left_top_container}>
                        <span className={style.left_top_subtitle}>{menuSidebar[menu].label}</span>
                        <span className={style.left_top_title}>Tik&apos;Art</span>
                    </div>
                    <div className={style.left_body_container}>
                        {menuSidebar.map((item, index) => {
                            return (
                                <Button
                                    key={index}
                                    text
                                    className={menu === index ? "button-secondary" : style.text_button}
                                    raised={menu === index ? true : false}
                                    label={item.label}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
