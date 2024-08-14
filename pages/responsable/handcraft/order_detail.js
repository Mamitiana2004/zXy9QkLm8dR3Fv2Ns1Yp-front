import Head from "next/head";
import { useRouter } from "next/router";
import style from '../../../style/pages/responsable/handcraft/order_detail.module.css';
import { Avatar } from "primereact/avatar";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import UrlConfig from "@/util/config";

export default function OrderDetail() {

    const router = useRouter();
    const [orderDetails, setOrderDetails] = useState(null);
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            fetch(`${UrlConfig.apiBaseUrl}/api/artisanat/commande/${id}/`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error("Commande non trouvée");
                    }
                    return res.json();
                })
                .then(data => setOrderDetails(data))
                .catch(err => {
                    console.error("Erreur lors de la récupération de order Details", err);
                    setOrderDetails(null); // Assurez-vous que l'état est mis à jour en cas d'erreur
                });
        }
    }, [id]);

    if (orderDetails === null) {
        return (
            <>
                <Head>
                    <title>Order Detail</title>
                </Head>
                <div className={style.container}>
                    <span className={style.container_top}>Order detail</span>
                    <div className={style.card_container}>
                        <div className={style.card_body}>
                            <p>Aucune commande trouvée pour cet ID.</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    if (!orderDetails.items || orderDetails.items.length === 0) {
        return (
            <>
                <Head>
                    <title>Order Detail</title>
                </Head>
                <div className={style.container}>
                    <span className={style.container_top}>Order detail</span>
                    <div className={style.card_container}>
                        <div className={style.card_body}>
                            <p>Aucune commande trouvée pour cet ID.</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    const { client, items, prix_total, date_commande } = orderDetails;

    // Calculer le total pour chaque produit
    const calculateTotalPerItem = (price, quantity) => {
        return (parseFloat(price) * quantity).toFixed(2);
    };

    // Calculer le prix total global
    const totalGlobal = items.reduce((acc, item) => {
        return acc + parseFloat(calculateTotalPerItem(item.produit.prix_artisanat, item.quantite));
    }, 0).toFixed(2);

    return (
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
                    <span className={style.date_order}>{date_commande}</span>
                    <div className={style.card_body}>
                        {items.map((item, index) => {
                            const { produit, quantite } = item;
                            const totalPerItem = calculateTotalPerItem(produit.prix_artisanat, quantite);

                            return (
                                <div key={index} className={style.card_body_detail}>
                                    <div className={style.detail_container}>
                                        <Avatar icon="pi pi-shopping-bag" shape="circle" className={style.avatar_detail} />
                                        <div className={style.detail}>
                                            <span className={style.title}>Product info</span>
                                            <div className={style.detail_body}>
                                                <Image src={produit.images[0].image} imageClassName={style.image_product} alt={produit.nom_produit_artisanal} />
                                                <div className={style.detail_product}>
                                                    <div className={style.detail_product_top}>
                                                        <div className={style.left}>
                                                            <span className={style.product_name}>{produit.nom_produit_artisanal}</span>
                                                            <span>{produit.largeur} x {produit.hauteur} - {produit.poid_kg}kg</span>
                                                        </div>
                                                        <span className={style.product_price}>$ {produit.prix_artisanat}</span>
                                                    </div>
                                                    <div className={style.detail_product_bottom}>
                                                        <div className={style.left}>
                                                            <span><i className="pi pi-box"/> Stock : {produit.nb_produit_dispo}</span>
                                                            <span><i className="pi pi-clone"/> Material : {produit.specifications.join(', ')}</span>
                                                        </div>
                                                        <Button className={style.detail_button} label="Detail"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="separateur"></div>

                                </div>
                            );
                        })}
                        {/* <div className={style.detail_container}>
                            <Avatar icon="pi pi-user" shape="circle" className={style.avatar_detail} />
                            <div className={style.detail}>
                                <span className={style.title}>Customer info</span>
                                <div className={style.detail_customer}>
                                    <div className={style.left}>
                                        <span><i className="pi pi-user"/> {client.username}</span>
                                        <span><i className="pi pi-envelope"/> {client.email}</span>
                                        <span><i className="pi pi-users" /> { client.numero_client}</span>
                                    </div>
                                    <Button className={style.detail_button} label="Detail"/>
                                </div>
                            </div>
                        </div> */}
                        <div className={style.order_summary_container}>
                            <span className={style.title}>Order summary</span>
                            {items.map((item, index) => (
                                <div key={index} className={style.order_summary}>
                                    <span className={style.order_summary_label}>Product {index + 1}</span>
                                    <span className={style.order_summary_value}>Quantity: {item.quantite}</span>
                                    <span className={style.order_summary_value}>Total Price: $ {calculateTotalPerItem(item.produit.prix_artisanat, item.quantite)}</span>
                                </div>
                            ))}
                            <div className="separateur"></div>
                            <div className={style.order_summary}>
                                <span className={style.order_summary_total_label}>Total</span>
                                <span className={style.order_summary_total_value}>$ {totalGlobal}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
