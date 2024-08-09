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
    const [name_hotel, setName_hotel] = useState(null);
    const { user } = useContext(ResponsableLayoutContext);
    const id = user ? user.id_hebergement : 1; // Set to null if the user is not available

    useEffect(() => {
        if (!id) return;

        // Fetch CSRF token and data simultaneously
        const fetchData = async () => {
            try {
                const csrfToken = await getCsrfTokenDirect();

                // Fetch booking data
                const bookingResponse = await fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/reservations/${id}/`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFTOKEN': csrfToken,
                    }
                });
                const bookingData = await bookingResponse.json();
                const mappedData = bookingData.map(item => ({
                    title: item.client_reserve.username,
                    nuit: null, // Adjust or remove these if not needed
                    jour: null, // Adjust or remove these if not needed
                    start: item.date_debut_reserve,
                    end: item.date_fin_reserve,
                    resourceId: item.chambre_reserve
                }));
                setBook(mappedData);

                // Fetch room data
                const roomsResponse = await fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/${id}/chambres/`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFTOKEN': csrfToken,
                    }
                });
                const roomsData = await roomsResponse.json();
                const mappedRooms = roomsData.map(room => ({
                    id: room.id,
                    title: room.nom_chambre
                }));
                setRooms(mappedRooms);

                // Fetch hotel name
                const hotelResponse = await fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/get-id-hebergement/${id}/`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFTOKEN': csrfToken,
                    }
                });
                const hotelData = await hotelResponse.json();
                setName_hotel(hotelData);

            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <>
            <Head>
                <title>Booking</title>
            </Head>
            <div className={style.top_container}>
                <div className={style.top_container_title_container}>
                    <span className={style.top_container_title}>Booking</span>
                    <span className={style.top_container_subtitle}>{name_hotel?.nom_hebergement || 'No Hotel Name'}</span>
                </div>
            </div>

            <div className={style.container}>
                <RoomPlanning events={book} rooms={rooms} />
            </div>
        </>
    );
}
