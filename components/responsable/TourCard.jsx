import { Image } from 'primereact/image';
import style from './../../style/components/responsable/TourCard.module.css';
export default function TourCard(props) {
    return(
        <div onClick={props.onClick} className={style.container}>
            <Image src='/images/tours/aventure.png' imageClassName={style.image} alt=''/>
            <div className={style.tour_detail}>
                <span className={style.title}>The wonders of madagascar</span>
                <div className={style.detail}>
                    <span><i className='pi pi-clock'/>23 Jul 2024 - 28 Jul 2024</span>
                    <span><i className='pi pi-map-marker'/>Antananrivo - Morondava -Toliara</span>
                    <span><i className='pi pi-file-check'/>2 confirmed booking - 3 pending booking</span>
                </div>
            </div>
        </div>
    )
}