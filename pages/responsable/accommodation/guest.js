import Head from "next/head";
import { useRouter } from "next/router";
import style from './../../../style/pages/responsable/accommodation/room.module.css'
import { Button } from "primereact/button";
import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function Guest() {
    const router= useRouter();

    const [guests,setGuests] = useState([
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"}
    ])

    const buttonTemplate = (item) =>{
        return(
            <>
                <Button onClick={()=>router.push("/responsable/accommodation/guest/"+item.id)} icon="pi pi-eye" text />
            </>
        )
    }
    
    return(
        <>
            <Head>
                <title>Guest</title>
            </Head>

            <div className={style.top_container}>
                <div className={style.top_container_title_container}>
                    <span className={style.top_container_title}>Guest</span>
                    <span className={style.top_container_subtitle}>Carlton Hotel</span>
                </div>
                <Button onClick={()=>router.push("/responsable/accommodation/guest")} label="+ Add new guest" className={style.button_add}/>
            </div>


            <div className={style.container}>
                <span className={style.container_title}>All guest</span>
                <div className={style.table_container}>
                    <DataTable paginator rows={10} value={guests}>
                        <Column sortable field="id" header="No"/>
                        <Column sortable field="name" header="Name"/>
                        <Column sortable field="email" header="Email"/>
                        <Column sortable field="nbr_guest" header="No. Guest"/>
                        <Column sortable field="room" header="Room"/>
                        <Column sortable field="check_in" header="Check in"/>
                        <Column sortable field="check_out" header="Check out"/>
                        <Column body={buttonTemplate}/>
                    </DataTable>
                </div>
            </div>
        </>
    )
}