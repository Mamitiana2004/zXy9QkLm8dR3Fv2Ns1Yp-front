import style from '@/style/layouts/AppTopbar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LayoutContext from './context/layoutContext';
import { useContext, useEffect, useRef } from 'react';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

import { Button } from 'primereact/button';
export default function AppTopbar(props) {


    const { t } = useTranslation();
    const router = useRouter();
    const menu = useRef(null);
    const menuLang = useRef(null);
    const { user, setUser } = useContext(LayoutContext);
    const { lang, setLang } = useContext(LayoutContext);

    const langMenu = [
        {
            label: "En",
            command: () => setLang("en")
        },
        {
            label: "Fr",
            command: () => setLang("fr")
        }
    ]





    const getLabelAvatar = (str) => {
        if (str.length > 0) {
            return str.charAt(0);
        }
        return '';
    }
    let items = [
        {
            label: t("profil"),
            icon: 'pi pi-fw pi-user',
            command: () => {
                router.push("/users/profil");
            }
        },
        {
            label: t("shopping_cart"),
            icon: 'pi pi-fw pi-shopping-cart',
            command: () => {
                router.push("/users/cart");
            }
        },
        {
            label: 'Responsable',
            icon: 'pi pi-fw pi-user-edit',
            command: () => {
                router.push("/responsable");
            }
        },
        {
            label: t("setting") + "s",
            icon: 'pi pi-fw pi-cog',
            command: () => {
                router.push("/users/setting");
            }
        },
        {
            separator: true
        },
        {
            label: t("log_out"),
            icon: 'pi pi-sign-out',
            command: () => {
                logOut();
            }
        }
    ];


    const logOut = () => {
        Cookies.remove('refresh_token');
        Cookies.remove('access_token');
        router.push("/users/login");
        setUser(null);
    }
    return (
        <div style={props.style} className={!props.home ? style.container : style.container_home}>
            <div className={style.navbar}>
                <div className={style.nav_title}>
                    <Link href={"/users"}>
                        <Image width={100} height={106} src={"/images/logo-aftrip.png"} alt='logo' />
                    </Link>
                </div>
                <div className={style.navbar_menu_container}>
                    <Link style={{ textDecoration: "none" }} href={"/users"}>
                        <span className={style.navbar_menu_item}>{t("home")}</span>
                    </Link>
                    <Link style={{ textDecoration: "none" }} href={"/users/accommodation"}>
                        <span className={style.navbar_menu_item}>{t("accommodation")}</span>
                    </Link>
                    <Link style={{ textDecoration: "none" }} href={"/users/handcraft"}>
                        <span className={style.navbar_menu_item}>{t("handcraft")}</span>
                    </Link>
                    <Link style={{ textDecoration: "none" }} href={"/users/tour"}>
                        <span className={style.navbar_menu_item}>{t("tour")}</span>
                    </Link>
                    <Link style={{ textDecoration: "none" }} href={"/users/about"}>
                        <span className={style.navbar_menu_item}>{t("about_us")}</span>
                    </Link>
                </div>
                <div className={style.right_container}>
                    <Button onClick={(e) => menuLang.current.toggle(e)} className={style.icon_cog} label={lang} />
                    <Menu
                        ref={menuLang}
                        model={langMenu}
                        popup
                    />
                    {
                        user == null && (
                            <div className={style.nav_right}>
                                <div className={style.button_group}>
                                    <button onClick={() => router.push("/users/login")} className='button-secondary'>{t("login")}</button>
                                    <button onClick={() => router.push("/users/register")} className={props.home ? 'button-secondary' : 'button-primary'}>{t("register")}</button>
                                </div>
                            </div>
                        )
                    }
                    {
                        user != null && (
                            <>
                                <div aria-controls="popup_menu_right" aria-haspopup onClick={(event) => menu.current.toggle(event)} className={style.user_container}>
                                    <Avatar
                                        label={getLabelAvatar(user.username)}
                                        shape='circle'
                                        className={style.username_image}
                                        image={user.userImage}
                                    />
                                    <span className={style.username}>{user.username}</span>
                                </div>
                                <Menu
                                    className={style.menu}
                                    id="popup_menu_right"
                                    popupAlignment="right"
                                    ref={menu}
                                    model={items}
                                    popup
                                    pt={{
                                        label: { className: style.menu_item },
                                        icon: { className: style.menu_item },
                                        menuitem: { className: style.menu_item_container }
                                    }}
                                />
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
}