import FilterTour from "@/components/FilterTour";
import Head from "next/head";
import style from './../../../style/pages/users/tour/tour.module.css';
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { useRouter } from "next/router";
import PopularTripCard from "@/components/card/PopularTripCard";
import { useState } from "react";
import { useTranslation } from "react-i18next";
export default function Tour() {
    const {t} = useTranslation();
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
                            <span className={style.right_title}>{t("tour_header_title")}</span>
                            <span>Lorem ipsum dolor emet si Lorem ipsum dolor emet siLorem ipsum dolor emet siLorem ipsum dolor emet siLorem ipsum dolor emet siLorem ipsum dolor emet si</span>
                        </div>
                        <FilterTour/>
                    </div>
                </div>
                <div className={style.suggestion_container}>
                    <div className={style.suggestion_title_container}>
                        <span className={style.suggestion_title}>{t("popular_trip_moment")}</span>
                        <span className={style.suggestion_subtitle}>{t("popular_trip_moment_label")}</span>
                    </div>
                    <div className={style.suggestion_item_container}>
                    
                        <PopularTripCard href="/users/tour/1"/>
                        <PopularTripCard href="/users/tour/1"/>
                        <PopularTripCard href="/users/tour/1"/>
                        <PopularTripCard href="/users/tour/1"/>
                        
                    </div>
                </div>
            </div>
        </>
    )
}