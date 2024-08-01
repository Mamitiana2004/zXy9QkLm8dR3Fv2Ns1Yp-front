import Head from "next/head";
import style from '@/style/pages/responsable/accommodation/booking.module.css';
import { Button } from "primereact/button";
import RoomPlanning from "@/components/Planning";
import { useState } from "react";
export default function Booking() {


    const [rooms,setRooms] = useState([
        {id:1,title:"Room 401"},
        {id:2,title:"Room 402"},
        {id:3,title:"Room 403"},
        {id:4,title:"Room 404"},
        {id:5,title:"Room 405"},
        {id:6,title:"Room 406"},
        {id:7,title:"Room 407"},
        {id:8,title:"Room 408"}
    ]);

    const [book,setBook] = useState([
        {
          title:'Will Smith',
          nuit:1,
          jour:2,
          start: '2024-07-23',
          end: '2024-07-28',
          resourceId: 1
        },
        {
          title: 'Will smith',
          nuit:1,
          jour:2,
          start: '2024-07-23',
          end: '2024-07-30',
          resourceId: 2 
        }
      ])

    return(
        <>
            <Head>
                <title>Booking</title>
            </Head>
            <div className={style.top_container}>
                <div className={style.top_container_title_container}>
                    <span className={style.top_container_title}>Booking</span>
                    <span className={style.top_container_subtitle}>Carlton Hotel</span>
                </div>
            </div>

            <div className={style.container}>
                <RoomPlanning events={book} rooms={rooms}/>
            </div>
            
        </>
    )
}