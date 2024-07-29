import Head from "next/head";

import style from './../../../style/pages/responsable/accommodation/room.module.css'
import { Button } from "primereact/button";
import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { confirmPopup, ConfirmPopup } from "primereact/confirmpopup";
import { useRouter } from "next/router";
export default function Room() {

    const router = useRouter();

    const [booking,setBooking] = useState([
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"}
    ])

    const buttonTemplate = (item) =>{
        return(
            <>
                <Button icon="pi pi-pen-to-square" text severity="success"/>
                <Button onClick={confirm} icon="pi pi-trash" text severity="danger"/>
            </>
        )
    }

    const confirm = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Do you want to delete this item?',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept
        });
    };

    const accept = () =>{

    }

    return(
        <>
            <Head>
                <title>Room</title>
            </Head>

            <div className={style.top_container}>
                <div className={style.top_container_title_container}>
                    <span className={style.top_container_title}>Room</span>
                    <span className={style.top_container_subtitle}>Carlton Hotel</span>
                </div>
                <Button onClick={()=>router.push("/responsable/accommodation/addNewRoom")} label="+ Add new room" className={style.button_add}/>
            </div>

            <div className={style.container}>
                <span className={style.container_title}>All room</span>
                <div className={style.table_container}>
                    <DataTable  paginator rows={10} value={booking}>
                        <Column sortable field="id" header="No"/>
                        <Column sortable field="name" header="Name"/>
                        <Column sortable field="room" header="Room"/>
                        <Column sortable field="guests" header="Guests"/>
                        <Column sortable field="check_in" header="Check in"/>
                        <Column sortable field="check_out" header="Check out"/>
                        <Column header="Action" body={buttonTemplate}/>
                    </DataTable>
                </div>
            </div>

            <ConfirmPopup/>
        </>
    )
}