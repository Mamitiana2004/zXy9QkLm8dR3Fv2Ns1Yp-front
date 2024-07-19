import FilterTour from "@/components/FilterTour";
import Head from "next/head";
import style from './../../../style/pages/users/tour/tour.module.css';
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { useRouter } from "next/router";
import PopularTripCard from "@/components/card/PopularTripCard";
import { useState } from "react";
export default function Tour() {

    const router = useRouter();


    return(
        <>
            <Head>
                <title>Tour</title>
            </Head>
            
            <div className={style.container}>
                <div className={style.tour_filter_container}>
                    <Image src="/images/tours/tour.png" imageClassName={style.image_header_filter}/>
                    <div className={style.right_container}>
                        <div className={style.right_title_container}>
                            <span className={style.right_title}>Find your best trip expedition in Madagascar with operator tour on Aftrip</span>
                            <span>Lorem ipsum dolor emet si Lorem ipsum dolor emet siLorem ipsum dolor emet siLorem ipsum dolor emet siLorem ipsum dolor emet siLorem ipsum dolor emet si</span>
                        </div>
                        <FilterTour/>
                    </div>
                </div>
                <div className={style.suggestion_container}>
                    <div className={style.suggestion_title_container}>
                        <span className={style.suggestion_title}>Popular trip at the moment</span>
                        <span className={style.suggestion_subtitle}>Don’t wait until tomorrow ! Discover your adventure now and feel the sensation of closeness to nature around you here in Madagascar, to get the best adventureyou just need to leaveand go where you like </span>
                    </div>
                    <div className={style.suggestion_item_container}>
                    
                        <PopularTripCard/>
                        <PopularTripCard/>
                        <PopularTripCard/>
                        <PopularTripCard/>
                        
                    </div>
                </div>
            </div>
        </>
    )
}