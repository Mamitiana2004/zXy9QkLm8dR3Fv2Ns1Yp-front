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
        

const FilterMap = dynamic(() => import('@/components/FilterMap'), { ssr: false });

export default function Accommodation() {

    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const router = useRouter();
    const { type, location, check_in, check_out, invite } = router.query;
    

    const itemTemplate = (hotel) => {
    const baseUrl = `${UrlConfig.apiBaseUrl}`;
    const imageUrl = hotel.images && hotel.images.length > 0 ? `${baseUrl}${hotel.images[0].image}` : "";

    return (
        <HotelCard
            href={`/users/accommodation/${hotel.id}`}
            rate={hotel.nombre_etoile_hebergement}
            img={imageUrl}
            price={hotel.min_prix_nuit_chambre}
            name={hotel.nom_hebergement}
            localisation={`Localisation information here`}
            description={hotel.description_hebergement}
        />
    );
};
  

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const csrfToken = await getCsrfTokenDirect();
                const response = await fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/get-all-hebergement/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'X-CSRFToken': csrfToken,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch hotels');
                }

                const data = await response.json();
                setHotels(data.hebergements);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching hotel data:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchHotels();
    }, []);

    // useEffect(()=>{
    //     fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/get-all-hebergement/`)
    //     .then(res=>res.json())
    //     .then(data=>setHotels(data))
    //     .catch(error=>console.log(error));
    // },[])


   

    return (
        <>
            <Head>
                <title>Accommodation</title>
            </Head>

            <div className={style.container}>
                <div className={style.filter_header_top}>
                    <div className={style.filter_header_top_title_container}>
                        <span className={style.filter_header_top_title}>Find your best accommodation on Hotello</span>
                        <span className={style.filter_header_top_subtitle}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat explicabo cupiditate </span>
                    </div>
                    <div className={style.filter_parent}>
                    <Filter
                        locationSelected={location && location}
                        typeSelected={type && type}
                    />
                    </div>
                </div>
                <div className={style.filter_header_container}>
                    <span className={style.filter_header_left}>
                        Properties in Antananarivo :    
                        <span className={style.filter_header_left_bold}> {hotels.length} properties found</span>
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
                        <ListCheckbox />
                        <ListCheckbox />
                    </div>
                    <div className={style.filter_right}>
                        <DataView 
                            emptyMessage="No hotel found"
                            itemTemplate={itemTemplate}
                            value={hotels}
                            paginator
                            rows={4}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
