import Head from "next/head";
import style from './../../../style/pages/users/accommodation/filter.module.css';
import dynamic from "next/dynamic";
import ListCheckbox from "@/components/ListCheckbox";
import HotelCard from "@/components/card/HotelCard";
import React, { useState, useEffect } from 'react';
import { getCsrfTokenDirect } from "@/util/csrf";
import Filter from "@/components/Filter";
import { UrlConfig } from "@/util/config";
import { useRouter } from "next/router";
import { DataView } from 'primereact/dataview';
import FilterTour from "@/components/FilterTour";
import TripCard from "@/components/card/TripCard";
        

const FilterMap = dynamic(() => import('@/components/FilterMap'), { ssr: false });

export default function Accommodation() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const router = useRouter();

    // Recupere tous les listes des voyages
    const [all_voyages, setAll_voyages] = useState([]);
    useEffect(()=>{
        fetch(`${UrlConfig.apiBaseUrl}/api/tour/voyages/`)
        .then(res=>res.json())
        .then(data=>setAll_voyages(data))
        .catch(error=>console.log(error));
    }, [])
    
    if (!all_voyages) {
        return <div>Loading...</div>
    }
    const itemTemplate = (voyage) => (
        <TripCard
            key={voyage.id}
            href={`/users/tour/${voyage.id}`}
            voyage={voyage}
        />
    );

    return (
        <>
            <Head>
                <title>Tour</title>
            </Head>

            <div className={style.container}>
                <div className={style.filter_header_top}>
                    <div className={style.filter_header_top_title_container}>
                        <span className={style.filter_header_top_title}>Find your best trip expedition in Madagascar with operator tour on Aftrip</span>
                        <span className={style.filter_header_top_subtitle}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat explicabo cupiditate </span>
                    </div>
                    <div className={style.filter_parent}>
                    <FilterTour/>
                    </div>
                </div>
                <div className={style.filter_header_container}>
                    <span className={style.filter_header_left}>
                        Properties in Antananarivo :    
                        <span className={style.filter_header_left_bold}> {all_voyages.length} properties found</span>
                    </span>
                    <div></div>
                </div>
                <div className={style.filter_container}>
                    <div className={style.filter_left}>
                        <FilterMap
                            lat={-18.9433924}
                            lng={47.5288271}
                        />
                        <ListCheckbox />
                        <ListCheckbox />
                    </div>
                    <div className={style.filter_right}>
                        <DataView 
                            emptyMessage="No hotel found"
                            itemTemplate={itemTemplate}
                            value={all_voyages}
                            paginator
                            rows={4}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
