import { Dialog } from 'primereact/dialog';
import style from '../../style/components/modal/DetailChambre.module.css';
import { Image } from 'primereact/image';
export default function DetailChambre(props) {

    const headerTemplate = () =>{
        return (
            <div>
                <span>Accommodation/ Hotel / Le Louvre & Spa</span>
            </div>
        )
    }

    let images = [
        {
            id:1,
            imageLink:"/images/hotel/chambre.jpg"
        },
        {
            id:2,
            imageLink:"/images/hotel/hotel2.jpg"
        },
        {
            id:3,
            imageLink:"/images/hotel/hotel3.jpg"
        },
        {
            id:4,
            imageLink:"/images/hotel/hotel4.jpg"
        },
        {
            id:5,
            imageLink:"/images/hotel/hotel.jpg"
        },
        {
            id:6,
            imageLink:"/images/hotel/chambre.jpg"
        },
        {
            id:7,
            imageLink:"/images/hotel/hotel.jpg"
        },
        {
            id:8,
            imageLink:"/images/hotel/hotel.jpg"
        }
    ]

    return(
        <Dialog draggable={false} header={headerTemplate} className={style.dialog_container} visible={props.visible} onHide={props.onHide}>
            <div className={style.container}>
                <div className={style.left}>
                    {
                        images && images.map((image,index)=>{
                            if (index==0) {
                                return <Image className={style.firstImage} imageClassName={style.firstImage} src={image.imageLink} key={image.id} alt='image'/>
                            }
                            else{
                                return <Image className={style.otherImage_container} imageClassName={style.otherImage} src={image.imageLink} key={image.id} alt='image'/>
                            }
                        })
                    }

                </div>
                <div className={style.right}>
                    <div className={style.title_container}>
                        <span className={style.title}>Luxury room - A03</span>
                        <span className={style.price_container}>
                            <span className={style.price_value}>$85</span>
                            <span className={style.price_label}>/night</span>
                        </span>
                    </div>
                    <div className={style.detail_chambre}>
                        <i className='pi pi-user'/>
                        <span className={style.detail_chambre_label}>Superficie :</span>
                        <span className={style.detail_chambre_value}>10 m²</span>
                    </div>
                    <div className={style.detail_chambre}>
                        <i className='pi pi-user'/>
                        <span className={style.detail_chambre_label}>Type :</span>
                        <span className={style.detail_chambre_value}>Double</span>
                    </div>
                    <div className={style.separateur}></div>
                    <div className={style.detail_container}>
                        <span className={style.detail_container_title}>Description</span>
                        <div className={style.paragraphe}>
                        Lorem ipsum dolor sit amet elitr sed sit. Duo et sadipscing dolor
                        e eirmod sanctus sanctus ut sanctus et no. Sea et accusam assum tem
                        por dolor dolor justo justo dolore dolor takimata vero aliquip autem
                        . Et luptatum et sea. Sed voluptua ipsum nonummy dolor velit kasd lore
                        m consetetur at stet nonumy facilisis vero nostrud clita. Takimata 
                        delenit eirmod magna amet ipsum justo clita eos aliquip euismod cli
                        ta. Imperdiet dolores sit diam duo nisl eos kasd aliquyam facilisi 
                        nulla ipsum et facilisi nulla imperdiet dolor ut et. Dolor dolor ta
                        kimata et et nonummy ut sanctus elitr vero justo dolores ut elitr v
                        el amet amet invidunt facilisi. Nonumy ipsum voluptua takimat
                        a facilisis ut ipsum consetetur et et eirmod diam kasd dolore 
                        labore dolor nostrud. Duis sanctus aliquyam nibh ipsum takimata
                         hendrerit rebum odio ut amet duis dolor. Ut suscipit elitr dolores d
                         uo sit. Et elitr stet magna aliquam invidunt sed aliquyam iriure sed 
                         dolore suscipit stet molestie. Stet consetetur consequat ipsum ipsum 
                         stet eum molestie amet blandit aliquyam et elitr eirmod nonumy. Ut suscipit ipsum voluptua augue.
                        </div>
                    </div>
                    <div className={style.detail_container}>
                    <span className={style.detail_container_title}>Amenities</span>
                        <div className={style.amenties_container}>
                            <div className={style.amenties}>
                                <span className={style.amenties_title}>
                                    <i className="pi pi-lock" />
                                    Security
                                </span>
                                <div className={style.amenties_detail_container}>
                                    <span className={style.amenties_detail}>
                                        <i className="pi pi-check"/>
                                        Monitoring camera
                                    </span>
                                    <span className={style.amenties_detail}>
                                        <i className="pi pi-check"/>
                                        Monitoring camera
                                    </span>
                                    <span className={style.amenties_detail}>
                                        <i className="pi pi-check"/>
                                        Monitoring camera
                                    </span>
                                    <span className={style.amenties_detail}>
                                        <i className="pi pi-check"/>
                                        Monitoring camera
                                    </span>
                                </div>
                            </div>
                            <div className={style.amenties}>
                                <span className={style.amenties_title}>
                                    <i className="pi pi-lock" />
                                    Security
                                </span>
                                <div className={style.amenties_detail_container}>
                                    <span className={style.amenties_detail}>
                                        <i className="pi pi-check"/>
                                        Monitoring camera
                                    </span>
                                    <span className={style.amenties_detail}>
                                        <i className="pi pi-check"/>
                                        Monitoring camera
                                    </span>
                                    <span className={style.amenties_detail}>
                                        <i className="pi pi-check"/>
                                        Monitoring camera
                                    </span>
                                    <span className={style.amenties_detail}>
                                        <i className="pi pi-check"/>
                                        Monitoring camera
                                    </span>
                                </div>
                            </div>
                            <div className={style.amenties}>
                                <span className={style.amenties_title}>
                                    <i className="pi pi-lock" />
                                    Security
                                </span>
                                <div className={style.amenties_detail_container}>
                                    <span className={style.amenties_detail}>
                                        <i className="pi pi-check"/>
                                        Monitoring camera
                                    </span>
                                    <span className={style.amenties_detail}>
                                        <i className="pi pi-check"/>
                                        Monitoring camera
                                    </span>
                                    <span className={style.amenties_detail}>
                                        <i className="pi pi-check"/>
                                        Monitoring camera
                                    </span>
                                    <span className={style.amenties_detail}>
                                        <i className="pi pi-check"/>
                                        Monitoring camera
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}