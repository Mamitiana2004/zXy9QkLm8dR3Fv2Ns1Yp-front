    import style from '@/style/layouts/AppTopbar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LayoutContext from './context/layoutContext';
import { useContext, useRef } from 'react';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
    export default function AppTopbar() {
        const router=useRouter();
        const menu = useRef(null);
        const {user,setUser} = useContext(LayoutContext);

        
        const getLabelAvatar = (str) =>{
            if (str.length > 0) {
                return str.charAt(0);
            }
            return '';
        }
        let items = [
            { 
                label: 'Profile',
                icon: 'pi pi-fw pi-user',
                command:()=>{
                    router.push("/users/profil");
                }
            },
            { 
                label: 'Settings',
                icon: 'pi pi-fw pi-cog',
                command:()=>{
                    router.push("/users/setting");
                }
            },
            { 
                label: 'Responsable',
                icon: 'pi pi-fw pi-user-edit',
                command:()=>{
                    router.push("/responsable");
                }
            },
            { 
                separator: true
            },
            { 
                label:'Log out',
                icon:'pi pi-sign-out',
                command:()=>{
                    logOut();
                }
            }
        ];

        
        const logOut=()=>{
            router.push("/users/login");
            setUser(null);
        }
        return(
            <div className={style.container}>
                <div className={style.navbar}>
                    <div className={style.nav_title}>
                        <Link href={"/users"}>
                            <Image width={100} height={106} src={"/images/logo-aftrip.png"} alt='logo'/>
                        </Link>
                    </div>
                    <div className={style.navbar_menu_container}>
                        <Link style={{textDecoration:"none"}} href={"/users"}>
                            <span className={style.navbar_menu_item}>Home</span>
                        </Link>
                        <Link style={{textDecoration:"none"}} href={"/users/accommodation"}>
                            <span className={style.navbar_menu_item}>Accommodation</span>
                        </Link>
                        <Link style={{textDecoration:"none"}} href={"/users/handcraft"}>
                            <span className={style.navbar_menu_item}>Handcraft</span>
                        </Link>
                        <Link style={{textDecoration:"none"}} href={"/users/tour"}>
                            <span className={style.navbar_menu_item}>Tour</span>
                        </Link>
                        <Link style={{textDecoration:"none"}} href={"/users/about"}>
                            <span className={style.navbar_menu_item}>About us</span>
                        </Link>
                    </div>

                    {
                        user==null && (
                            <div className={style.nav_right}>
                                <div className={style.button_group}>
                                    <button onClick={()=>router.push("/users/login")} className='button-secondary'>Login</button>
                                    <button onClick={()=>router.push("/users/register")} className='button-primary'>Register</button>
                                </div>
                            </div>
                        )
                    }
                    {
                        user!=null && (
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
                                        menuitem:{className:style.menu_item_container}
                                    }}
                                />
                            </>
                        )
                    }
                </div>
            </div>
        );
    }