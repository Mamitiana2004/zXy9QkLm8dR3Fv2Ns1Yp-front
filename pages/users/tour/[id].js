import Head from "next/head";
import { useTranslation } from "react-i18next";
import style from '../../../style/pages/users/tour/id.module.css';
import FilterTour from "@/components/FilterTour";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import GallerieHotel from "@/components/GallerieHotel";
import { TabPanel, TabView } from "primereact/tabview";
import DetailTravel from "@/components/card/DetailTravel";
import dynamic from "next/dynamic";
import TimelineEvent from "@/layouts/users/tour/TimelineEvent";
const Map = dynamic(()=> import('@/components/Map'),{ssr:false});
export default function InfoTour() {

    const {t} = useTranslation();
    const panelClassName = (parent, index) => {
        if (parent.state.activeIndex === index)
            return style.tab_active;
        else 
            return style.tab;
    }

    return(
        <>
            <Head>
                <titl>Info {t("tour")}</titl>
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
                        <span className={style.header_left_title}>Tje wonder of madagascaar south west</span> 
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
                        <span className={style.tour_detail_title}>Antananarivo - Tsiribihana - Morondava - Toliara</span>
                        <div></div>
                    </div>
                    <div className={style.tour_detail_right}>
                        <span className={style.tour_detail_price}>$960/</span>
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
                                headerAction:({parent})=>({
                                    className: panelClassName(parent,0)
                                }),
                                header:{ className: style.tab_container }
                            }}
                            header={t("overview")}
                        >
                            <div className={style.overview}>
                                <div className={style.accommodation_detail}>
                                    <span className={style.accommodation_detail_title}>{t("description")}</span>
                                    <div className={style.paragraphe}>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error possimus quas explicabo delectus 
                                    velit veritatis sapiente magni cumque cum incidunt, alias harum modi ea pariatur debitis deleniti 
                                    culpa quae fuga ad, rerum natus. Quibusdam cumque veniam saepe nesciunt, fuga perspiciatis 
                                    possimus odit iste ipsam! Ex ad labore impedit incidunt tempora sed aliquid qui totam ducimus 
                                    distinctio, quos minus aliquam tempore officiis dolorem quidem amet mollitia, est fugiat. 
                                    Numquam nihil dolor corrupti, repellat temporibus facilis quisquam odio quam nobis doloribus 
                                    harum earum quod nostrum voluptatum quia enim iure? Quae molestias magni sint aliquid rerum, 
                                    veniam aperiam? Voluptas molestias fugiat doloremque dolorum? Lorem ipsum dolor sit amet, 
                                    consectetur adipisicing elit. Error possimus quas explicabo delectus velit veritatis sapiente magni 
                                    cumque cum incidunt, alias harum modi ea pariatur debitis deleniti culpa quae fuga ad, rerum 
                                    natus. Quibusdam cumque veniam saepe nesciunt, fuga perspiciatis possimus odit iste ipsam! Ex 
                                    ad labore impedit incidunt tempora sed aliquid qui totam ducimus distinctio, quos minus aliquam 
                                    tempore officiis dolorem quidem amet mollitia, est fugiat. Numquam nihil dolor corrupti, repellat 
                                    temporibus facilis quisquam odio quam nobis doloribus harum earum quod nostrum voluptatum 
                                    quia enim iure? Quae molestias magni sint aliquid rerum, veniam aperiam? Voluptas molestias 
                                    fugiat doloremque dolorum?
                                    </div>
                                </div>
                                <div className={style.accommodation_detail}>
                                    <span className={style.accommodation_detail_title}>{t("programs")}</span>
                                    <TimelineEvent/>
                                </div>
                                <div className={style.accommodation_detail}>
                                    <span className={style.accommodation_detail_title}>{t("travel_inclusion")}</span>
                                    
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel
                            pt={{
                                headerAction:({parent})=>({
                                    className: panelClassName(parent,1)
                                }),
                                header:{ className: style.tab_container }
                            }}
                            header={t("programs")}
                        ></TabPanel>
                        <TabPanel
                            pt={{
                                headerAction:({parent})=>({
                                    className: panelClassName(parent,2)
                                }),
                                header:{ className: style.tab_container }
                            }}
                            header={t("travel_inclusion")}
                        ></TabPanel>

                    </TabView>
                    <div className={style.tour_card_container}>
                        <DetailTravel/>
                        <div className={style.tour_card}>
                            <Map
                                style={{width:"100%",height:"300px"}}
                                lat={-18.9433924}
                                lng={47.5288271}  
                            />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}