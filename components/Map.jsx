import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

export default function Map(props) {
    return(
        <div style={props.style}>
            <MapContainer style={{width:"100%",height:"100%"}} center={[props.lat, props.lng]} zoom={13}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[props.lat,props.lng]}>
                        <Popup>
                            {props.name}
                        </Popup>
                    </Marker>
            </MapContainer>

        </div>
    )
}