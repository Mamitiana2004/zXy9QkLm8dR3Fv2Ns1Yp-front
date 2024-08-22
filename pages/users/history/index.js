import Head from "next/head";
import style from '@/style/pages/users/Cart.module.css';
import Link from "next/link";
import AppTopbar from "@/layouts/AppTopbar";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { useEffect, useState } from "react";
import UrlConfig from "@/util/config";
import { getNewAccess } from "@/util/Cookies";
import Cookies from "js-cookie";
import { Rating } from "@mui/material";
import { Tag } from "primereact/tag";
import { DataView } from "primereact/dataview";
import { classNames } from 'primereact/utils';
export default function Profile() {
    const [produits, setProduits] = useState([]);
    const [booking, setBooking] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [orderSummary, setOrderSummary] = useState({ total: 0, items: [] });

    const handleCheckboxChange = (product, isChecked) => {
        const updatedProducts = isChecked
            ? [...selectedProducts, product]
            : selectedProducts.filter((p) => p.id !== product.id);

        // console.log('Updated Products:', updatedProducts); 

        setSelectedProducts(updatedProducts);
        updateOrderSummary(updatedProducts);
    };
    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };




    useEffect(() => {
        const fetchData = () => {
            let access = Cookies.get('accessToken');

            if (!access) {
                getNewAccess()
                    .then(() => {
                        access = Cookies.get('accessToken');
                        if (!access) {
                            console.error('No access token available');
                            return;
                        }
                        return fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/client/reservations/`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${access}`,
                            },
                        });
                    })
                    .then((response) => {
                        if (!response.ok) {
                            return response.json().then((errorData) => {
                                throw new Error(errorData.error || 'Error fetching cart data.');
                            });
                        }
                        return response.json();
                    })
                    .then((data) => {

                        console.log(data);
                        setBooking(data);
                        setProduits(data.produits || []);
                    })
                    .catch((error) => {
                        console.error('Error fetching cart data:', error);
                    });
            } else {
                fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/client/reservations/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${access}`,
                    },
                })
                    .then((response) => {
                        if (!response.ok) {
                            return response.json().then((errorData) => {
                                throw new Error(errorData.error || 'Error fetching cart data.');
                            });
                        }
                        return response.json();
                    })
                    .then((data) => {
                        console.log(data);
                        setBooking(data);

                        setProduits(data.produits || []);
                    })
                    .catch((error) => {
                        console.error('Error fetching cart data:', error);
                    });
            }
        };

        fetchData();
    }, []);

    const itemTemplate = (product, index) => {
        console.log(product);
        return (
            <div key={product.id}>
                <div className={style.productCardLarge}>
                    <Image
                        imageClassName={style.product_image}
                        width={200}
                        src={`${product.chambre_reserve.images_chambre[0] ? UrlConfig.apiBaseUrl + product.chambre_reserve.images_chambre[0].images : "/images/artisanat/aucun_image.jpeg"}`}
                        alt={product.name} />
                    <div className={style.product_card}>
                        <div className={style.right_items}>
                            <Tag value={`${product.date_debut_reserve} - ${product.date_fin_reserve}`} severity={getSeverity(product)}></Tag>

                        </div>
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">Reservation chambre {product.chambre_reserve.chambre.type_chambre}</div>
                            <div className="text-2xl font-bold text-900"><b>à {product.hebergement.nom_hebergement}</b></div>
                            <Rating value={product.hebergement.nombre_etoile_hebergement} readOnly cancel={false}></Rating>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{product.chambre_reserve.chambre.type_chambre}</span>
                                </span>
                                {/* <Tag value={`${product.date_debut_reserve} - ${product.date_fin_reserve}`} severity={getSeverity(product)}></Tag> */}
                            </div>
                        </div>
                        <div className={style.right_items}>

                            <span className="text-2xl font-semibold">${product.prix_total_reserve}</span>
                            <Button icon="pi pi-info" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const listTemplate = (items) => {
        if (!items || items.length === 0) return null;

        let list = items.map((product, index) => {
            return itemTemplate(product, index);
        });

        return <div className="grid grid-nogutter">{list}</div>;
    };

    return (
        <div className={style.container}>
            <div className={style.menu_container}>
                <Link style={{ textDecoration: "none" }} href={"/users/profil"}>
                    <span className={style.menu_item}><i className="pi pi-user" /> Profil</span>
                </Link>
                <Link style={{ textDecoration: "none" }} href={"/users/cart"}>
                    <span className={style.menu_item}><i className="pi pi-shopping-cart" /> Cart</span>
                </Link>
                <Link style={{ textDecoration: "none" }} href={"/users/history"}>
                    <span className={style.menu_active}><i className="pi pi-clock" /> History</span>
                </Link>
                <Link style={{ textDecoration: "none" }} href={"/users/notifications"}>
                    <span className={style.menu_item}><i className="pi pi-bell" /> Notification</span>
                </Link>
                <Link style={{ textDecoration: "none" }} href={"/users/security"}>
                    <span className={style.menu_item}><i className="pi pi-shield" /> Security</span>
                </Link>
                <Link style={{ textDecoration: "none" }} href={"/users/settings"}>
                    <span className={style.menu_item}><i className="pi pi-cog" /> Setting</span>
                </Link>
                <Link style={{ textDecoration: "none" }} href={"/users/login"}>
                    <span className={style.menu_item}><i className="pi pi-sign-out" /> Log out</span>
                </Link>
            </div>

            <div className={style.profil_container}>
                <Link href={"/users"} className={style.back}><i className="pi pi-arrow-left" /> Back</Link>
                {/* <div className={style.cart_container}> */}

                {/* <div className={style.cart_top_container}>
                        <span>My History</span>
                    </div>
                    <div className={style.separateur}></div> */}
                <div className={style.booking}>
                    <DataView value={booking} listTemplate={listTemplate} paginator rows={5} />
                </div>



                {/* </div> */}
            </div>
        </div>
    );

}

Profile.getLayout = function getLayout(page) {
    return (
        <>
            <Head>
                <title>User profile</title>
            </Head>
            <AppTopbar />
            {page}
        </>
    );
}
