import Head from "next/head";
import { useTranslation } from "react-i18next";
import style from '../../../style/pages/users/tour/id.module.css';
import FilterTour from "@/components/FilterTour";
import { Button } from "primereact/button";
import GallerieHotel from "@/components/GallerieHotel";
import { TabPanel, TabView } from "primereact/tabview";
import DetailTravel from "@/components/card/DetailTravel";
import dynamic from "next/dynamic";
import TimelineEvent from "@/layouts/users/tour/TimelineEvent";
import { Avatar } from "primereact/avatar";
import PopularTripCard from "@/components/card/PopularTripCard";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { UrlConfig } from "@/util/config";

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

export default function InfoTour() {
    const { t } = useTranslation();
    const router = useRouter();
    const { id } = router.query;

    const [voyage, setVoyage] = useState(null);
    const [popularVoyages, setPopularVoyages] = useState([]);
    const [tour, setTour] = useState(null);
    const [loading, setLoading] = useState(true);

 
    // Fetch voyage details when ID changes
    useEffect(() => {
        if (id) {
            fetch(`${UrlConfig.apiBaseUrl}/api/tour/voyages/${id}/`)
                .then(res => res.json())
                .then(data => {
                    setVoyage(data);
                    setLoading(false);
                })
                .catch(error => console.error('Error fetching voyage details:', error));
        }
    }, [id]);

    // Fetch popular voyages
    useEffect(() => {
        fetch(`${UrlConfig.apiBaseUrl}/api/tour/voyages-populaire/`)
            .then(res => res.json())
            .then(data => {
                setPopularVoyages(data);
                setLoading(false);
            })
            .catch(error => console.error('Error fetching popular voyages:', error));
    }, []);

    // Fetch Partenire Tour
    useEffect(() => {
        if (id) {
            fetch(`${UrlConfig.apiBaseUrl}/api/tour/partenaire/{id}`)
                .then(res => res.json())
                .then(data => {
                    setTour(data);
                    setLoading(false);
                }
                )
                .catch(error => console.error('Error fetching partenaire Tour:', error));
        }
    } ,[id])

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!voyage) {
        return <div>No voyage data available.</div>;
    }

    const panelClassName = (parent, index) => {
        if (parent.state.activeIndex === index)
            return style.tab_active;
        else 
            return style.tab;
    }

    if (!voyage) {
        return <div>Loading...</div>;
    }

    
    return (
        <>
            <Head>
                <title>Info {t("tour")}</title>
            </Head>  

            <div className={style.container}>
                <div className={style.filter_header_top}>
                    <div className={style.filter_header_top_title_container}>
                        <span className={style.filter_header_top_title}>{t("tour_header_title")}</span>
                        <span className={style.filter_header_top_subtitle}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat explicabo cupiditate </span>
                    </div>
                    <div className={style.filter_parent}>
                        <FilterTour/>
                    </div>
                </div>
                <div className={style.header_container}>
                    <div className={style.header_left}>
                        <span className={style.header_left_title}>{voyage.nom_voyage}</span> 
                    </div>
                    <div className={style.header_right}>
                        <div className={style.header_right_button_container}>
                            <Button raised icon="pi pi-heart" rounded text className={style.header_right_button}/>
                            <span className={style.header_right_button_label}>Like</span>
                        </div>
                        <div className={style.header_right_button_container}>
                            <Button raised icon="pi pi-send" rounded text className={style.header_right_button}/>
                            <span className={style.header_right_button_label}>Share</span>
                        </div>
                        <div className={style.header_right_button_container}>
                            <Button raised icon="pi pi-save" rounded text className={style.header_right_button}/>
                            <span className={style.header_right_button_label}>Save</span>
                        </div>
                    </div>
                </div>
                <GallerieHotel/>
                <div className={style.tour_detail_container}>
                    <div className={style.tour_detail_left}>
                        <span className={style.tour_detail_title}>{voyage.ville_depart} - {voyage.destination_voyage}</span>
                        <div></div>
                    </div>
                    <div className={style.tour_detail_right}>
                        <span className={style.tour_detail_price}>${voyage.prix_voyage}/</span>
                        <span>person</span>
                    </div>
                </div>
                <div className={style.body_accommodation}>
                    <TabView 
                        pt={{
                            root: { className: style.tab_container },
                            panelContainer:{ className: style.tab_container },
                            navContainer:{ className: style.tab_container }
                        }}
                    >
                        <TabPanel
                            pt={{
                                headerAction: ({ parent }) => ({
                                    className: panelClassName(parent, 0)
                                }),
                                header: { className: style.tab_container }
                            }}
                            header={t("overview")}
                        >
                            <div className={style.overview}>
                                <div className={style.accommodation_detail}>
                                    <span className={style.accommodation_detail_title}>{t("description")}</span>
                                    <div className={style.paragraphe}>
                                        {voyage.description_voyage}
                                    </div>
                                </div>
                                <div className={style.accommodation_detail}>
                                    <span className={style.accommodation_detail_title}>{t("programs")}</span>
                                    <TimelineEvent voyage={voyage} />
                                </div>
                                <div className={style.accommodation_detail}>
                                    <span className={style.accommodation_detail_title}>{t("travel_inclusion")}</span>
                                    <ul>
                                        {voyage.inclusions && voyage.inclusions.map((inclusion) => (
                                            <li key={inclusion.id}>{inclusion.nom_type_inclusion}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel
                            pt={{
                                headerAction: ({ parent }) => ({
                                    className: panelClassName(parent, 1)
                                }),
                                header: { className: style.tab_container }
                            }}
                            header={t("programs")}
                        >
                            <TimelineEvent voyage={voyage} />
                        </TabPanel>
                        <TabPanel
                            pt={{
                                headerAction: ({ parent }) => ({
                                    className: panelClassName(parent, 2)
                                }),
                                header: { className: style.tab_container }
                            }}
                            header={t("travel_inclusion")}
                        >
                            <ul>
                                {voyage.inclusions && voyage.inclusions.map((inclusion) => (
                                    <li key={inclusion.id}>{inclusion.nom_type_inclusion}</li>
                                ))}
                            </ul>
                        </TabPanel>
                    </TabView>
                    <div className={style.tour_card_container}>
                        <DetailTravel/>
                        <div className={style.tour_card}>
                            <Map
                                style={{ width: "100%", height: "300px" }}
                                lat={-18.9433924}
                                lng={47.5288271}  
                            />
                        </div>
                        <div className={style.tour_card}>
                            <div className={style.operator_detail_header}>
                                <Avatar
                                    shape="circle"
                                    className={style.operator_avatar}
                                />
                                <div className={style.operator_detail_title_container}>
                                    <span className={style.operator_detail_title}>ZTrip Mada</span>
                                    <span className={style.operator_detail_subtitle}>Ivato</span>
                                </div>
                            </div>
                            <div className={style.paragraphe}>
                                Lorem ipsum dolor sit amet dolor sadipscing. Dolores diam no eos vel gubergren consequat erat accusam sit eum at stet ea et. Amet sed at voluptua voluptua diam lorem rebum elitr et dolore qui diam elitr ipsum accusam takimata et suscipit. Duo esse possim dolore consectetuer blandit. In eu voluptua id vero diam facilisis accusam tempor est dolores ipsum amet consequat. Zzril vulputate ipsum duo vel erat elitr. Labore et no elitr soluta no nisl at dolore elitr lorem stet ea kasd dolor molestie at. Accusam et ut nonumy.
                            </div>
                            <Button onClick={() => router.push("/users/tour/operator/1")} className="button-primary" label="About the operator"/>
                        </div>
                    </div>
                </div>
                  <div className={style.suggstion_container}>
                    <span className={style.suggstion_title}>{t("you_would_like_it")}</span>
                    <div className={style.suggestion_body}>
                        {popularVoyages.map(voyage => (
                            <PopularTripCard key={voyage.id} voyage={voyage} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
