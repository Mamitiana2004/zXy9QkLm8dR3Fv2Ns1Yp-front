import Head from "next/head";
import style from '@/style/pages/responsable/handcraft/order.module.css';
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import ResponsableLayoutContext from "@/layouts/context/responsableLayoutContext";
import UrlConfig from "@/util/config";
import { getCsrfFromToken } from "@/util/csrf";

export default function Order() {

    const router = useRouter();

    const [booking, setBooking] = useState([]);

    const statusTemplate = (item) => {
        return (
            <span>
                <i className={`pi ${item.status === "completed" ? "pi-check-circle" : "pi-clock"}`} />
                {item.status}
            </span>
        );
    }

    const buttonTemplate = (item) => {
    return (
        <>
            <Button onClick={() => router.push(`/responsable/handcraft/order_detail?id=${item.id}`)} icon="pi pi-eye" text />
        </>
    );
};


    const actionTemplate = (item) => {
    return (
            <Button onClick={() => afficheDetail(item)} icon="pi pi-eye" text />
        );
    };

    const afficheDetail = (item) => {
        // Ensure that item.id is a plain number or string without any special characters
        const id = item.id.toString().replace('#', '');
        const url = new URLSearchParams({ id });
        router.push(`/responsable/handcraft/order_detail?${url.toString()}`);
    };



    // Début intégration Orders ( Commandes )
    const { user } = useContext(ResponsableLayoutContext);

    useEffect(() => {
        if (user) {
            const id_client = user.id_etablissement;
            console.log(user);

            FetchList_Orders(id_client);
        }
    }, [user]);

    // Fonction pour retourner le statut en fonction de `statut_commande`
    const getStatus = (statut_commande) => {
        return statut_commande ? " Deliver" : " Pending";
    };

    function FetchList_Orders(id_client) {
        getCsrfFromToken()
            .then(csrfToken => {
                // Fetch List Client
                fetch(`${UrlConfig.apiBaseUrl}/api/artisanat/${id_client}/commandes/`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFTOKEN': csrfToken,
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        const formattedData = data.map((item, index) => {
                            return item.commandes.map((commande) => {
                                const totalAmount = commande.quantite * parseFloat(item.prix_artisanat);
                                return {
                                    id: `#${index + 1}`,
                                    name: commande?.client?.nom || 'No Client Name',
                                    email: commande.client.email || 'No Email client ',
                                    product: item.nom_produit_artisanal || 'No Product Name ',
                                    amount: `$${totalAmount.toFixed(2)}` || 'No Total Count',
                                    quantity: commande.quantite || 'No Quantite',
                                    date: commande.date_commande || new Date().toLocaleDateString(),
                                    status: getStatus(commande.statut_commande)
                                };
                            });
                        }).flat();
                        setBooking(formattedData);
                    })
                    .catch(err => console.error('Erreur lors de la récupération des Liste des Customers:', err));
            })
            .catch(err => console.error('Erreur lors de la récupération du token CSRF:', err));
    }

    return (
        <>
            <Head>
                <title>Order</title>
            </Head>

            <div className={style.top_container}>
                <div className={style.top_container_title_container}>
                    <span className={style.top_container_title}>Order</span>
                    <span className={style.top_container_subtitle}>Nom Artisanat</span>
                </div>
            </div>

            <div className={style.container}>
                <span className={style.container_title}>All order</span>
                <div className={style.table_container}>
                    <DataTable value={booking}>
                        <Column sortable field="id" header="No" />
                        <Column sortable field="name" header="Name" />
                        <Column sortable field="email" header="Email" />
                        <Column sortable field="product" header="Product" />
                        <Column sortable field="amount" header="Amount" />
                        <Column sortable field="quantity" header="Quantity" />
                        <Column sortable field="date" header="Date" />
                        <Column sortable body={statusTemplate} header="Status" />
                        <Column sortable body={actionTemplate} header="Action" />
                    </DataTable>
                </div>
            </div>
        </>
    );
}
