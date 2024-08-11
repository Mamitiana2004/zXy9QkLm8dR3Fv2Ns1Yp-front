import Head from "next/head";
import { useRouter } from "next/router";
import style from './../../../../style/pages/responsable/accommodation/guest/id.module.css';
import Link from "next/link";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { useEffect, useState , useContext} from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ResponsableLayoutContext from "@/layouts/context/responsableLayoutContext";
import { getCsrfFromToken } from '@/util/csrf';
import UrlConfig from "@/util/config";

export default function DetailGuest() {
    const router = useRouter();
    const [guests, setGuests] = useState()
    const [nameHotel, setNameHotel] = useState(null); 
    const [bookingSummary, setBookingSamurry] = useState([]);
    const { user } = useContext(ResponsableLayoutContext);
    const { id } = router.query;


    const [bookingHistory, setBookingHistory] = useState([
        { id: 1, name: "Will Smith", email: "willsmith@gmail.com", nbr_guest: 1, room: "404", check_in: "07-07-2024", check_out: "08-07-2024" },
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"},
        { id: 1, name: "Will Smith", email: "willsmith@gmail.com", nbr_guest: 1, room: "404", check_in: "07-07-2024", check_out: "08-07-2024" }
    ]);

    useEffect(() => {
        if (user && id) {
           
            const id_hebergement = user.id_etablissement;

            // Mode debug
            console.log('User:', user);
            console.log('id_hebergement:', id_hebergement);
            console.log('client:', id);
            FetchDetails_Guest(id_hebergement, id);

           

        }
    }, [user,id]);

    function FetchDetails_Guest(id_hebergement) {
        getCsrfFromToken()
            .then(csrfToken => {
                fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/get-id-hebergement/${id_hebergement}/`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFTOKEN': csrfToken,
                    }
                })
                    .then(response => response.json())
                    .then(hotelData => {
                        setNameHotel(hotelData);
                    })
                    .catch(err => console.error('Erreur lors de la récupération du nom de l\'hôtel:', err));
                    
                // Fetch DetailGuest
                fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/client-reservations/${id}/hebergement/${id_hebergement}/`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFTOKEN': csrfToken,
                    }
                })
                    .then(response => response.json())
                    .then(GuestData => {
                        setGuests(GuestData);
                        setBookingSamurry(GuestData);
                        setBookingHistory(
                            GuestData.reservations.map(res => ({
                                id: res.client.id,
                                name: res.client.nom,
                                email: res.client.email,
                                nbr_guest: res.nombre_personnes_reserve,
                                room: res.chambre.nom,
                                check_in: new Date(res.date_debut_reserve).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }),
                                check_out: new Date(res.date_fin_reserve).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
                            }))
                        )
                    })
                    .catch(err => console.error('Erreur lors de la récupération des Clients de l\'hôtel:', err));

            })
            .catch(err => console.error('Erreur lors de la récupération du token CSRF:', err));   
    }

    return(
        <>
            <Head>
                <title>Detail Guest</title>
            </Head>

            <div className={style.top_container}>
                <div className={style.top_container_title_container}>
                    <span className={style.top_container_title}>Guest</span>
                    <span className={style.top_container_subtitle}>{nameHotel?.nom_hebergement || 'No Hotel Name'}</span>
                </div>
            </div>

            <div className={style.container}>
                <Link className={style.container_title_link} href={"/responsable/accommodation/guest"}>
                    <i className="pi pi-arrow-left"/>
                    <span>Back</span>
                </Link>
                <div className={style.card_container}>
                    <div className={style.guest_information_container}>
                        <div className={style.guest_information_left_container}>
                            <div className={style.image_guest_container}>
                                <Image src="/images/hotel/chambre.jpg" alt="chambre" imageClassName={style.image_guest_room}/>
                                <Button onClick={()=>router.push("/responsable/accommodation/room")} raised label="See all room" className="button-secondary"/>
                                <Button onClick={()=>router.push("/responsable/accommodation/guest")} raised label="See all guest" className="button-secondary"/>
                            </div>
                            <div className={style.guest_information}>
                                <div className={style.user_container}>
                                    <span className={style.username}>{guests?.reservations?.[0]?.client?.nom || 'No Client Name'}</span>
                                    <span className={style.user_id}>ID: {guests?.reservations?.[0]?.client?.id || 'No Client ID'}</span>
                                </div>

                                <div className={style.guest}>
                                    <div className={style.guest_detail_container}>
                                        <div className={style.guest_detail}>
                                            <span className={style.guest_detail_title}>Check-in</span>
                                            <span className={style.guest_detail_value}>{guests?.reservations?.[0]?.date_debut_reserve || 'No Check-in'}</span>
                                        </div>
                                        <div className={style.guest_detail}>
                                            <span className={style.guest_detail_title}>No. Guest</span>
                                            <span className={style.guest_detail_value}>{guests?.reservations?.[0]?.nombre_personnes_reserve || 'No Guest number'}</span>
                                        </div>
                                        <div className={style.guest_detail}>
                                            <span className={style.guest_detail_title}>Room name</span>
                                            <span className={style.guest_detail_value}>{guests?.reservations?.[0]?.chambre.nom }</span>
                                        </div>
                                    </div>
                                    <div className={style.guest_detail_container}>
                                        <div className={style.guest_detail}>
                                            <span className={style.guest_detail_title}>Check-out</span>
                                            <span className={style.guest_detail_value}>{guests?.reservations?.[0]?.date_fin_reserve || 'No Check-out'}</span>
                                        </div>
                                        <div className={style.guest_detail}>
                                            <span className={style.guest_detail_title}>Guest request</span>
                                            <span className={style.guest_detail_value}>{guests?.reservations?.[0]?.nombre_personnes_reserve || 'No Guest number'}</span>
                                        </div>
                                        {/* <div className={style.guest_detail}>
                                            <span className={style.guest_detail_title}>Room Type</span>
                                            <span className={style.guest_detail_value}>401</span>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={style.guest_information_right_container}>
                            <span className={style.guest_information_right_title}>Booking summary</span>
                            <div className={style.guest_information_right}>
                                <span className={style.guest_information_right_label}>
                                    <i className="pi pi-clock"/>
                                    Periode
                                </span>
                                <span className={style.guest_information_right_value}>{bookingSummary?.reservations?.[0].nombre_de_nuits || 'No number nights'} nights</span>
                            </div>
                            <div className={style.guest_information_right}>
                                <span className={style.guest_information_right_label}>
                                    <i className="pi pi-user"/>
                                    Guest
                                </span>
                                <span className={style.guest_information_right_value}>{bookingSummary?.reservations?.[0]?.nombre_personnes_reserve || 'No Guest number'}</span>
                            </div>
                            <div className={style.guest_information_right}>
                                <span className={style.guest_information_right_label}>
                                    <i className="pi pi-wallet"/>
                                    Price
                                </span>
                                <span className={style.guest_information_right_value}>$ {bookingSummary?.reservations?.[0]?.chambre.prix_par_nuit || 'No price'} / nights</span>
                            </div>
                            <div className={style.guest_information_right}>
                                <span className={style.guest_information_right_label}>
                                    <i className="pi pi-ticket"/>
                                    Discount
                                </span>
                                <span className={style.guest_information_right_value}>0</span>
                            </div>
                            <div className={style.separateur}></div>
                            
                            <div className={style.guest_information_right}>
                                <span className={style.guest_information_right_label}>
                                    Total
                                </span>
                                <span className={style.guest_information_right_value_active}>$ {bookingSummary?.reservations?.[0]?.prix_total_reserve || 'No price'}</span>
                            </div>
                        </div>
                    </div>
                    <div className={style.separateur}></div>
                    <h2>Booking history</h2>
                    <DataTable  value={bookingHistory}>
                        <Column sortable field="id" header="No"/>
                        <Column sortable field="name" header="Name"/>
                        <Column sortable field="email" header="Email"/>
                        <Column sortable field="nbr_guest" header="No. Guest"/>
                        <Column sortable field="room" header="Room"/>
                        <Column sortable field="check_in" header="Check in"/>
                        <Column sortable field="check_out" header="Check out"/>
                    </DataTable>
                </div>
            </div>
        </>
    )
}