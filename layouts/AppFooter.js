import style from '@/style/layouts/AppFooter.module.css';
import Image from 'next/image';
import Link from 'next/link';
export default function AppFooter() {
    return(
        <div className={style.container}>
            <div className={style.footer}>
                <div className={style.about}>
                    <div className={style.about_aftrip}>
                        <Link href={"/users"}>
                            <Image src={"/images/logo-aftrip.png"} alt='Logo' width={100} height={106}/>
                        </Link>
                        <span className={style.about_aftrip_label}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus corporis sed expedita
                        </span>
                    </div>
                    <div className={style.about_menu}>
                        <span className={style.about_menu_title}>Links</span>
                        <div className={style.about_menu_item_container}>
                            <Link style={{textDecoration:"none"}} href={"/users"}>
                                <span className={style.about_menu_item}>Home</span>
                            </Link>
                            <Link style={{textDecoration:"none"}} href={"/users/accommodation"}>
                                <span className={style.about_menu_item}>Accommodation</span>
                            </Link>
                            <Link style={{textDecoration:"none"}} href={"/users/handcraft"}>
                                <span className={style.about_menu_item}>Handcraft</span>
                            </Link>
                            <Link style={{textDecoration:"none"}} href={"/users/tour"}>
                                <span className={style.about_menu_item}>Tour</span>
                            </Link>
                            <Link style={{textDecoration:"none"}} href={"/users/about"}>
                                <span className={style.about_menu_item}>About us</span>
                            </Link>
                        </div>
                    </div>
                    <div className={style.about_menu}>
                        <span className={style.about_menu_title}>Support</span>
                        <div className={style.about_menu_item_container}>
                            <Link style={{textDecoration:"none"}} href={"/users"}>
                                <span className={style.about_menu_item}>FAQs</span>
                            </Link>
                            <Link style={{textDecoration:"none"}} href={"/users"}>
                                <span className={style.about_menu_item}>Terms & Services</span>
                            </Link>
                            <Link style={{textDecoration:"none"}} href={"/users"}>
                                <span className={style.about_menu_item}>Privacy Policy</span>
                            </Link>
                        </div>
                    </div>
                    <div className={style.about_info}>
                        <span className={style.about_info_title}>Information</span>
                        <div className={style.about_info_item_container}>
                            <Link style={{textDecoration:"none"}} href={"/users"}>
                                <div className={style.about_info_item}>
                                    <Image src={"/images/footer/location.svg"} alt='location_icon' width={19} height={19}/> 
                                    <span>23 Baker Street, UK</span>
                                </div>
                            </Link>
                            <Link style={{textDecoration:"none"}} href={"/users"}>
                                <div className={style.about_info_item}>
                                    <Image src={"/images/footer/phone.svg"} alt='location_icon' width={17} height={17}/> 
                                    <span>+261 34 56 789 90</span>
                                </div>
                            </Link>
                            <Link style={{textDecoration:"none"}} href={"/users"}>
                                <div className={style.about_info_item}>
                                    <Image src={"/images/footer/mail.svg"} alt='location_icon' width={14} height={14}/> 
                                    <span>support@gmail.com</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className={style.about_info}>
                        <span className={style.about_info_title}>Information</span>
                        <div className={style.about_info_item_container}>
                            <Link style={{textDecoration:"none"}} href={"/users"}>
                                <div className={style.about_info_item}>
                                    <Image src={"/images/footer/facebook.svg"} alt='location_icon' width={19} height={19}/> 
                                    <span>Facebook</span>
                                </div>
                            </Link>
                            <Link style={{textDecoration:"none"}} href={"/users"}>
                                <div className={style.about_info_item}>
                                    <Image src={"/images/footer/instagram.svg"} alt='location_icon' width={20} height={20}/> 
                                    <span>Instagram</span>
                                </div>
                            </Link>
                            <Link style={{textDecoration:"none"}} href={"/users"}>
                                <div className={style.about_info_item}>
                                    <Image src={"/images/footer/twitter.svg"} alt='location_icon' width={20} height={20}/> 
                                    <span>Twitter</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                <span className={style.copyright}>Copyright 2024 - All rights reserved</span>
            </div> 
        </div>
    );
}