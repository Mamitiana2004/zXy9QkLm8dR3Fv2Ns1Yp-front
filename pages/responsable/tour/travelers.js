import Head from "next/head";
import style from './../../../style/pages/responsable/tour/travalers.module.css'
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { confirmPopup, ConfirmPopup } from "primereact/confirmpopup";
import { useRouter } from "next/router";
import TourCard from "@/components/responsable/TourCard";
import { Dialog } from "primereact/dialog";
import { Avatar } from "primereact/avatar";

export default function Travelers() {

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
                <title>Travalers</title>
            </Head>

            <div className={style.top_container}>
                <div className={style.top_container_title_container}>
                    <span className={style.top_container_title}>Booking</span>
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
                <div className={style.table_container}>
                    <span className={style.title_table}>All customers</span>
                    <DataTable   value={bookings}>
                        <Column sortable field="id" header="No"/>
                        <Column sortable field="name" header="Name"/>
                        <Column sortable field="email" header="Email"/>
                        <Column sortable field="travelers" header="Travelers"/>
                        <Column sortable field="payment" header="Payement"/>
                        <Column header="Action" body={buttonTemplate}/>
                    </DataTable>
                </div>
            </div>

            <Dialog draggable={false} header="Customer details" visible={visible} onHide={()=>setVisible(false)}>
                <div className={style.dialog_container}>
                    <Avatar label="W" shape="circle" className={style.avatar_customer}/>
                    <div className={style.detail_customer_container}>
                        <div className={style.detail_customer}>
                            <span className={style.title}>Personnal information</span>
                            <div className={style.detail_container}>
                                <div className={style.detail}>
                                    <span className={style.detail_title}>First name</span>
                                    <span className={style.detail_label}>Faneva</span>
                                </div>
                                <div className={style.detail}>
                                    <span className={style.detail_title}>First name</span>
                                    <span className={style.detail_label}>Faneva</span>
                                </div>
                                <div className={style.detail}>
                                    <span className={style.detail_title}>First name</span>
                                    <span className={style.detail_label}>Faneva</span>
                                </div>
                                <div className={style.detail}>
                                    <span className={style.detail_title}>First name</span>
                                    <span className={style.detail_label}>Faneva</span>
                                </div>
                            </div>
                        </div>
                        <div className={style.detail_customer}>
                            <span className={style.title}>Personnal information</span>
                            <div className={style.detail_container}>
                                <div className={style.detail}>
                                    <span className={style.detail_title}>First name</span>
                                    <span className={style.detail_label}>Faneva</span>
                                </div>
                                <div className={style.detail}>
                                    <span className={style.detail_title}>First name</span>
                                    <span className={style.detail_label}>Faneva</span>
                                </div>
                                <div className={style.detail}>
                                    <span className={style.detail_title}>First name</span>
                                    <span className={style.detail_label}>Faneva</span>
                                </div>
                                <div className={style.detail}>
                                    <span className={style.detail_title}>First name</span>
                                    <span className={style.detail_label}>Faneva</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>


        </>
    )
}