import Head from "next/head";
import style from '@/style/pages/users/Cart.module.css';
import Link from "next/link";
import AppTopbar from "@/layouts/AppTopbar";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
export default function Profile() {



  
    return(
        <div className={style.container}>
            <div className={style.menu_container}>
                <Link style={{textDecoration:"none"}} href={"/users/profil"}>
                    <span className={style.menu_item}><i className="pi pi-user"/> Profil</span>
                </Link>
                <Link style={{textDecoration:"none"}} href={"/users/cart"}>
                    <span className={style.menu_active}><i className="pi pi-shopping-cart"/> Cart</span>
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
                <div className={style.cart_container}>
                    <div className={style.cart}>
                        <div className={style.cart_top_container}>
                            <span>My Cart</span>
                        </div>
                        <div className={style.separateur}></div>
                        <div className={style.productCard}>
                            <input type="checkbox"/>
                            <Image src="/images/artisanat/artisanat.jpg" imageClassName={style.product_image}/>
                            <div className={style.product_card}>
                                <div className={style.product_card_top_container}>
                                    <span className={style.nom_product}>Raffia Bag</span>
                                    <span className={style.price}>$75</span>
                                </div>
                                <span className={style.company}>Tik Art</span>
                                <span className={style.map}><i style={{fontSize:"14px"}} className="pi pi-map-marker"/>Antananarivo</span>
                                <span/>
                                <span className={style.description}>
                                    sdjqslkdjqlkdjqskldjqkldqkldjqskdjqskldqlkd
                                    sdjqslkdjqlkdjqskldjqkldqkldjqskdjqskldqlkd
                                    sdjqslkdjqlkdjqskldjqkldqkldjqskdjqskldqlkd
                                    sdjqslkdjqlkdjqskldjqkldqkldjqskdjqskldqlkd
                                </span>
                                <span/>
                                <span className={style.quantity}>Quantity : 2</span>
                            </div>
                        </div>
                        <div className={style.productCard}>
                            <input type="checkbox"/>
                            <Image src="/images/artisanat/artisanat.jpg" imageClassName={style.product_image}/>
                            <div className={style.product_card}>
                                <div className={style.product_card_top_container}>
                                    <span className={style.nom_product}>Raffia Bag</span>
                                    <span className={style.price}>$75</span>
                                </div>
                                <span className={style.company}>Tik Art</span>
                                <span className={style.map}><i style={{fontSize:"14px"}} className="pi pi-map-marker"/>Antananarivo</span>
                                <span/>
                                <span className={style.description}>
                                    sdjqslkdjqlkdjqskldjqkldqkldjqskdjqskldqlkd
                                    sdjqslkdjqlkdjqskldjqkldqkldjqskdjqskldqlkd
                                    sdjqslkdjqlkdjqskldjqkldqkldjqskdjqskldqlkd
                                    sdjqslkdjqlkdjqskldjqkldqkldjqskdjqskldqlkd
                                </span>
                                <span/>
                                <span className={style.quantity}>Quantity : 2</span>
                            </div>
                        </div>
                        <div className={style.paiement_container}>
                            <div className={style.body_title_container}>
                                <span className={style.body_title_numero}>1</span>
                                <span className={style.body_title_label}>Personal detail</span>
                            </div>
                            <div className={style.form_group_container}>
                                    <div className={style.form_group_input}>
                                        <span className={style.form_label}>Firstname</span>
                                        <input 
                                            type="text" 
                                            className={style.form_input} 
                                            placeholder="Enter your firstname"
                                        />
                                    </div>
                                    <div className={style.form_group_input}>
                                        <span className={style.form_label}>Lastname</span>
                                        <input 
                                            type="text" 
                                            className={style.form_input} 
                                            placeholder="Enter your lastname"
                                        />
                                    </div>
                                    <div className={style.form_group_input}>
                                        <span className={style.form_label}>Region</span>
                                        <select className={style.form_select_green}>
                                            <option style={{color:"#c3c3c3"}}>Enter your region</option>
                                            <option>Antananarivo</option>
                                        </select>
                                        <span className={style.form_icon}>
                                            <i style={{fontSize:"20px"}} className='pi pi-map-marker'/>
                                        </span>
                                    </div>
                                    <div className={style.form_group_input}>
                                        <span className={style.form_label}>Phone</span>
                                        <div className={style.input_tel_container}>
                                            <select className={style.form_select_green_mini}>
                                                <option style={{color:"#c3c3c3"}}>+261</option>
                                                <option>+33</option>
                                            </select>
                                            <input className={style.form_input_green} type='text'/>
                                        </div>
                                    </div>
                            </div>
                            <div className={style.body_title_container}>
                                <span className={style.body_title_numero}>2</span>
                                <span className={style.body_title_label}>Payement method</span>
                            </div>
                        </div>
                    </div>
                    <div className={style.order_summary}>
                        <span className={style.order_summary_title}>Order summary</span>
                        <div className={style.order_summary_detail}>
                            <span>2x Raffia Bag</span>
                            <span className={style.price}>$25</span>
                        </div>
                        <div className={style.order_summary_detail}>
                            <span>2x Raffia Bag</span>
                            <span className={style.price}>$25</span>
                        </div>
                        <div className={style.separateur}></div>
                        <div className={style.order_summary_detail}>
                            <span className={style.order_summary_detail_total}>Total</span>
                            <span className={style.price}>$25</span>
                        </div>
                        <Button className="button-primary" label="Check out"/>
                    </div>
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