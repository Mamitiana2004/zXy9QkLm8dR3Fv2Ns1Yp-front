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

    const [booking, setBooking] = useState([
    
        {id:"#1",name:"401",type:"Couple",guests:"2",status:"Available",price:"$132"},
        {id:"#2",name:"402",type:"Couple",guests:"2",status:"Available",price:"$132"},
        {id:"#3",name:"403",type:"Couple",guests:"2",status:"Available",price:"$132"},
        {id:"#4",name:"404",type:"Couple",guests:"2",status:"Available",price:"$132"},
        {id:"#5",name:"405",type:"Couple",guests:"2",status:"Available",price:"$132"},
        {id:"#6",name:"406",type:"Couple",guests:"2",status:"Available",price:"$132"},
        {id:"#7",name:"407",type:"Couple",guests:"2",status:"Available",price:"$132"},
        {id:"#8",name:"408",type:"Couple",guests:"2",status:"Available",price:"$132"},
        {id:"#9",name:"409",type:"Couple",guests:"2",status:"Available",price:"$132"},
        {id:"#10",name:"410",type:"Couple",guests:"2",status:"Available",price:"$132"},
        {id:"#11",name:"411",type:"Couple",guests:"2",status:"Available",price:"$132"},
        {id:"#12",name:"412",type:"Couple",guests:"2",status:"Available",price:"$132"},
        {id:"#13",name:"413",type:"Couple",guests:"2",status:"Available",price:"$132"},
      
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
                    <span className={style.top_container_subtitle}>Brajas Hotel</span>
                </div>
                <Button onClick={()=>router.push("/responsable/accommodation/addNewRoom")} label="+ Add new room" className={style.button_add}/>
            </div>

            <div className={style.container}>
                <span className={style.container_title}>All room</span>
                <div className={style.table_container}>
                    <DataTable  paginator rows={5} value={booking}>
                        <Column sortable field="id" header="No"/>
                        <Column sortable field="name" header="Name"/>
                        <Column sortable field="type" header="Type"/>
                        <Column sortable field="guests" header="Guests"/>
                        <Column sortable field="status" header="Status"/>
                        <Column sortable field="price" header="Price"/>
                        <Column header="Action" body={buttonTemplate}/>
                    </DataTable>
                </div>
            </div>

            <ConfirmPopup/>
        </>
    )
}