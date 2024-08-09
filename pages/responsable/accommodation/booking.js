import Head from "next/head";
import style from '@/style/pages/responsable/accommodation/booking.module.css';
import { useState, useEffect, useContext } from "react";
import RoomPlanning from "@/components/Planning";
import UrlConfig from "@/util/config";
import ResponsableLayoutContext from "@/layouts/context/responsableLayoutContext";
import { getCsrfTokenDirect } from '@/util/csrf';

export default function Booking() {
    const [book, setBook] = useState([]);
    const [rooms, setRooms] = useState([]);
    const { user } = useContext(ResponsableLayoutContext);
    const id = user ? user.id_hebergement : 1;

    useEffect(() => {
        if (!id) return; // Ensure the ID is available before making the request

        getCsrfTokenDirect().then((csrfToken) => {
            // Fetch booking data
            fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/reservations/${id}/`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFTOKEN': csrfToken,
                }
            })
                .then(response => response.json())
                .then(data => {
                    const mappedData = data.map(item => ({
                        title: item.client_reserve.username,
                        nuit: null,
                        jour: null,
                        start: item.date_debut_reserve,
                        end: item.date_fin_reserve,
                        resourceId: item.chambre_reserve
                    }));
                    setBook(mappedData);
                })
                .catch(err => console.log(err));

            // Fetch room data
            fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/${id}/chambres/`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFTOKEN': csrfToken,
                }
            })
                .then(response => response.json())
                .then(data => {
                    const mappedRooms = data.map(room => ({
                        id: room.id,
                        title: room.nom_chambre
                    }));
                    setRooms(mappedRooms);
                })
                .catch(err => console.log(err));
        });
    }, [id]);

    return (
        <>
            <Head>
                <title>Booking</title>
            </Head>
            <div className={style.top_container}>
                <div className={style.top_container_title_container}>
                    <span className={style.top_container_title}>Booking</span>
                    <span className={style.top_container_subtitle}>Carlton Hotel</span>
                </div>
            </div>

            <div className={style.container}>
                <RoomPlanning events={book} rooms={rooms} />
            </div>
        </>
    );
}
