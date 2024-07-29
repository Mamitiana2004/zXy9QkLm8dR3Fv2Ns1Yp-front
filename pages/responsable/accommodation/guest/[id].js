import Head from "next/head";
import { useRouter } from "next/router";
import style from './../../../../style/pages/responsable/accommodation/guest/id.module.css';
import Link from "next/link";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
export default function DetailGuest() {
    const router = useRouter();
    const { id } = router.query;

    const [guests,setGuests] = useState([
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:1,name:"Will Smith",email:"willsmith@gmail.com",nbr_guest:1,room:"404",check_in:"07-07-2024",check_out:"08-07-2024"}
    ])



    return(
        <>
            <Head>
                <title>Detail Guest</title>
            </Head>

            <div className={style.top_container}>
                <div className={style.top_container_title_container}>
                    <span className={style.top_container_title}>Guest</span>
                    <span className={style.top_container_subtitle}>Carlton Hotel</span>
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
                                    <span className={style.username}>Will Smith</span>
                                    <span className={style.user_id}>ID: 4233</span>
                                </div>

                                <div className={style.guest}>
                                    <div className={style.guest_detail_container}>
                                        <div className={style.guest_detail}>
                                            <span className={style.guest_detail_title}>Check-in</span>
                                            <span className={style.guest_detail_value}>Tue, 07 July 2024</span>
                                        </div>
                                        <div className={style.guest_detail}>
                                            <span className={style.guest_detail_title}>No. Guest</span>
                                            <span className={style.guest_detail_value}>2</span>
                                        </div>
                                        <div className={style.guest_detail}>
                                            <span className={style.guest_detail_title}>Room name</span>
                                            <span className={style.guest_detail_value}>401</span>
                                        </div>
                                    </div>
                                    <div className={style.guest_detail_container}>
                                        <div className={style.guest_detail}>
                                            <span className={style.guest_detail_title}>Check-out</span>
                                            <span className={style.guest_detail_value}>Tue, 07 July 2024</span>
                                        </div>
                                        <div className={style.guest_detail}>
                                            <span className={style.guest_detail_title}>Guest request</span>
                                            <span className={style.guest_detail_value}>No request</span>
                                        </div>
                                        <div className={style.guest_detail}>
                                            <span className={style.guest_detail_title}>Room name</span>
                                            <span className={style.guest_detail_value}>401</span>
                                        </div>
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
                                <span className={style.guest_information_right_value}>5 nights</span>
                            </div>
                            <div className={style.guest_information_right}>
                                <span className={style.guest_information_right_label}>
                                    <i className="pi pi-user"/>
                                    Guest
                                </span>
                                <span className={style.guest_information_right_value}>2</span>
                            </div>
                            <div className={style.guest_information_right}>
                                <span className={style.guest_information_right_label}>
                                    <i className="pi pi-wallet"/>
                                    Price
                                </span>
                                <span className={style.guest_information_right_value}>$ 29</span>
                            </div>
                            <div className={style.guest_information_right}>
                                <span className={style.guest_information_right_label}>
                                    <i className="pi pi-ticket"/>
                                    Discount
                                </span>
                                <span className={style.guest_information_right_value}>-20 %</span>
                            </div>
                            <div className={style.separateur}></div>
                            
                            <div className={style.guest_information_right}>
                                <span className={style.guest_information_right_label}>
                                    Total
                                </span>
                                <span className={style.guest_information_right_value_active}>$ 50</span>
                            </div>
                        </div>
                    </div>
                    <div className={style.separateur}></div>
                    <h2>Booking history</h2>
                    <DataTable  value={guests}>
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