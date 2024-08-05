import Head from "next/head";
import { useRouter } from "next/router";
import style from './../../../style/pages/responsable/handcraft/customer.module.css';
import { Button } from "primereact/button";
import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Avatar } from "primereact/avatar";

export default function Customer() {

    const router= useRouter();

    const [visible,setVisible] = useState(false);
    const [customer,setCustomer] = useState({id:1,name:"Will Smith",email:"willsmith@gmail.com",phone:"+261341109223",total_order:12});

    const [customers,setCustomers] = useState([
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",phone:"+261341109223",total_order:12},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",phone:"+261341109223",total_order:12},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",phone:"+261341109223",total_order:12},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",phone:"+261341109223",total_order:12},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",phone:"+261341109223",total_order:12},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",phone:"+261341109223",total_order:12},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",phone:"+261341109223",total_order:12},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",phone:"+261341109223",total_order:12},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",phone:"+261341109223",total_order:12},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",phone:"+261341109223",total_order:12},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",phone:"+261341109223",total_order:12},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",phone:"+261341109223",total_order:12},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",phone:"+261341109223",total_order:12},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",phone:"+261341109223",total_order:12},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",phone:"+261341109223",total_order:12},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",phone:"+261341109223",total_order:12},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",phone:"+261341109223",total_order:12},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",phone:"+261341109223",total_order:12},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",phone:"+261341109223",total_order:12},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",phone:"+261341109223",total_order:12},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",phone:"+261341109223",total_order:12},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",phone:"+261341109223",total_order:12},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",phone:"+261341109223",total_order:12},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",phone:"+261341109223",total_order:12},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",phone:"+261341109223",total_order:12},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",phone:"+261341109223",total_order:12},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",phone:"+261341109223",total_order:12},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",phone:"+261341109223",total_order:12},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",phone:"+261341109223",total_order:12},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",phone:"+261341109223",total_order:12},
    ])


    const afficheDetail = (item) =>{
        setCustomer(item);
        setVisible(true);
    }
    

    const buttonTemplate = (item) =>{
        return(
            <>
                <Button onClick={()=>afficheDetail(item)} icon="pi pi-eye" text />
                <Button onClick={()=>router.push("/responsable/handcraft/message")} icon="pi pi-comment" text />
            </>
        )
    }

    return(
        <>
            <Head>
                <title>Customer</title>
            </Head>

            <div className={style.top_container}>
                <div className={style.top_container_title_container}>
                    <span className={style.top_container_title}>Customer</span>
                    <span className={style.top_container_subtitle}>Carlton Hotel</span>
                </div>
            </div>


            <div className={style.container}>
                <span className={style.container_title}>All customers</span>
                <div className={style.table_container}>
                    <DataTable paginator rows={10} value={customers}>
                        <Column sortable field="id" header="No"/>
                        <Column sortable field="name" header="Name"/>
                        <Column sortable field="email" header="Email"/>
                        <Column sortable field="phone" header="Phone number"/>
                        <Column sortable field="total_order" header="Total Order"/>
                        <Column body={buttonTemplate} header="Actions"/>
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