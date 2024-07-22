import Head from "next/head";
import { useTranslation } from "react-i18next";
import style from './../../../style/pages/users/handcraft/handraft.module.css';
import FilterHandcraft from "@/components/FilterHandCraft";
import { Image } from "primereact/image";
import ProductCard from "@/components/card/ProductCard";
import { Button } from "primereact/button";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Handcraft() {
    const {t} = useTranslation();
    const router = useRouter();
    return(
        <>
            <Head>
                <title>Handcraft</title>
            </Head>

            <div className={style.container}>
                <div className={style.handcraft_filter_container}>
                    <Image src="/images/tours/tour.png" imageClassName={style.image_header_filter}/>
                    <div className={style.right_container}>
                        <div className={style.right_title_container}>
                            <span className={style.right_title}>{t("handcraft_header_title")}</span>
                            <span>Lorem ipsum dolor emet si Lorem ipsum dolor emet siLorem ipsum dolor emet siLorem ipsum dolor emet siLorem ipsum dolor emet siLorem ipsum dolor emet si</span>
                        </div>
                        <FilterHandcraft/>
                    </div>
                </div>
                <div className={style.categorie_container}>
                    <div className={style.categorie_top}>
                        <span className={style.categorie_title}>{t("explore_handcraft_categorie")}</span>
                        <span className={style.categorie_subtitle}>{t("explore_handcraft_categorie_label")}</span>
                        <Button onClick={()=>router.push("/users/handcraft/filter")} label={t("explore_all_handcraft")} style={{width:"320px"}} className="button-primary"/>
                    </div>

                    <div className={style.image_categorie_container}>
                        <Link href={"/users/handcraft/filter?type=wooden"} className={style.image_categorie_content}>
                            <Image src="/images/artisanat/sculpture-bois.png" imageClassName={style.image_categorie} alt="woode" />
                            <div className={style.image_categorie_detail}>
                                <span>{t("wooden_sculpture")}</span>
                            </div>
                        </Link>
                        <Link href={"/users/handcraft/filter?type=wooden"} className={style.image_categorie_content}>
                            <Image src="/images/artisanat/sculptur-metal.png" imageClassName={style.image_categorie} alt="woode" />
                            <div className={style.image_categorie_detail}>
                                <span>{t("metal_sculpture")}</span>
                            </div>
                        </Link>
                        <Link href={"/users/handcraft/filter?type=wooden"} className={style.image_categorie_content}>
                            <Image src="/images/artisanat/bijou.png" imageClassName={style.image_categorie} alt="woode" />
                            <div className={style.image_categorie_detail}>
                                <span>{t("jewerly")}</span>
                            </div>
                        </Link>
                        <Link href={"/users/handcraft/filter?type=wooden"} className={style.image_categorie_content}>
                            <Image src="/images/artisanat/tapisserie.png" imageClassName={style.image_categorie} alt="woode" />
                            <div className={style.image_categorie_detail}>
                                <span>{t("tapestry")}</span>
                            </div>
                        </Link>
                        <Link href={"/users/handcraft/filter?type=wooden"} className={style.image_categorie_content}>
                            <Image src="/images/artisanat/peinture.png" imageClassName={style.image_categorie} alt="woode" />
                            <div className={style.image_categorie_detail}>
                                <span>{t("paint")}</span>
                            </div>
                        </Link>
                        <Link href={"/users/handcraft/filter?type=wooden"} className={style.image_categorie_content}>
                            <Image src="/images/artisanat/vannerie.png" imageClassName={style.image_categorie} alt="woode" />
                            <div className={style.image_categorie_detail}>
                                <span>{t("basketry")}</span>
                            </div>
                        </Link>
                    </div>


                </div>
                <div className={style.top_value_container}>
                    <div className={style.top_value_top}>
                        <span className={style.top_value_title}>{t("top_value_for_you")}</span>
                        <span className={style.top_value_subtitle}>{t("dont_wait_until_tomorrow_handcraft")}</span>
                    </div>

                    <div className={style.top_value_body}>
                        <div className={style.top_value_body_left}>
                        
                            <div className={style.top_value_left_detail_container}>
                                <Image src="/images/artisanat/bousole.svg" alt="bousole" imageClassName={style.top_value_left_detail_image}/>
                                <div className={style.top_value_left_detail}>
                                    <span className={style.top_value_left_detail_title}>{t("home_made_customized")}</span>
                                    <span>{t("home_made_customized_label")}</span>
                                </div>
                            </div>
                            <div className={style.top_value_left_detail_container}>
                                <Image src="/images/artisanat/map.svg" alt="map" imageClassName={style.top_value_left_detail_image}/>
                                <div className={style.top_value_left_detail}>
                                    <span className={style.top_value_left_detail_title}>{t("cheap_price")}</span>
                                    <span>{t("cheap_price_label")}</span>
                                </div>
                            </div>
                            <div className={style.top_value_left_detail_container}>
                                <Image src="/images/artisanat/palm.svg" alt="palm" imageClassName={style.top_value_left_detail_image}/>
                                <div className={style.top_value_left_detail}>
                                    <span className={style.top_value_left_detail_title}>{t("memorable_souvenir")}</span>
                                    <span>{t("memorable_souvenir_label")}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className={style.suggestion_container}>
                    <div className={style.suggestion_title_container}>
                        <span className={style.suggestion_title}>{t("exclusive_handcraft_product")}</span>
                        <span className={style.suggestion_subtitle}>{t("dont_wait_to_discover_handcraft")} </span>
                    </div>
                    <div className={style.suggestion_item_container}>
                        <ProductCard
                            nom_produit="Raphia Bag"
                            by="TArt Mlagasy"
                            location="Ivato , Antananarivo , 105"
                            prix="$ 950"
                            discount="20"
                            href="/users/handcraft/1"
                        />
                        <ProductCard
                            nom_produit="Raphia Bag"
                            by="TArt Mlagasy"
                            location="Ivato , Antananarivo , 105"
                            prix="$ 950"
                            discount="20"
                            href="/users/handcraft/1"
                        />
                        <ProductCard
                            nom_produit="Raphia Bag"
                            by="TArt Mlagasy"
                            location="Ivato , Antananarivo , 105"
                            prix="$ 950"
                            discount="20"
                            href="/users/handcraft/1"
                        />
                        <ProductCard
                            nom_produit="Raphia Bag"
                            by="TArt Mlagasy"
                            location="Ivato , Antananarivo , 105"
                            prix="$ 950"
                            discount="20"
                            href="/users/handcraft/1"
                        />
                        
                        
                    </div>
                </div>
            </div>
        </>
    )
}