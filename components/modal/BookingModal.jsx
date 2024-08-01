import { Dialog } from 'primereact/dialog';
import style from './../../style/components/modal/BookingModal.module.css';
import BookingHotelCard from '../card/BookingHotelCard';
import { Button } from 'primereact/button';
export default function BookingModal(props) {

    const headerTemplate = () =>{
        return (
            <div>
                <span>Accommodation/ Hotel / Le Louvre & Spa</span>
            </div>
        )
    }
    
    return(
        <Dialog draggable={false} header={headerTemplate} className={style.dialog_container} visible={props.visible} onHide={props.onHide}>
            <div className={style.container}>
                <div className={style.head_container}>
                    <span className={style.head_title}>Booking Information</span>
                    <span className={style.head_label}>Lorem ipsum dolor sit amet facilisi vero exerci sea erat sit sea duo vero et ut at.</span>
                </div>
                <div className={style.body_container}>
                    <div className={style.body_left}>
                        <div className={style.body_title_container}>
                            <span className={style.body_title_numero}>1</span>
                            <span className={style.body_title_label}>Personal detail</span>
                        </div>
                        <div className={style.form_group_container}>
                                <div className={style.form_group_input}>
                                    <span className={style.form_label}>Firstname</span>
                                    <input 
                                        type="text" 
                                        className={style.form_input} 
                                        placeholder="Enter your firstname"
                                    />
                                </div>
                                <div className={style.form_group_input}>
                                    <span className={style.form_label}>Lastname</span>
                                    <input 
                                        type="text" 
                                        className={style.form_input} 
                                        placeholder="Enter your lastname"
                                    />
                                </div>
                                <div className={style.form_group_input}>
                                    <span className={style.form_label}>Region</span>
                                    <select className={style.form_select_green}>
                                        <option style={{color:"#c3c3c3"}}>Enter your region</option>
                                        <option>Antananarivo</option>
                                    </select>
                                    <span className={style.form_icon}>
                                        <i style={{fontSize:"20px"}} className='pi pi-map-marker'/>
                                    </span>
                                </div>
                                <div className={style.form_group_input}>
                                    <span className={style.form_label}>Phone</span>
                                    <div className={style.input_tel_container}>
                                        <select className={style.form_select_green_mini}>
                                            <option style={{color:"#c3c3c3"}}>+261</option>
                                            <option>+33</option>
                                        </select>
                                        <input className={style.form_input_green} type='text'/>
                                    </div>
                                </div>
                        </div>
                        <div className={style.body_title_container}>
                            <span className={style.body_title_numero}>2</span>
                            <span className={style.body_title_label}>Payement method</span>
                        </div>
                    </div>
                    <div className={style.body_right}>
                        <BookingHotelCard/>
                        <div className={style.ground_rule_container}>
                            <span className={style.ground_rule_title}>Ground rules</span>
                            <div className={style.ground_rule_body}>
                                <span className={style.paragraphe}>
                                    Lorem ipsum dolor sit amet eu possim et. Adipiscing vel et ut in qui et. 
                                    Dolor vulputate dolore aliquip et dolore ut vero aliquam amet rebum sit at lorem duis sanctus. 
                                    Duis aliquyam elitr eirmod ullamcorper ipsum in ut quis sit duo delenit eirmod clita. 
                                    Sed eum justo sit gubergren erat labore justo voluptua dolores et.
                                </span>
                                <ul className={style.list}>
                                    <li>Lorem ipsum dolor sit amet volutpat erat voluptua dolores gubergren sanctus vulputate lorem.</li>
                                    <li>Lorem ipsum dolor sit amet volutpat erat voluptua dolores gubergren sanctus vulputate lorem.</li>
                                    <li>Lorem ipsum dolor sit amet volutpat erat voluptua dolores gubergren sanctus vulputate lorem.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.bottom}>
                    <Button label='Confirm & pay $150' className='button-primary' style={{width:"30%"}}/>
                </div>
            </div>
        </Dialog>
    );

}