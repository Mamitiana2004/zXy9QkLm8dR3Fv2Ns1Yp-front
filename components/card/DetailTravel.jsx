import { Button } from 'primereact/button';
import style from './../../style/components/card/DetailTravel.module.css';
export default function DetailTravel(props) {


    return(
        <div className={style.container}>
            <div className={style.head_container}>
                <span className={style.head_title}>Travel Details</span>
            </div>
            <div className={style.body_container}>
                <div className={style.detail_container}>
                    <span className={style.detail_label}>Start</span>
                    <span>14-07-2024</span>
                </div>
                <div className={style.detail_container}>
                    <span className={style.detail_label}>End</span>
                    <span>20-07-2024</span>
                </div>
                <div className={style.detail_container}>
                    <span className={style.detail_label}>Available place</span>
                    <span>11</span>
                </div>
                <div className={style.detail_container}>
                    <span className={style.detail_label}>Price</span>
                    <span>$960</span>
                </div>
                <div className={style.detail_container}>
                    <span className={style.detail_label}>Transportation</span>
                    <span>Land</span>
                </div>
            </div>
            <div className={style.description}>Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si</div>
            <Button className={style.bouton} label='Book trip'/>
        </div>
    )
}