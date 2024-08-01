import { Image } from 'primereact/image';
import style from '../../style/components/card/BookingHotelCard.module.css';
import { Divider } from 'primereact/divider';
import { ScrollPanel } from 'primereact/scrollpanel';
export default function BookingHotelCard(props) {
    return(
        <div className={style.container}>
            <div className={style.image_container}>
                <Image imageClassName={style.image} src='/images/hotel/chambre.jpg'/>
                <div className={style.image_detail_container}>
                    <span className={style.image_title}>Place to stay | Le Louvre Hotel & Spa</span>
                    <div className={style.image_label_container}>
                        <i style={{fontSize:"12px"}} className='pi pi-map-marker'/>
                        <span>Antanimena, Antananarivo, 101</span>
                    </div>
                </div>
            </div>
            <ScrollPanel style={{width:"320px",height:"241px"}}>
                <div className={style.detail_container}>
                    <div className={style.tour_container}>
                        <span className={style.detail_title}>Tour stay summary</span>
                        <div className={style.separateur}></div>
                        <div className={style.tour_detail_container}>
                            <span className={style.tour_detail}>Check-in</span>
                            <span className={style.tour_value}>2024,July 3</span>
                        </div>
                        <div className={style.tour_detail_container}>
                            <span className={style.tour_detail}>Check-out</span>
                            <span className={style.tour_value}>2024,July 6</span>
                        </div>
                        <div className={style.tour_detail_container}>
                            <span className={style.tour_detail}>Guest</span>
                            <span className={style.tour_value}>3</span>
                        </div>
                        
                    </div>
                    <div className={style.tour_container}>
                        <span className={style.detail_title}>Price breakdown</span>
                        <div className={style.separateur}></div>
                        <div className={style.tour_detail_container}>
                            <span className={style.tour_detail}>$75 x 2 night</span>
                            <span className={style.tour_value}>$150</span>
                        </div>
                        <div className={style.tour_detail_container}>
                            <span className={style.tour_detail}>Cleaning fee</span>
                            <span className={style.tour_value}>$1.75</span>
                        </div>
                        <div className={style.tour_detail_container}>
                            <span className={style.tour_detail}>AirBnb fee</span>
                            <span className={style.tour_value}>$3</span>
                        </div>
                        
                    </div>
                </div>
            </ScrollPanel>
        </div>
    )
}