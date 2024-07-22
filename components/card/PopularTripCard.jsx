import Image from 'next/image';
import style from './../../style/components/card/PopularTripCard.module.css';
import { ScrollPanel } from 'primereact/scrollpanel';
import Link from 'next/link';
export default function PopularTripCard(props) {
    return(
        <div className={style.container}>
            <Image className={style.image} src={"/images/hotel/hotel3.jpg"} alt={props.name} width={320} height={239} />
            <div className={style.wrapper}>
                <div className={style.title_container}>
                    <div className={style.title_wrapper}>
                        <span className={style.title}>The wonders of SouthWest</span>
                        <span className={style.subtitle}>
                            <i style={{fontSize:"12px"}} className='pi pi-user'/>
                            <span>Ztrip Mada</span>
                        </span>
                    </div>
                    <div className={style.position}>
                        <i style={{fontSize:"12px"}} className='pi pi-map-marker'/>
                        <span>Antananarivo - Tsiribihina -  Morondava</span>
                    </div>
                </div>
                <ScrollPanel style={{ width: '100%', height: '70px' }}>
                    <span className={style.label}>Lorem ipsum dolor sit amet gubergren et dolores rebum vero. Dolor eos dolor stet magna assum magna te dolor veniam nulla tempor diam sanctus possim. Lorem et vel consectetuer dolores justo magna consectetuer et justo lorem nonumy elit. Sit sanctus rebum sit qui eu dolor lobortis at erat takimata nulla consequat sed facilisis at duis.</span>
                </ScrollPanel>
                <Link href={props.href}>
                    <button className={style.button}>
                        View
                    </button>
                </Link>
            </div>

            <div className={style.distance}>
                <Image src={"/images/tours/road.svg"} alt='star' width={14} height={14}/>
                <span>748 km</span>
            </div>
            <div className={style.like}>
                <Image src={"/images/heart.svg"} alt='star' width={14} height={14}/>
                <span>Like</span>
            </div>
        </div>
    )
}