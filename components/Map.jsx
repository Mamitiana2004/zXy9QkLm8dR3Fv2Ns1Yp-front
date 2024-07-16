import { MapContainer, TileLayer } from "react-leaflet";

export default function Map(props) {
    return(
        <div style={props.style}>
            <MapContainer style={{width:"100%",height:"100%"}} center={[props.lat, props.lng]} zoom={13}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
            </MapContainer>

        </div>
    )
}