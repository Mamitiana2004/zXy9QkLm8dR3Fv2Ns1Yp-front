import Head from "next/head";
import style from './../../../style/pages/users/accommodation/filter.module.css';
import dynamic from "next/dynamic";
import ListCheckbox from "@/components/ListCheckbox";
import HotelCard from "@/components/card/HotelCard";
import Filter from "@/components/Filter";
import { useTranslation } from "react-i18next";

const FilterMap = dynamic(()=> import('@/components/FilterMap'),{ssr:false});

export default function Accommodation() {

    const {t} = useTranslation();

    return(
        <>
            <Head>
                <title>Accommodation</title>
            </Head>

            <div className={style.container}>
                <div className={style.filter_header_top}>
                    <div className={style.filter_header_top_title_container}>
                        <span className={style.filter_header_top_title}>{t("find_your_best_accommodation_on")}</span>
                        <span className={style.filter_header_top_subtitle}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat explicabo cupiditate </span>
                    </div>
                    <div className={style.filter_parent}>
                        <Filter/>
                    </div>
                </div>
                <div className={style.filter_header_container}>
                    <span className={style.filter_header_left}>
                       {t("properties_in")} Antananarivo :    
                        <span className={style.filter_header_left_bold}> 252 {t("properties_found")}</span>
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
                    </div>
                </div>
            </div>

        </>
    )
}