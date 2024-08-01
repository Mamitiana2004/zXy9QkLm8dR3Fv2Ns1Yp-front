// components/RoomAmenities.js
import { UrlConfig } from '@/util/config';
import { useState, useEffect } from 'react';
// import style from './RoomAmenities.module.css';
import style from '@/style/pages/responsable/accommodation/addNewRoom.module.css'

const RoomAmenities = ({ setAmenities }) => {
    const [accessoires, setAccessoires] = useState([]);

    useEffect(() => {
        fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/accessoires-chambre/`)
            .then(response => response.json())
            .then(data => {
                setAccessoires(data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des accessoires :', error);
            });
    }, []);
    const handleCheckboxChange = (amenity, isChecked) => {
        if (isChecked) {
            setAmenities(prev => [...prev, amenity]);
        } else {
            setAmenities(prev => prev.filter(item => item.id !== amenity.id));
        }
    };
    return (
        <div className={style.room_ammenties}>
            {accessoires.map(accessoire => (
                <div key={accessoire.id} className={style.room_ammenties_check_container}>
                    <input type="checkbox" id={`accessoire-${accessoire.id}`}
                        onChange={(e) => handleCheckboxChange(accessoire, e.target.checked)}
                    />
                    <label htmlFor={`accessoire-${accessoire.id}`}>{accessoire.nom_accessoire}</label>
                </div>
            ))}
        </div>
    );
}
export default RoomAmenities;
