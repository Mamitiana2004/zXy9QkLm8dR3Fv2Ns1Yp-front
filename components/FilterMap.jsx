import { Button } from 'primereact/button';
import style from './../style/components/FilterMap.module.css';
import { MapContainer, TileLayer } from "react-leaflet";
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
export default function FilterMap(props) {

    const router = useRouter();
    const {t}= useTranslation();

    const openMap = () =>{
        router.push(`https://www.google.com/maps/@${props.lat},${props.lng},13.66?entry=ttu`);
    }

    return(
        <div className={style.container}>
            <div className={style.container} style={{zIndex:2}}>
                <MapContainer className={style.map} center={[props.lat, props.lng]} zoom={11} zoomControl={false}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            </div>
            <Button onClick={openMap} iconPos='right' className={style.button} icon="pi pi-map-marker" label={t("explore_on_map")}/>
        </div>
    );
}