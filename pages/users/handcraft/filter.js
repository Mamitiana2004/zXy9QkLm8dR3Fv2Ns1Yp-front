import Head from "next/head";
import { useTranslation } from "react-i18next";
import style from './../../../style/pages/users/handcraft/filter.module.css';
import FilterHandcraft from "@/components/FilterHandCraft";
import ListCheckbox from "@/components/ListCheckbox";
import dynamic from "next/dynamic";
import ProductCard from "@/components/card/ProductCard";
import { DataView } from 'primereact/dataview';
import { useEffect, useState } from "react";
import { classNames } from "primereact/utils";
import { useRouter } from "next/router";
import { UrlConfig } from "@/util/config";

const FilterMap = dynamic(() => import('@/components/FilterMap'), { ssr: false });

export default function FilterHandCraft() {
    const { t } = useTranslation();
    const [handcrafts, setHandcrafts] = useState([]);

    const router = useRouter();

    const { location, store, type } = router.query;

    let itemTemplate = (handcraft) => {
        return <ProductCard
            key={product.id}
            id={product.id}
            nb_like={product.total_likes}
            nom_produit={product.nom_produit_artisanal}
            by={product.artisanat.nom_artisanat}
            location={`${product.artisanat.localisation_artisanat.ville} ${product.artisanat.localisation_artisanat.adresse}`}
            prix={`$ ${product.prix_artisanat}`}
            discount={product.discount}
            href={`/users/handcraft/${product.id}`}
            images={product.images}
        />
    }

    // Recuperer tous les liste des produits artisanaux
    useEffect(() => {
        fetch(`${UrlConfig.apiBaseUrl}/api/artisanat/produits-artisanaux/`)
            .then(res => res.json())
            .then(data => setHandcrafts(data))
            .catch(error => console.log(error));
    }, [])

    if (!handcrafts) {
        return <div>Loading...</div>
    }

    return (
        <>
            <Head>
                <title>Handcraft recherche</title>
            </Head>
            <div className={style.container}>
                <div className={style.filter_header_top}>
                    <div className={style.filter_header_top_title_container}>
                        <span className={style.filter_header_top_title}>{t("handcraft_header_title")}</span>
                        <span className={style.filter_header_top_subtitle}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat explicabo cupiditate </span>
                    </div>
                    <div className={style.filter_parent}>
                        <FilterHandcraft />
                    </div>
                </div>
                <div className={style.filter_header_container}>
                    <span className={style.filter_header_left}>
                        Handcraft  :
                        <span className={style.filter_header_left_bold}> {handcrafts.length} handcraft found</span>
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
                            style={{ width: "100%" }}
                            itemTemplate={itemTemplate}
                            paginator
                            rows={9}
                            layout={"grid"}
                            value={handcrafts}
                            pt={{
                                grid: () => ({
                                    className: style.list_produit
                                })
                            }}
                        />



                    </div>
                </div>
            </div>
        </>
    )
}