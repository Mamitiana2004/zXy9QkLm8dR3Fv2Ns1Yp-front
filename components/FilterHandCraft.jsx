import { FloatLabel } from 'primereact/floatlabel';
import style from './../style/components/FilterHandcraft.module.css';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { useEffect, useState } from 'react';
export default function FilterHandcraft(props) {

    const [store,setStore]=useState([]);
    const [storeSelected,setStoreSelected]=useState([]);

    const [type,setType]=useState([]);
    const [typeSelected,setTypeSelected]=useState([]);

    const [locationSelected,setLocationSelected] = useState(null);
    const [location,setLocation] = useState([]);
    const getAllLocation = () =>{
        fetch("/api/region/getAll")
        .then(res=>res.json())
        .then(data=>setLocation(data))
        .catch(error=>console.log(error));
    }

    useEffect(()=>{
        getAllLocation();
    },[])

    return(
        <div className={style.container}>
            <FloatLabel>
            <Dropdown 
                    pt={{
                        trigger: { className: style.dropdown_trigger }
                    }}
                    className={style.dropdown}
                    id='operator-select' 
                    value={storeSelected} 
                    onChange={(e)=>setStoreSelected(e.value)}
                    options={store}
                    optionLabel={"name"}
                />
                <label className={style.dropdown_label} htmlFor='operator-select'>
                    <i className='pi pi-shop'/>
                    Handcraft store
                </label>
            </FloatLabel>
            <FloatLabel>
                <Dropdown 
                    pt={{
                        trigger: { className: style.dropdown_trigger }
                    }}
                    className={style.dropdown}
                    id='location-select' 
                    value={locationSelected} 
                    onChange={(e)=>setLocationSelected(e.value)}
                    options={location}
                    optionLabel={"nom"}
                />
                <label className={style.dropdown_label} htmlFor='location-select'>
                    <i className='pi pi-map-marker'/>
                    Location
                </label>
            </FloatLabel>
            <FloatLabel>
                <Dropdown
                    pt={{
                        trigger: { className: style.dropdown_trigger }
                    }}
                    className={style.dropdown}
                    id='location-select' 
                    value={typeSelected} 
                    onChange={(e)=>setTypeSelected(e.value)}
                    options={type}
                    optionLabel={"nom"}
                />
                <label className={style.dropdown_label} htmlFor='periode'>
                    <i className='pi pi-users'/>
                    Handcraft type
                </label>
            </FloatLabel>
            <Button      icon="pi pi-search" label='Search' className='button-primary'/>
        </div>
    )
}