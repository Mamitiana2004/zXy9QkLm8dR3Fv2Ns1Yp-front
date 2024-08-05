import Head from "next/head";
import AppTopBarResponsable from "./AppTopBarResponsable";
import style from '@/style/layouts/responsable/ResponsableLayout.module.css';
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function ResponsableLayout(props) {

    const router = useRouter();
    const [link,setLink] = useState([]);

    useEffect(()=>{
        if (router.asPath.includes("/responsable/accommodation")) {
            let links = [
                {
                    icon:"pi pi-home",
                    label:"Dashboard",
                    link:"/responsable/accommodation/dashboard"
                },
                {
                    icon:"pi pi-bookmark-fill",
                    label:"Booking",
                    link:"/responsable/accommodation/booking"
                },
                {
                    icon:"pi pi-objects-column",
                    label:"Room",
                    link:"/responsable/accommodation/room"
                },
                {
                    icon:"pi pi-users",
                    label:"Guest",
                    link:"/responsable/accommodation/guest"
                },
                {
                    icon:"pi pi-envelope",
                    label:"Message",
                    link:"/responsable/accommodation/message"
                },
                {
                    icon:"pi pi-cog",
                    label:"Setting",
                    link:"/responsable/accommodation/setting"
                },
                {
                    icon:"pi pi-sign-out",
                    label:"Log out",
                    link:"/users"
                },
                
            ]
            setLink(links);
        }
        if (router.asPath.includes("/responsable/handcraft")) {
            let links = [
                {
                    icon:"pi pi-home",
                    label:"Dashboard",
                    link:"/responsable/handcraft/dashboard"
                },
                {
                    icon:"pi pi-shopping-bag",
                    label:"Order",
                    link:"/responsable/handcraft/order"
                },
                {
                    icon:"pi pi-shop",
                    label:"Product",
                    link:"/responsable/handcraft/product"
                },
                {
                    icon:"pi pi-users",
                    label:"Customers",
                    link:"/responsable/handcraft/customer"
                },
                {
                    icon:"pi pi-envelope",
                    label:"Message",
                    link:"/responsable/handcraft/message"
                },
                {
                    icon:"pi pi-cog",
                    label:"Setting",
                    link:"/responsable/handcraft/setting"
                },
                {
                    icon:"pi pi-sign-out",
                    label:"Log out",
                    link:"/users"
                },
                
            ]
            setLink(links);
        }
        if (router.asPath.includes("/responsable/tour")) {
            let links = [
                {
                    icon:"pi pi-home",
                    label:"Dashboard",
                    link:"/responsable/tour/dashboard"
                },
                {
                    icon:"pi pi-bookmark-fill",
                    label:"Booking",
                    link:"/responsable/tour/booking"
                },
                {
                    icon:"pi pi-objects-column",
                    label:"Trip",
                    link:"/responsable/tour/trip"
                },
                {
                    icon:"pi pi-users",
                    label:"Travelers",
                    link:"/responsable/tour/travelers"
                },
                {
                    icon:"pi pi-envelope",
                    label:"Message",
                    link:"/responsable/tour/message"
                },
                {
                    icon:"pi pi-cog",
                    label:"Setting",
                    link:"/responsable/tour/setting"
                },
                {
                    icon:"pi pi-sign-out",
                    label:"Log out",
                    link:"/users"
                },
                
            ]
            setLink(links);
        }
    },[])

    return(
        <>
            <Head>
                <title>Aftrip responsable</title>
            </Head>
            <AppTopBarResponsable/>
            <div className={style.container}>
                <div className={style.sidebar}>
                    {link.map((l,index)=>{
                        return(
                            <Link key={index} className={style.sidebar_link} href={l.link}>
                                <i className={l.icon}/>
                                <span>{l.label}</span>
                            </Link>
                        )
                    })}
                    
                    
                </div>
                <div className={style.body_container}>
                    {props.children}
                </div>
            </div>
        </>
    )
}