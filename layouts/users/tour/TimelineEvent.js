import { Timeline } from 'primereact/timeline';
import style from './../../../style/layouts/users/tour/TimelineEvent.module.css';

export default function TimelineEvent({ trajets }) {
    // Function to generate trips with the route description
    const generateTrips = (trajets) => {
        let trips = [];
        
        for (let i = 0; i < trajets.length - 1; i++) {
            const currentTrip = trajets[i];
            const nextTrip = trajets[i + 1];
            
            trips.push({
                date_trajet: currentTrip.date_trajet,
                nom_ville: `${currentTrip.nom_ville} - ${nextTrip.nom_ville}`,
                description_trajet: currentTrip.description_trajet || 'No description available'
            });
        }
        
        return trips;
    };

    const formattedTrips = generateTrips(trajets);

    const numero = (item, index) => {
        return <span className={style.numero}>{index + 1}</span>
    }

    const evenementTemplate = (item) => {
        return (
            <div className={style.evenement_container}>
                <div className={style.evenement_head}>
                    <span className={style.evenementDate}>{item.date_trajet}</span>
                    <span className={style.evenementTitle}>{item.nom_ville}</span>
                </div>
                <div className={style.description}>
                    {item.description_trajet}
                </div>
            </div>
        )
    }

    return (
        <Timeline
            pt={{
                connector: { className: style.connector }
            }}
            className={style.container}
            value={formattedTrips}
            align='left'
            marker={numero}
            content={evenementTemplate}
        />
    );
}
