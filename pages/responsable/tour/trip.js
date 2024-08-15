import Head from "next/head";
import style from './../../../style/pages/responsable/tour/trip.module.css'
import { Button } from "primereact/button";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import TourCard from "@/components/responsable/TourCard";
import { Dialog } from "primereact/dialog";
import { Avatar } from "primereact/avatar";
import { Image } from "primereact/image";
import ResponsableLayoutContext from "@/layouts/context/responsableLayoutContext";
import UrlConfig from "@/util/config";

export default function Trip() {

    const router = useRouter();
    const [category, setCategory] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [allVoyages, setAllVoyages] = useState([]);
    const { user } = useContext(ResponsableLayoutContext);
    const [totalTravelers, setTotalTravelers] = useState(0); 

    const [visible, setVisible] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    useEffect(() => {
        if (user) {
            const id_tour = user.id_etablissement;
            fetch(`${UrlConfig.apiBaseUrl}/api/tour/${id_tour}/voyages/`)
                .then(res => res.json())
                .then(data => {
                    setAllVoyages(data);
                    if (data.length > 0) {
                        const firstVoyage = data[0];
                        setBookings(firstVoyage.reservations || []);
                        setCategory(firstVoyage.id);
                        calculateTotalTravelers(firstVoyage.reservations || []);
                    }
                })
                .catch(error => console.log(error));
        }
    }, [user]);

    const changeTrip = (voyageId) => {
        setCategory(voyageId);
        const selectedVoyage = allVoyages.find(v => v.id === voyageId);
        const reservations = selectedVoyage?.reservations || [];
        setBookings(reservations);
        calculateTotalTravelers(reservations);
    };

    const calculateTotalTravelers = (reservations) => {
        const total = reservations.reduce((sum, reservation) => sum + reservation.nombre_voyageurs, 0);
        setTotalTravelers(total);
    };

    const showCustomerDetails = (customer) => {
        setSelectedCustomer(customer);
        setVisible(true);
    };

    return(
        <>
            <Head>
                <title>Trip</title>
            </Head>

            <div className={style.top_container}>
                <div className={style.top_container_title_container}>
                    <span className={style.top_container_title}>Trip</span>
                    <span className={style.top_container_subtitle}>Carlton Hotel</span>
                </div>
                <Button onClick={()=>router.push("/responsable/tour/addTrip")} label="+ Add new trip" className={style.button_add}/>
            </div>

            <div className={style.container}>
                <div className={style.category_container}>
                    {allVoyages.map((voyage) => (
                        <TourCard 
                            key={voyage.id} 
                            nom_voyage={voyage.nom_voyage} 
                            onClick={() => changeTrip(voyage.id)}
                            selected={category === voyage.id}
                        />
                    ))}
                </div>
                <div className={style.detail_container}>
                    <span className={style.title}>The wonders of madagascar</span>
                    <div className={style.detail}>
                        <div className={style.image_container}>
                            <Image src="/images/tours/aventure.png" alt="" imageClassName={style.image}/>
                            <Image src="/images/tours/discovery.png" alt="" imageClassName={style.image}/>
                            <Image src="/images/tours/culture.png" alt="" imageClassName={style.image}/>
                        </div>
                        <Button icon="pi pi-pencil" label="Edit" className={style.button_modif}/>
                    </div>
                    <div className="separateur"></div>
                    <div className={style.detail}>
                        <div className={style.detail_content}>
                            <span className={style.title}>Trip information</span>
                            <div className={style.wrapper}>
                                <div className={style.detail_value}>
                                    <span>Name</span>
                                    <span className={style.value}>The wonders of madagascar</span>
                                </div>
                                <div className={style.detail_value}>
                                    <span>Check-in</span>
                                    <span className={style.value}>The wonders of madagascar</span>
                                </div>
                                <div className={style.detail_value}>
                                    <span>Check-out</span>
                                    <span className={style.value}>The wonders of madagascar</span>
                                </div>
                                <div className={style.detail_value}>
                                    <span>Départure</span>
                                    <span className={style.value}>The wonders of madagascar</span>
                                </div>
                                <div className={style.detail_value}>
                                    <span>Déstination</span>
                                    <span className={style.value}>The wonders of madagascar</span>
                                </div>
                                <div className={style.detail_value}>
                                    <span>Distance</span>
                                    <span className={style.value}>The wonders of madagascar</span>
                                </div>
                                <div className={style.detail_value}>
                                    <span>Price per person</span>
                                    <span className={style.value}>The wonders of madagascar</span>
                                </div>
                                <div className={style.detail_value}>
                                    <span>Total place</span>
                                    <span className={style.value}>The wonders of madagascar</span>
                                </div>
                                <div className={style.detail_value}>
                                    <span>Available place</span>
                                    <span className={style.value}>The wonders of madagascar</span>
                                </div>
                                
                            </div>
                        </div>
                        <Button icon="pi pi-pencil" label="Edit" className={style.button_modif}/>
                    </div>
                    <div className="separateur"></div>
                    <div className={style.detail}>
                        <div className={style.detail_content}>
                            <span className={style.title}>Trip inclusion</span>
                            <div className={style.detail_inclusion_container}>
                                <div className={style.detail_inclusion}>
                                    <span className={style.detail_inclusion_title}><i className="pi pi-check"/></span>
                                    <span>sqdjqsldjqskldqsjdklqsjdlkqj</span>
                                    <span>sqdjqsldjqskldqsjdklqsjdlkqj</span>
                                    <span>sqdjqsldjqskldqsjdklqsjdlkqj</span>
                                    <span>sqdjqsldjqskldqsjdklqsjdlkqj</span>
                                </div>
                            </div>
                        </div>
                        <Button icon="pi pi-pencil" label="Edit" className={style.button_modif}/>
                    </div>
                    <div className={"separateur"}></div>
                    <div className={style.detail}>
                        <div className={style.detail_content}>
                            <span className={style.title}>Trip description</span>
                            <textarea value={"qlkjdjqkldjqsldjjjjjjjqlkjqdklqjdklqsjdqkldjqlkdjlqsdjqkldjsdjqlkqljldjdqlkdjqlkdjqlkjqljdqlkdjqklqkldjqdjlk"} className={style.description} readOnly/>
                        </div>
                        <Button icon="pi pi-pencil" label="Edit" className={style.button_modif}/>
                    </div>
                </div>
            </div>


        </>
    )
}