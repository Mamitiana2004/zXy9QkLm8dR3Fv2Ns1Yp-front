import Head from "next/head";
import style from '@/style/pages/responsable/accommodation/booking.module.css';
import { Button } from "primereact/button";
import RoomPlanning from "@/components/Planning";
import { useEffect, useState, useContext } from "react";
import UrlConfig from "@/util/config";
import { useRouter } from 'next/router';
import ResponsableLayoutContext from "@/layouts/context/responsableLayoutContext";
import { custom_login, getCsrfTokenDirect } from '@/util/csrf';

export default function Booking() {
    const [book, setBook] = useState([]);
    const { user } = useContext(ResponsableLayoutContext);
    const id = user ? user.id_hebergement : 0;

    const [rooms, setRooms] = useState([
        { id: 1, title: "Room 401" },
        { id: 2, title: "Room 402" },
        { id: 3, title: "Room 403" },
        { id: 4, title: "Room 404" },
        { id: 5, title: "Room 405" },
        { id: 6, title: "Room 406" },
        { id: 7, title: "Room 407" },
        { id: 8, title: "Room 408" }
    ]);


    useEffect(() => {
        if (!id) return; // Ensure the ID is available before making the request

        getCsrfTokenDirect().then((csrfToken) => {
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
