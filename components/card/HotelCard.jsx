import { Image } from 'primereact/image';
import style from './../../style/components/card/HotelCard.module.css';
import { Rating } from 'primereact/rating';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Button } from 'primereact/button';
import { useRouter } from 'next/router';

export default function HotelCard(props) {

    const router = useRouter();

    return(
        <div className={style.container}>
            <Image alt='Hotel' src={props.img} imageClassName={style.image_container} />
            <div className={style.hotel_container}>
                <div className={style.hotel_container_top}>
                    <div className={style.hotel_container_top_left}>
                        <Rating 
                            value={props.rate} 
                            disabled 
                            cancel={false}
                            pt={{
                                onIcon:()=>({
                                    style:{
                                        "color":"#FFD700"
                                    }
                                })
                            }}
                        />
                        <span className={style.note}>{props.rate}</span>
                        <span className={style.view}>{props.view} View{props.view>1 ? "s":""}</span>
                    </div>
                    <span className={style.hotel_container_top_right}>
                        from {props.price}$/night
                    </span>
                </div>
                <div className={style.hotel_title_container}>
                    <span className={style.hotel_title}>{props.name}</span>
                    <span className={style.hotel_title_label}>{props.localisation}</span>
                </div>
                <ScrollPanel style={{height:"56px"}}>
                    <span className={style.hotel_description}>{props.description}</span>
                </ScrollPanel>
                <div className={style.bottom}>
                    <Button className='button-secondary' label='Like' icon="pi pi-heart" raised/>
                    <Button onClick={()=>{router.push(props.href)}} className='button-primary' label='See availability'  raised/>
                </div>
            </div>
        </div>
    )
}