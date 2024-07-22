import { Button } from 'primereact/button';
import style from './../style/components/FilterMap.module.css';
import { useRouter } from 'next/router';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
export default function FilterMap(props) {

    const router = useRouter();

    const openMap = () =>{
        router.push(`https://www.google.com/maps/@${props.lat},${props.lng},13.66?entry=ttu`);
    }

    return(
        <div className={style.container}>
            <div className={style.container} style={{zIndex:2}}>
                <LoadScript
                    googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API}
                >
                    <GoogleMap
                        mapContainerClassName={style.map}
                        center={{lat:props.lat,lng:props.lng}}
                        zoom={16}
                        options={{ mapTypeId: 'satellite' }}
                    />
                </LoadScript>
            </div>
            <Button onClick={openMap} iconPos='right' className={style.button} icon="pi pi-map-marker" label='Explore map'/>
        </div>
    );
}