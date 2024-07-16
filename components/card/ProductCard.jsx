import { Image } from 'primereact/image';
import style from '../../style/components/card/ProductCard.module.css';
import { Button } from 'primereact/button';
export default function ProductCard(props) {
    return(
        <div className={style.container}>
            <div className={style.image_container}>
                <Image src={props.image} alt={props.nom} imageClassName={style.image_product} className={style.image_product} />
                <div className={style.rating}>
                    <Image src={"/images/star_filled.svg"} alt='star' width={14} height={14}/>
                    <span>{props.note}</span>
                </div>
                <Button icon="pi pi-shopping-cart" className={style.button} label='Add to cart'/>
            </div>
            <div className={style.wrapper}>
                <div className={style.title_container}>
                    <span className={style.title}>{props.nom}</span>
                </div>
                <span className={style.price}>{props.price}</span>
            </div>
        </div>
    )
}