import { useContext, useRef } from "react"
import ResponsableLayoutContext from "../context/responsableLayoutContext"
import { useRouter } from "next/router";
import style from '@/style/layouts/responsable/AppTopBarResponsable.module.css';
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import Link from "next/link";
import Image from "next/image";
export default function AppTopBarResponsable(props) {

    const { user, setUser } = useContext(ResponsableLayoutContext);
    const router = useRouter();

    const menu = useRef(null);

    const getLabelAvatar = (str) => {
        if (str.length > 0) {
            return str.charAt(0);
        }
        return '';
    }
    let items = [];
    // console.log(user.id_etablissement);
    return (
        <div div style={props.style} className={style.container}>
            <div className={style.navbar}>
                <div className={style.nav_title}>
                    <Link href={"/users"}>
                        <Image width={100} height={106} src={"/images/logo-aftrip.png"} alt='logo' />
                    </Link>
                    <div className={style.search_contaner}>
                        <input type="search" placeholder="Search" className={style.input_search} />
                    </div>
                </div>
                <div className={style.right_container}>
                    <div aria-controls="popup_menu_right" aria-haspopup onClick={(event) => menu.current.toggle(event)} className={style.user_container}>
                        <Avatar
                            label={getLabelAvatar(user.username)}
                            shape='circle'
                            className={style.username_image}
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
                </div>
            </div>
        </div>
    )
}