import { ScrollPanel } from 'primereact/scrollpanel';
import style from './../../style/components/card/TripCard.module.css';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { useRouter } from 'next/router';
import { UrlConfig } from '@/util/config';

export default function TripCard({ href, voyage }) {
    const router = useRouter();

    // Extract the URL of the first image in the couverture_images array
    const imageUrl = voyage.couverture_images && voyage.couverture_images.length > 0
        ? UrlConfig.apiBaseUrl+voyage.couverture_images[0].image
        : '/images/default-image.jpg'; // Fallback image if no images are provided

    return (
        <div className={style.container}>
            <Image alt='Image_Voyages' src={imageUrl} imageClassName={style.image_container} />
            <div className={style.hotel_container}>
                <div className={style.hotel_container_top}>
                    <div className={style.hotel_container_top_left}>
                        <span className={style.hotel_container_top_left_title}>{voyage.nom_voyage}</span>
                        <span className={style.hotel_container_top_left_subtitle}>By - {voyage.nom_tour_operateur}</span>
                    </div>
                    <span className={style.hotel_container_top_right}>
                        <span className={style.price}>${voyage.prix_voyage}/</span>
                        <span>personne</span>
                    </span>
                </div>
                <div className={style.detail}>
                    <span>{voyage.date_debut} - {voyage.date_fin}</span>
                </div>
                <ScrollPanel style={{ height: "56px" }}>
                    <span className={style.hotel_description}>{voyage.description_voyage}</span>
                </ScrollPanel>
                <div className={style.bottom}>
                    <span>{voyage.ville_depart} - {voyage.destination_voyage}</span>
                    <span className={style.travel_container}>
                        Travel distance :<span className={style.travel_distance}>{voyage.distance} km</span>
                    </span>
                    <Button onClick={() => { router.push(href) }} className='button-primary' label='Details' raised />
                </div>
            </div>
        </div>
    );
}
