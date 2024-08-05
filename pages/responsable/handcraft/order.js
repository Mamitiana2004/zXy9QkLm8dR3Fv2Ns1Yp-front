import Head from "next/head";
import style from '@/style/pages/responsable/handcraft/order.module.css';
import { useRouter } from "next/router";
import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

export default function Order() {

    const router = useRouter();

    const [booking,setBooking] = useState([
        {id:"#41",name:"Paul Adamas",email:"pauladam@gmail.com",product:"Raphia bag",amount:"$235",quantity:2,date:'07-07-2024',status:"pending"},
        {id:"#41",name:"Paul Adamas",email:"pauladam@gmail.com",product:"Raphia bag",amount:"$235",quantity:2,date:'07-07-2024',status:"pending"},
        {id:"#41",name:"Paul Adamas",email:"pauladam@gmail.com",product:"Raphia bag",amount:"$235",quantity:2,date:'07-07-2024',status:"pending"},
        {id:"#41",name:"Paul Adamas",email:"pauladam@gmail.com",product:"Raphia bag",amount:"$235",quantity:2,date:'07-07-2024',status:"pending"},
        {id:"#41",name:"Paul Adamas",email:"pauladam@gmail.com",product:"Raphia bag",amount:"$235",quantity:2,date:'07-07-2024',status:"pending"},
        {id:"#41",name:"Paul Adamas",email:"pauladam@gmail.com",product:"Raphia bag",amount:"$235",quantity:2,date:'07-07-2024',status:"pending"},
        {id:"#41",name:"Paul Adamas",email:"pauladam@gmail.com",product:"Raphia bag",amount:"$235",quantity:2,date:'07-07-2024',status:"pending"},
        {id:"#41",name:"Paul Adamas",email:"pauladam@gmail.com",product:"Raphia bag",amount:"$235",quantity:2,date:'07-07-2024',status:"pending"},
        {id:"#41",name:"Paul Adamas",email:"pauladam@gmail.com",product:"Raphia bag",amount:"$235",quantity:2,date:'07-07-2024',status:"pending"},
        {id:"#41",name:"Paul Adamas",email:"pauladam@gmail.com",product:"Raphia bag",amount:"$235",quantity:2,date:'07-07-2024',status:"pending"},
        {id:"#41",name:"Paul Adamas",email:"pauladam@gmail.com",product:"Raphia bag",amount:"$235",quantity:2,date:'07-07-2024',status:"pending"},
        {id:"#41",name:"Paul Adamas",email:"pauladam@gmail.com",product:"Raphia bag",amount:"$235",quantity:2,date:'07-07-2024',status:"pending"},
        {id:"#41",name:"Paul Adamas",email:"pauladam@gmail.com",product:"Raphia bag",amount:"$235",quantity:2,date:'07-07-2024',status:"pending"},
        {id:"#41",name:"Paul Adamas",email:"pauladam@gmail.com",product:"Raphia bag",amount:"$235",quantity:2,date:'07-07-2024',status:"pending"},
        {id:"#41",name:"Paul Adamas",email:"pauladam@gmail.com",product:"Raphia bag",amount:"$235",quantity:2,date:'07-07-2024',status:"pending"},
        {id:"#41",name:"Paul Adamas",email:"pauladam@gmail.com",product:"Raphia bag",amount:"$235",quantity:2,date:'07-07-2024',status:"pending"},
        {id:"#41",name:"Paul Adamas",email:"pauladam@gmail.com",product:"Raphia bag",amount:"$235",quantity:2,date:'07-07-2024',status:"pending"},
        {id:"#41",name:"Paul Adamas",email:"pauladam@gmail.com",product:"Raphia bag",amount:"$235",quantity:2,date:'07-07-2024',status:"pending"},
        {id:"#41",name:"Paul Adamas",email:"pauladam@gmail.com",product:"Raphia bag",amount:"$235",quantity:2,date:'07-07-2024',status:"pending"},
        {id:"#41",name:"Paul Adamas",email:"pauladam@gmail.com",product:"Raphia bag",amount:"$235",quantity:2,date:'07-07-2024',status:"pending"},
        {id:"#41",name:"Paul Adamas",email:"pauladam@gmail.com",product:"Raphia bag",amount:"$235",quantity:2,date:'07-07-2024',status:"pending"},
        {id:"#41",name:"Paul Adamas",email:"pauladam@gmail.com",product:"Raphia bag",amount:"$235",quantity:2,date:'07-07-2024',status:"pending"},
        {id:"#41",name:"Paul Adamas",email:"pauladam@gmail.com",product:"Raphia bag",amount:"$235",quantity:2,date:'07-07-2024',status:"pending"},
        {id:"#41",name:"Paul Adamas",email:"pauladam@gmail.com",product:"Raphia bag",amount:"$235",quantity:2,date:'07-07-2024',status:"pending"},
        {id:"#41",name:"Paul Adamas",email:"pauladam@gmail.com",product:"Raphia bag",amount:"$235",quantity:2,date:'07-07-2024',status:"pending"},
        {id:"#41",name:"Paul Adamas",email:"pauladam@gmail.com",product:"Raphia bag",amount:"$235",quantity:2,date:'07-07-2024',status:"pending"},
        {id:"#41",name:"Paul Adamas",email:"pauladam@gmail.com",product:"Raphia bag",amount:"$235",quantity:2,date:'07-07-2024',status:"pending"},
        {id:"#41",name:"Paul Adamas",email:"pauladam@gmail.com",product:"Raphia bag",amount:"$235",quantity:2,date:'07-07-2024',status:"pending"},
        {id:"#41",name:"Paul Adamas",email:"pauladam@gmail.com",product:"Raphia bag",amount:"$235",quantity:2,date:'07-07-2024',status:"pending"},
        {id:"#41",name:"Paul Adamas",email:"pauladam@gmail.com",product:"Raphia bag",amount:"$235",quantity:2,date:'07-07-2024',status:"pending"},
        {id:"#41",name:"Paul Adamas",email:"pauladam@gmail.com",product:"Raphia bag",amount:"$235",quantity:2,date:'07-07-2024',status:"pending"},
        {id:"#41",name:"Paul Adamas",email:"pauladam@gmail.com",product:"Raphia bag",amount:"$235",quantity:2,date:'07-07-2024',status:"pending"},
        {id:"#41",name:"Paul Adamas",email:"pauladam@gmail.com",product:"Raphia bag",amount:"$235",quantity:2,date:'07-07-2024',status:"pending"},
        {id:"#41",name:"Paul Adamas",email:"pauladam@gmail.com",product:"Raphia bag",amount:"$235",quantity:2,date:'07-07-2024',status:"pending"}
    ])

    const statusTemplate = (item) =>{
        return(
            <span><i className="pi pi-clock"/> pending</span>
        )
    }

    const actionTemplate = (item) =>{
        return(
            <>
                <Button onClick={()=>afficheDetail(item)} icon="pi pi-eye" text />
            </>
        )
    }

    const afficheDetail =(item) =>{
        const url = new URLSearchParams();
        url.append("id",item.id);
        router.push("/responsable/handcraft/order_detail?"+url.toString());
    }

    return(
        <>
            <Head>
                <title>Order</title>
            </Head>

            <div className={style.top_container}>
                <div className={style.top_container_title_container}>
                    <span className={style.top_container_title}>Order</span>
                    <span className={style.top_container_subtitle}>Carlton Hotel</span>
                </div>
            </div>

            <div className={style.container}>
                <span className={style.container_title}>All order</span>
                <div className={style.table_container}>
                    <DataTable  value={booking}>
                        <Column sortable field="id" header="No"/>
                        <Column sortable field="name" header="Name"/>
                        <Column sortable field="email" header="Email"/>
                        <Column sortable field="product" header="Product"/>
                        <Column sortable field="amount" header="Amount"/>
                        <Column sortable field="quantity" header="Quantity"/>
                        <Column sortable field="date" header="Date"/>
                        <Column sortable body={statusTemplate} header="Status"/>
                        <Column sortable body={actionTemplate} header="Action"/>
                    </DataTable>
                </div>
            </div>


        </>
    )
}