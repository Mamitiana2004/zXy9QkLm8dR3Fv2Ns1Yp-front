import { ScrollPanel } from 'primereact/scrollpanel';
import style from './../../style/components/card/TripCard.module.css';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { useRouter } from 'next/router';

export default function TripCard(props) {

    const router = useRouter();

    return(
        <div className={style.container}>
            <Image alt='Hotel' src='/images/hotel/chambre.jpg' imageClassName={style.image_container} />
            <div className={style.hotel_container}>
                <div className={style.hotel_container_top}>
                    <div className={style.hotel_container_top_left}>
                        <span className={style.hotel_container_top_left_title}>The wondeers of Madagascar South West</span>
                        <span className={style.hotel_container_top_left_subtitle}>By Ztrip Mada</span>
                    </div>
                    <span className={style.hotel_container_top_right}>
                        <span className={style.price}>$500/</span>
                        <span>personne</span>
                    </span>
                </div>
                <div className={style.detail}>
                    <span>5 day - 4 nights</span>
                </div>
                <ScrollPanel style={{height:"56px"}}>
                    <span className={style.hotel_description}>Lorem ipsum dolor sit amet sit volutpat elit iusto nostrud accusam ipsum eirmod sed kasd eos takimata ullamcorper. No kasd at. Aliquyam hendrerit in eos amet labore sadipscing elit amet illum erat vel aliquyam consetetur dolor ipsum tempor. Aliquyam ut amet et et tincidunt sed.</span>
                </ScrollPanel>
                <div className={style.bottom}>
                    <span className={style.travel_container}>Travel distance :<span className={style.travel_distance}>960km</span></span>
                    <Button onClick={()=>{router.push(props.href)}} className='button-primary' label='Details'  raised/>
                </div>
            </div>
        </div>
    )
}