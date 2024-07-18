import Head from "next/head";
import style from './../../../style/pages/users/accommodation/accommodation.module.css';
import dynamic from "next/dynamic";
import ListCheckbox from "@/components/ListCheckbox";
import HotelCard from "@/components/card/HotelCard";
import React, { useState, useEffect } from 'react';
import { getCsrfTokenDirect } from "@/util/csrf";
import Filter from "@/components/Filter";
import { UrlConfig } from "@/util/config";

const FilterMap = dynamic(()=> import('@/components/FilterMap'),{ssr:false});

export default function Accommodation() {
    const [hotels, setHotels] = useState([]);
    


    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const csrfToken = await getCsrfTokenDirect();
                fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/get-all-hebergement/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'X-CSRFToken': csrfToken,
                    },
                })
                .then(res => res.json())
                .then(data => {
                        setHotels(data.hebergements);
                    }
                )
                .catch(error => console.log(error))
                
                
            } catch (error) {
                console.error('Error fetching hotel data:', error);
            }
        };

        fetchHotels();
    }, []);
    return(
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
                        <Filter/>
                    </div>
                </div>
                <div className={style.filter_header_container}>
                    <span className={style.filter_header_left}>
                        Properties in Antananarivo :    
                        <span className={style.filter_header_left_bold}> 252 properties found</span>
                    </span>
                    <div></div>
                </div>
                <div className={style.filter_container}>
                    <div className={style.filter_left}>
                        <FilterMap
                            lat={-18.9433924}
                            lng={47.5288271}
                        />
                        <ListCheckbox/>
                        <ListCheckbox/>
                        <ListCheckbox/>
                        <ListCheckbox/>
                    </div>
                    <div className={style.filter_right}>
                       
                        {
                            hotels.map((hotel) => { { console.log('image ', hotel.images[0].images)}
                                return <HotelCard
                                    key={hotel.id}
                                    href={`/users/accommodation/${hotel.id}`}
                                    rate={hotel.nombre_etoile_hebergement}
                                    img={`${UrlConfig.apiBaseUrl}${hotel.images[0].images}`}
                                    price={hotel.min_prix_nuit_chambre}
                                    name={hotel.nom_hebergement}
                                    localisation={`Localisation information here`}
                                    description={hotel.description_hebergement}
                                />
                            })
                        }
{/*                         
                        <HotelCard
                            href="/users/accommodation/1"
                            rate="3"
                            view="360"
                            price="29.5"
                            name="Hote le Louvre & Span"
                            localisation="Antaninarenina, Antananarivo 101 - 0,5 km from center"
                            description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus corporis sed expedita, vero dolore esse hic alias corporiLorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus corporis sed expedita, vero dolore esse hic alias corporis totam dolores dolor voluptatem voluptate quisquam sit animi fugit sapiente"
                        />
                        <HotelCard
                            href="/users/accommodation/1"
                            rate="3"
                            view="360"
                            price="29.5"
                            name="Hote le Louvre & Span"
                            localisation="Antaninarenina, Antananarivo 101 - 0,5 km from center"
                            description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus corporis sed expedita, vero dolore esse hic alias corporiLorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus corporis sed expedita, vero dolore esse hic alias corporis totam dolores dolor voluptatem voluptate quisquam sit animi fugit sapiente"
                        />
                        <HotelCard
                            href="/users/accommodation/1"
                            rate="3"
                            view="360"
                            price="29.5"
                            name="Hote le Louvre & Span"
                            localisation="Antaninarenina, Antananarivo 101 - 0,5 km from center"
                            description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus corporis sed expedita, vero dolore esse hic alias corporiLorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus corporis sed expedita, vero dolore esse hic alias corporis totam dolores dolor voluptatem voluptate quisquam sit animi fugit sapiente"
                        /> */}
                    </div>
                </div>
            </div>

        </>
    )
}