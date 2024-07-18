import { Calendar } from 'primereact/calendar';
import style from './../style/components/Filter.module.css';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { useEffect, useState } from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
export default function Filter(props) {

    const [locationSelected,setLocationSelected] = useState(null);
    const [location,setLocation] = useState([]);
    const getAllLocation = () =>{
        fetch("/api/region/getAll")
        .then(res=>res.json())
        .then(data=>setLocation(data))
        .catch(error=>console.log(error));
    }

    const [check_in,setCheck_in]=useState();
    const [check_out,setCheck_out]=useState();
    const [guest,setGuest]=useState();

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
                    id='location-select' 
                    value={locationSelected} 
                    onChange={(e)=>setLocationSelected(e.value)}
                    options={location}
                    optionLabel={"nom"}
                />
                <label className={style.dropdown_label} htmlFor='location-select'>
                    <i className='pi pi-map-marker'/>
                    Localisation
                </label>
            </FloatLabel>
            <FloatLabel>
                <Calendar 
                    value={check_in}
                    onChange={(e)=>setCheck_in(e.value)}
                    id='check_in'
                    inputClassName={style.calendar}
                    className={style.calendar}
                />
                <label className={style.dropdown_label} htmlFor='check_in'>
                    <i className='pi pi-calendar-times'/>
                    Check in
                </label>
            </FloatLabel>
            <FloatLabel>
                <Calendar 
                    value={check_out}
                    onChange={(e)=>setCheck_out(e.value)}
                    id='check_out'
                    inputClassName={style.calendar}
                    className={style.calendar}
                />
                <label className={style.dropdown_label} htmlFor='check_out'>
                    <i className='pi pi-calendar-times'/>
                    Check out
                </label>
            </FloatLabel>
            <FloatLabel>
                <InputNumber value={guest} onChange={(e)=>setGuest(e.value)} inputClassName={style.input_number} id='guest'/>
                <label className={style.dropdown_label} htmlFor='check_out'>
                    <i className='pi pi-users'/>
                    Guest
                </label>
            </FloatLabel>
            <Button icon="pi pi-search" label='Search' className='button-primary'/>
        </div>
    )
}