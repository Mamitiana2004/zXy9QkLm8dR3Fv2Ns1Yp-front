import Head from "next/head";
import { useRouter } from "next/router";
import style from '../../../style/pages/responsable/handcraft/order_detail.module.css';
import { Avatar } from "primereact/avatar";
import { Image } from "primereact/image";
import { Button } from "primereact/button";

export default function OrderDetail() {

    const router= useRouter();
    const {id} = router.query;

    return(
        <>
            <Head>
                <title>Order Detail</title>
            </Head>
            
            <div className={style.top_container}>
                <div className={style.top_container_title_container}>
                    <span className={style.top_container_title}>Order</span>
                    <span className={style.top_container_subtitle}>Nom Artisanat</span>
                </div>
            </div>

            <div className={style.container}>
                <span className={style.container_top}>Order detail</span>
                <div className={style.card_container}>
                    <span className={style.order_id}>Order ID : {id}</span>
                    <span className={style.date_order}>Mon, Jul 12 2024</span>
                    <div className={style.card_body}>
                        <div className={style.card_body_detail}>
                            <div className={style.detail_container}>
                                <Avatar icon="pi pi-shopping-bag" shape="circle" className={style.avatar_detail}/>
                                <div className={style.detail}>
                                    <span className={style.title}>Product info</span>
                                    <div className={style.detail_body}>
                                        <Image src="/images/artisanat/artisanat.jpg" imageClassName={style.image_product} alt=""/>
                                        <div className={style.detail_product}>
                                            <div className={style.detail_product_top}>
                                                <div className={style.left}>
                                                    <span className={style.product_name}>Raffia bag</span>
                                                    <span>422cm x 318cm - 500g</span>
                                                </div>
                                                <span className={style.product_price}>$ 75</span>
                                            </div>
                                            <div className={style.detail_product_bottom}>
                                                <div className={style.left}>
                                                    <span><i className="pi pi-box"/> Stock :5</span>
                                                    <span><i className="pi pi-clone"/> Material : Raffia, rope</span>
                                                </div>
                                                <Button className={style.detail_button} label="Detail"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="separateur"></div>
                            <div className={style.detail_container}>
                                <Avatar icon="pi pi-user" shape="circle" className={style.avatar_detail}/>
                                <div className={style.detail}>
                                    <span className={style.title}>Customer info</span>
                                    <div className={style.detail_customer}>
                                        <div className={style.left}>
                                            <span><i className="pi pi-user"/> Paul Adams</span>
                                            <span><i className="pi pi-envelope"/> pauladams@gmail.com</span>
                                            <span><i className="pi pi-users"/> 2 travelers</span>
                                        </div>
                                        <Button className={style.detail_button} label="Detail"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={style.order_summary_container}>
                            <span className={style.title}>Order summary</span>
                            <div className={style.order_summary}>
                                <span className={style.order_summary_label}>Quantity</span>
                                <span className={style.order_summary_value}>2</span>
                            </div>
                            <div className={style.order_summary}>
                                <span className={style.order_summary_label}>Quantity</span>
                                <span className={style.order_summary_value}>2</span>
                            </div>
                            <div className={style.order_summary}>
                                <span className={style.order_summary_label}>Quantity</span>
                                <span className={style.order_summary_value}>2</span>
                            </div>
                            <div className={style.order_summary}>
                                <span className={style.order_summary_label}>Quantity</span>
                                <span className={style.order_summary_value}>2</span>
                            </div>
                            <div className="separateur"></div>
                            <div className={style.order_summary}>
                                <span className={style.order_summary_total_label}>Total</span>
                                <span className={style.order_summary_total_value}>2</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            
        </>
    )
}