import { Timeline } from 'primereact/timeline';
import style from './../../../style/layouts/users/tour/TimelineEvent.module.css';

export default function TimelineEvent({trajets}) {
    const numero = (item,index) =>{
        return <span className={style.numero}>{index+1}</span>
    }

    const evenementTemplate = (item) =>{
        return(
            <div className={style.evenement_container}>
                <div className={style.evenement_head}>
                    <span className={style.evenementDate}>{item.date_trajet}</span>
                    <span className={style.evenementTitle}>{item.nom_ville}</span>
                </div>
                 <div className={style.description}>
                    {item.description_trajet || 'No description available'}
                </div>
            </div>
        )
    } 

    return <Timeline
        pt={{
            connector:{className:style.connector}
        }}
        className={style.container}
        value={trajets} 
        align='left'
        marker={numero}
        content={evenementTemplate}
    />
}