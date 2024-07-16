import { Button } from 'primereact/button';
import style from './../style/components/FilterMap.module.css';
import { MapContainer, TileLayer } from "react-leaflet";
export default function FilterMap(props) {

   

    return(
        <div className={style.container}>
            <div className={style.container} style={{zIndex:2}}>
                <MapContainer className={style.map} center={[props.lat, props.lng]} zoom={11} zoomControl={false}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            </div>
            <Button iconPos='right' className={style.button} icon="pi pi-map-marker" label='Explore map'/>
        </div>
    );
}