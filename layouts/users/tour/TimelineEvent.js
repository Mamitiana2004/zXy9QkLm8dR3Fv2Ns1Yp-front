import { Timeline } from 'primereact/timeline';
import style from './../../../style/layouts/users/tour/TimelineEvent.module.css';
export default function TimelineEvent() {

    const events = [
        {date:"14-07-2024",name:"Antananarivo - Miandrivazo with 4X4",description:"ad labore impedit incidunt tempora sed aliquid qui totam ducimus distinctio, quos minus aliquam tempore officiis dolorem quidem amet mollitia, est fugiat. Numquam nihil dolor corrupti, repellat temporibus facilis quisquam odio quam nobis doloribus harum earum quod nostrum voluptatum quia enim iure? Quae molestias magni sint aliquid rerum, veniam aperiam? Voluptas molestias fugiat doloremque dolorum?"},
        {date:"15-07-2024",name:"Antananarivo - Miandrivazo with 4X4",description:"ad labore impedit incidunt tempora sed aliquid qui totam ducimus distinctio, quos minus aliquam tempore officiis dolorem quidem amet mollitia, est fugiat. Numquam nihil dolor corrupti, repellat temporibus facilis quisquam odio quam nobis doloribus harum earum quod nostrum voluptatum quia enim iure? Quae molestias magni sint aliquid rerum, veniam aperiam? Voluptas molestias fugiat doloremque dolorum?"},
        {date:"17-07-2024",name:"Antananarivo - Miandrivazo with 4X4",description:"ad labore impedit incidunt tempora sed aliquid qui totam ducimus distinctio, quos minus aliquam tempore officiis dolorem quidem amet mollitia, est fugiat. Numquam nihil dolor corrupti, repellat temporibus facilis quisquam odio quam nobis doloribus harum earum quod nostrum voluptatum quia enim iure? Quae molestias magni sint aliquid rerum, veniam aperiam? Voluptas molestias fugiat doloremque dolorum?"},
        {date:"18-07-2024",name:"Antananarivo - Miandrivazo with 4X4",description:"ad labore impedit incidunt tempora sed aliquid qui totam ducimus distinctio, quos minus aliquam tempore officiis dolorem quidem amet mollitia, est fugiat. Numquam nihil dolor corrupti, repellat temporibus facilis quisquam odio quam nobis doloribus harum earum quod nostrum voluptatum quia enim iure? Quae molestias magni sint aliquid rerum, veniam aperiam? Voluptas molestias fugiat doloremque dolorum?"}
    ]

    const numero = (item,index) =>{
        return <span className={style.numero}>{index+1}</span>
    }

    const evenementTemplate = (item) =>{
        return(
            <div className={style.evenement_container}>
                <div className={style.evenement_head}>
                    <span className={style.evenementDate}>{item.date}</span>
                    <span className={style.evenementTitle}>{item.name}</span>
                </div>
                <div className={style.description}>
                    {item.description}
                </div>
            </div>
        )
    } 

    return <Timeline
        pt={{
            connector:{className:style.connector}
        }}
        className={style.container}
        value={events} 
        align='left'
        marker={numero}
        content={evenementTemplate}
    />
}