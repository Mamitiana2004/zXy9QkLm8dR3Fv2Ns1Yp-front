import Head from 'next/head';
import { useTranslation } from "react-i18next";
import style from './../../../style/pages/users/handcraft/id.module.css';
import DetailProduct from '@/components/card/DetailProduct';
import ProductCard from '@/components/card/ProductCard';
import FilterHandcraft from '@/components/FilterHandCraft';
export default function DetailHandcraft() {

    const {t} = useTranslation();
    return(
        <>
            <Head>
                <title>Detail of the product</title>
            </Head>
            <div className={style.container}>
                <div className={style.filter_header_top}>
                    <div className={style.filter_header_top_title_container}>
                        <span className={style.filter_header_top_title}>{t("handcraft_header_title")}</span>
                        <span className={style.filter_header_top_subtitle}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat explicabo cupiditate </span>
                    </div>
                    <div className={style.filter_parent}>
                        <FilterHandcraft/>
                    </div>
                </div>
                <DetailProduct/>
                <div className={style.suggestion_container}>
                    <span className={style.suggestion_title}>You will definitely like to see</span>
                    <div className={style.suggestion_body}>
                        <ProductCard
                            discount="10"
                            nom_produit="Raphia Bag"
                            by="Tik'Art"
                            prix="$25"
                            location="Ivato, Antananarivo 105"
                        />
                        <ProductCard
                            discount="10"
                            nom_produit="Raphia Bag"
                            by="Tik'Art"
                            prix="$25"
                            location="Ivato, Antananarivo 105"
                        />
                        <ProductCard
                            discount="10"
                            nom_produit="Raphia Bag"
                            by="Tik'Art"
                            prix="$25"
                            location="Ivato, Antananarivo 105"
                        />
                        <ProductCard
                            discount="10"
                            nom_produit="Raphia Bag"
                            by="Tik'Art"
                            prix="$25"
                            location="Ivato, Antananarivo 105"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}