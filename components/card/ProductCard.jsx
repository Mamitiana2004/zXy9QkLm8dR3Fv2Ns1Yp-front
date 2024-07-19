import { Image } from 'primereact/image';
import style from '../../style/components/card/ProductCard.module.css';
import { Button } from 'primereact/button';
import { useRouter } from 'next/router';
export default function ProductCard(props) {

    const router= useRouter();

    return(
        <div className={style.container}>
            <div className={style.image_container}>
                <Image src={"/images/artisanat/artisanat.jpg"} alt={props.nom} imageClassName={style.image_product} className={style.image_product} />
                <div className={style.background}></div>
                {
                    props.discount!=null ?
                    <>
                        <div className={style.discount}>
                            <span>-{props.discount}%</span>
                        </div>
                    </>
                    :
                    <>
                    </> 
                }
                <div className={style.like_container}>
                    <i className='pi pi-heart'/>
                </div>
                <div className={style.product_detail}>
                    <div className={style.product_detail_container}>
                        <div className={style.product_detail_wrapper}>
                            <div className={style.product_detail_title_container}>
                                <span className={style.product_detail_title}>{props.nom_produit}</span>
                                <span className={style.product_detail_subtitle}>By {props.by}</span>
                            </div>
                            <span className={style.product_detail_price}>{props.prix}</span>
                        </div>
                        <span className={style.product_detail_position}>
                            <i className='pi pi-map-marker'/>
                            {props.location}
                        </span>
                    </div>
                    <Button onClick={()=>router.push(props.href)} className={style.button} label='View'/>
                </div>
            </div>
        </div>
    )
}