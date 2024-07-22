import Image from 'next/image';
import style from '../../style/components/card/CardSuggestion.module.css'
import { ScrollPanel } from 'primereact/scrollpanel';
import { useTranslation } from 'react-i18next';
export default function CardSuggestion(props) {

    const {t} = useTranslation();

    return(
        <div className={style.container}>
            <Image className={style.image} src={props.image} alt={props.name} width={382} height={239} />
            <div className={style.wrapper}>
                <div className={style.title_container}>
                    <span className={style.title}>{props.name}</span>
                    <div className={style.position}>
                        <i style={{fontSize:"12px"}} className='pi pi-map-marker'/>
                        <span>{props.localisation}</span>
                    </div>
                </div>
                <ScrollPanel style={{ width: '100%', height: '70px' }}>
                    <span className={style.label}>{props.description}</span>
                </ScrollPanel>
                <button onClick={props.onClick} className={style.button}>
                    View
                </button>
            </div>

            <div className={style.rating}>
                <Image src={"/images/star_filled.svg"} alt='star' width={14} height={14}/>
                <span>{props.note}</span>
            </div>
            <div className={style.like}>
                <Image src={"/images/heart.svg"} alt='star' width={14} height={14}/>
            </div>
        </div>
    );
}

