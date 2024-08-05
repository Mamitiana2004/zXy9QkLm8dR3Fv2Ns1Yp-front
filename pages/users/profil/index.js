import Head from "next/head";
import style from '@/style/pages/users/Profile.module.css';
import Link from "next/link";
import { Avatar } from "primereact/avatar";
import { TabPanel, TabView } from "primereact/tabview";
import { Button } from "primereact/button";
import AppTopbar from "@/layouts/AppTopbar";
export default function Profile() {



    const panelClassName = (parent, index) => {
        if (parent.state.activeIndex === index)
            return style.tab_active;
        else 
            return style.tab;
    }
    
    return(
        <div className={style.container}>
            <div className={style.menu_container}>
                <Link style={{textDecoration:"none"}} href={"/users/profil"}>
                    <span className={style.menu_active}><i className="pi pi-user"/> Profil</span>
                </Link>
                <Link style={{textDecoration:"none"}} href={"/users/cart"}>
                    <span className={style.menu_item}><i className="pi pi-shopping-cart"/> Cart</span>
                </Link>
                <Link style={{textDecoration:"none"}} href={"/users/cart"}>
                    <span className={style.menu_item}><i className="pi pi-clock"/> History</span>
                </Link>
                <Link style={{textDecoration:"none"}} href={"/users/cart"}>
                    <span className={style.menu_item}><i className="pi pi-bell"/> Notification</span>
                </Link>
                <Link style={{textDecoration:"none"}} href={"/users/cart"}>
                    <span className={style.menu_item}><i className="pi pi-shield"/> Security</span>
                </Link>
                <Link style={{textDecoration:"none"}}  href={"/users/setting"}>
                    <span className={style.menu_item}><i className="pi pi-cog"/> Setting</span>
                </Link>
                <Link style={{textDecoration:"none"}} href={"/users/login"}>
                    <span className={style.menu_item}><i className="pi pi-sign-out"/> Log out</span>
                </Link>
            </div>
 
            <div className={style.profil_container}>
                <Link href={"/users"} className={style.back}><i className="pi pi-arrow-left"/> Back</Link>
                <div className={style.profil_image_container}>
                    <div className={style.profil_image_wrapper}>
                        <Avatar label="F" shape="circle" alt="user" className={style.profil_image} image="/images/users/user.jpg"/>
                        <div className={style.profil_user_info}>
                            <span className={style.profil_username}>Faneva Mamitana</span>
                            <span className={style.profil_adresse}>
                                <span>Account ID :</span>
                                <span>#23466809</span>
                            </span>
                        </div>
                    </div>
                    <Button className={style.edit_button} label="Edit" icon="pi pi-pen-to-square"/>
                </div>
                <div className={style.separateur}></div>
                <div className={style.profil_detail_container}>
                    <div className={style.profil_detail}>
                        <span className={style.title}>Personnal information</span>
                        <div className={style.profil}>
                            <div className={style.detail}>
                                <span className={style.label}>First name</span>
                                <span>Faneva </span>
                            </div>
                            <div className={style.detail}>
                                <span className={style.label}>First name</span>
                                <span>Faneva </span>
                            </div>
                            <div className={style.detail}>
                                <span className={style.label}>First name</span>
                                <span>Faneva </span>
                            </div>
                            <div className={style.detail}>
                                <span className={style.label}>First name</span>
                                <span>Faneva </span>
                            </div>
                            <div className={style.detail}>
                                <span className={style.label}>First name</span>
                                <span>Faneva </span>
                            </div>
                            <div className={style.detail}>
                                <span className={style.label}>First name</span>
                                <span>Faneva </span>
                            </div>
                        </div>
                    </div>
                    <Button className={style.edit_button} label="Edit" icon="pi pi-pen-to-square"/>
                </div>
            </div>
        </div>
    );
}




Profile.getLayout = function getLayout(page) {
    return(
        <>
            <Head>
                <title>User profile</title>
            </Head>
            <AppTopbar/>
            {page}
        </>
    );
}