import style from './../style/components/ListCheckbox.module.css';
export default function ListCheckbox(props) {
    return(
        <div className={style.container}>
            <span className={style.title}>Distance from downtown</span>
            <div className={style.listCheck}>
                <div className={style.checkbox_container}>
                    <input type='checkbox' className={style.checkbox}/>
                    <span className={style.checkbox_label}>Less than 5km</span>
                </div>
                <div className={style.checkbox_container}>
                    <input type='checkbox' className={style.checkbox}/>
                    <span className={style.checkbox_label}>Less than 5km</span>
                </div>
                <div className={style.checkbox_container}>
                    <input type='checkbox' className={style.checkbox}/>
                    <span className={style.checkbox_label}>Less than 5km</span>
                </div>
                <div className={style.checkbox_container}>
                    <input type='checkbox' className={style.checkbox}/>
                    <span className={style.checkbox_label}>Less than 5km</span>
                </div>
                <div className={style.checkbox_container}>
                    <input type='checkbox' className={style.checkbox}/>
                    <span className={style.checkbox_label}>Less than 5km</span>
                </div>
            </div>
        </div>
    )
}