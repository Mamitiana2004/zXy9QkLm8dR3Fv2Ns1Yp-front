import Head from "next/head";
import style from './../../../style/pages/responsable/tour/trip.module.css'
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TourCard from "@/components/responsable/TourCard";
import { Dialog } from "primereact/dialog";
import { Avatar } from "primereact/avatar";
import { Image } from "primereact/image";

export default function Trip() {

    const router = useRouter();
    const [category,setCategory] = useState(1);
    const [visible,setVisible] = useState(false);


    const [bookings,setBooking] = useState([])
    const [allBooking,setAllBooking] = useState([]);

    useEffect(()=>{
        fetch("/api/trip/getAllCustomer")
        .then(res=>res.json())
        .then(data=>{
            setAllBooking(data);
            const bookingCopy = [];
            data.map(d=>{
                if (d.tripID == category) {
                    bookingCopy.push(d);
                }
            })
            setBooking(bookingCopy);
        })
        .catch(error=>console.log(error))
    },[category])

    const buttonTemplate = (item) =>{
        return(
            <>
                <Button icon="pi pi-eye" onClick={()=>afficheDetail(item)} text severity="secondary"/>
            </>
        )
    }

    const changeTrip = (id) =>{
        setCategory(id);
        const bookingCopy = [];
        allBooking.map(d=>{
            if (d.tripID == id) {
                bookingCopy.push(d);
            }
        })
        setBooking(bookingCopy);
    }


    


    const afficheDetail = (item) =>{
        setVisible(true);
    }


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
                    <TourCard onClick={()=>changeTrip(1)}/>
                    <TourCard onClick={()=>changeTrip(2)}/>
                    <TourCard onClick={()=>changeTrip(3)}/>
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
                                    <span>Name</span>
                                    <span className={style.value}>The wonders of madagascar</span>
                                </div>
                                <div className={style.detail_value}>
                                    <span>Name</span>
                                    <span className={style.value}>The wonders of madagascar</span>
                                </div>
                                <div className={style.detail_value}>
                                    <span>Name</span>
                                    <span className={style.value}>The wonders of madagascar</span>
                                </div>
                                <div className={style.detail_value}>
                                    <span>Name</span>
                                    <span className={style.value}>The wonders of madagascar</span>
                                </div>
                                <div className={style.detail_value}>
                                    <span>Name</span>
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
                                    <span>sqdjqsldjqskldqsjdklqsjdlkqj</span>
                                    <span>sqdjqsldjqskldqsjdklqsjdlkqj</span>
                                </div>
                                <div className={style.detail_inclusion}>
                                    <span className={style.detail_inclusion_title}><i className="pi pi-times"/></span>
                                    <span>sqdjqsldjqskldqsjdklqsjdlkqj</span>
                                    <span>sqdjqsldjqskldqsjdklqsjdlkqj</span>
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