import Head from "next/head";
import { useRouter } from "next/router";
import style from './../../../style/pages/responsable/handcraft/customer.module.css';
import { Button } from "primereact/button";
import { useState, useEffect, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Avatar } from "primereact/avatar";
import UrlConfig from "@/util/config";
import ResponsableLayoutContext from "@/layouts/context/responsableLayoutContext";
import { getCsrfFromToken } from '@/util/csrf';

export default function Customer() {

    const router = useRouter();

    const [visible, setVisible] = useState(false);
    const [customer, setCustomer] = useState(null);
    const [customers, setCustomers] = useState([]);

    const { user } = useContext(ResponsableLayoutContext);

    useEffect(() => {
        if (user) {
            const id_customers = user.id_etablissement;
            console.log(user);
            FetchCustomer(id_customers);
        }
    }, [user]);


    function FetchCustomer(id_customers) {
        getCsrfFromToken()
            .then(csrfToken => {
                // Fetch Custpemers details
                fetch(`${UrlConfig.apiBaseUrl}/api/artisanat/${id_customers}/clients/`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFTOKEN': csrfToken,
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        const mappedCustomers = data.map((client) => ({
                            id: client.id,
                            name: client.username,
                            email: client.email,
                            phone: client.numero_client,
                            total_price: client.commandes.reduce((total, commande) => {
                                return total + commande.panier.reduce((subTotal, item) => {
                                    return subTotal + (item.produit.prix_artisanat * item.quantite);
                                }, 0);
                            }, 0),
                        }));

                        setCustomers(mappedCustomers);
                    })
                    .catch(err => console.error('Erreur lors de la récupération des Liste des Customers:', err));
            })
            .catch(err => console.error('Erreur lors de la récupération du token CSRF:', err));
    }

    const afficheDetail = (item) => {
        setCustomer(item);
        setVisible(true);
    };

    const buttonTemplate = (item) => {
        return (
            <>
                <Button onClick={() => afficheDetail(item)} icon="pi pi-eye" text />
                <Button onClick={() => router.push("/responsable/handcraft/message")} icon="pi pi-comment" text />
            </>
        );
    };

    return (
        <>
            <Head>
                <title>Customer</title>
            </Head>

            <div className={style.top_container}>
                <div className={style.top_container_title_container}>
                    <span className={style.top_container_title}>Customer</span>
                    <span className={style.top_container_subtitle}>Nom artisanat</span>
                </div>
            </div>

            <div className={style.container}>
                <span className={style.container_title}>All customers</span>
                <div className={style.table_container}>
                    <DataTable paginator rows={5} value={customers}>
                        <Column sortable field="id" header="No" />
                        <Column sortable field="name" header="Name" />
                        <Column sortable field="email" header="Email" />
                        {/* <Column sortable field="phone" header="Phone number" /> */}
                        <Column sortable field="total_price" header="Total Price" />
                        <Column body={buttonTemplate} header="Actions" />
                    </DataTable>
                </div>
            </div>

            {customer && (
                <Dialog draggable={false} header="Customer details" visible={visible} onHide={() => setVisible(false)}>
                    <div className={style.dialog_container}>
                        <Avatar label={customer.name.charAt(0)} shape="circle" className={style.avatar_customer} />
                        <div className={style.detail_customer_container}>
                            <div className={style.detail_customer}>
                                <span className={style.title}>Personal Information</span>
                                <div className={style.detail_container}>
                                    <div className={style.detail}>
                                        <span className={style.detail_title}>Name</span>
                                        <span className={style.detail_label}>{customer.name}</span>
                                    </div>
                                    <div className={style.detail}>
                                        <span className={style.detail_title}>Email</span>
                                        <span className={style.detail_label}>{customer.email}</span>
                                    </div>
                                    {/* <div className={style.detail}>
                                        <span className={style.detail_title}>Phone</span>
                                        <span className={style.detail_label}>{customer.phone}</span>
                                    </div> */}
                                </div>
                            </div>
                            <div className={style.detail_customer}>
                                <span className={style.title}>Order Information</span>
                                <div className={style.detail_container}>
                                    <div className={style.detail}>
                                        <span className={style.detail_title}>Total Price</span>
                                        <span className={style.detail_label}>{customer.total_price} $ </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog>
            )}
        </>
    );
}
