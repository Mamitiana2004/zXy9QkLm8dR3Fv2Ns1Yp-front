import Head from "next/head";
import style from './../../../style/pages/responsable/accommodation/room.module.css';
import { Button } from "primereact/button";
import { useState, useEffect, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { confirmPopup, ConfirmPopup } from "primereact/confirmpopup";
import { useRouter } from "next/router";
import { UrlConfig } from "@/util/config";
import ResponsableLayoutContext from "@/layouts/context/responsableLayoutContext";

export default function Room() {
    const router = useRouter();
    const { user } = useContext(ResponsableLayoutContext);
    const [booking, setBooking] = useState([]);
    const id = user.id_etablissement;

    // Recuperer tous les listes des Chambres 
    useEffect(() => {
        if (id) {
            fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/${id}/chambres/`)
                .then(res => res.json())
                .then(data => setBooking(data))
                .catch(error => console.error("Error fetching data:", error));
        }
    }, [id]);

    // Suprimer une chambre
    const deleteRoom = (id_chambre) => {
        fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/delete-hebergement-chambre/${id_chambre}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${user.token}`
                // 'Authorization': `Bearer ${user.token}`
            }
        })
            .then(response => {
                if (response.ok) {
                    setBooking(booking.filter(room => room.id !== id_chambre));
                }
            })
            .catch(error => console.error('Error deleting room:', error));
    }

    const buttonTemplate = (item) => {
        return (
            <>
                <Button icon="pi pi-pen-to-square" onClick={(e) => router.push(`/responsable/accommodation/room-edit/${item.id}`)} text severity="success" />
                <Button onClick={(e) => confirm(e, item.id)} icon="pi pi-trash" text severity="danger" />
            </>
        );
    }

    const confirm = (event, id_chambre) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Do you want to delete this item?',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: () => deleteRoom(id_chambre)
        });
    };

    const availableTemplate = (item) => {
        if (item.available) {
            return (
                <>
                    <span><i className="pi pi-check" /> available</span>
                </>
            )
        }
        else {
            return (
                <>
                    <span><i className="pi pi-times" /> available</span>
                </>
            )
        }
    }

    const accept = () => {

        const status = [
            { id: 1, name: 'Available' },
            { id: 2, name: 'Not Available' }
        ];
        const statusTemplate = (rowData) => {
            // Trouver l'objet statut correspondant à l'id du statut
            const statusObj = status.find(s => s.id === rowData.status);
            return statusObj ? statusObj.name : 'Unknown';
        }

        return (
            <>
                <Head>
                    <title>Room</title>
                </Head>

                <div className={style.top_container}>
                    <div className={style.top_container_title_container}>
                        <span className={style.top_container_title}>Room</span>
                        <span className={style.top_container_subtitle}>Brajas Hotel</span>
                    </div>
                    <Button onClick={() => router.push("/responsable/accommodation/addNewRoom")} label="+ Add new room" className={style.button_add} />
                </div>

                <div className={style.container}>
                    <span className={style.container_title}>All room</span>
                    <div className={style.table_container}>
                        <DataTable paginator rows={5} value={booking}>
                            <Column sortable field="id" header="No" />
                            <Column sortable field="nom_chambre" header="Name" />
                            <Column sortable field="chambre.type_chambre" header="Type" />
                            <Column sortable field="chambre.nombre_max_personnes" header="Guests" />
                            <Column field="status" header="Availability" body={statusTemplate} />
                            <Column sortable field="prix_nuit_chambre" header="Price" />
                            <Column header="Action" body={buttonTemplate} />
                        </DataTable>
                    </div>
                </div>

                <ConfirmPopup />
            </>
        );
    }
}
