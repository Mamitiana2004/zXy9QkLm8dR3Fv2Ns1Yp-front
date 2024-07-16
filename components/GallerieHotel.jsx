import { Dialog } from 'primereact/dialog';
import style from './../style/components/GallerieHotel.module.css';
import { Galleria } from "primereact/galleria";
import { Image } from "primereact/image";
import { useEffect, useRef, useState } from "react";

export default function GallerieHotel(props) {
 
    const gallerie = useRef(null);
    const [activeIndex,setActiveIndex] = useState(0);
    const [allPhotoVisible,setAllPhotoVisible] = useState(false);

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

    const nombreImageNonAffiche = () =>{
        let nombreImage = images.length;
        return nombreImage - 5;
    }


    const itemTemplate =(item)=>{
        return <Image alt='image' style={{ width: '100%', display: 'block' }} src={item.imageLink}/>;
    }
    const thumbnails =(item)=>{
        return <Image alt='image' style={{ display: 'block' }} src={item.imageLink}/>;
    }


    
    

    return(
        <>
            <Galleria 
                ref={gallerie} 
                value={images} 
                numVisible={7}
                activeIndex={activeIndex}
                onItemChange={(e) => setActiveIndex(e.index)}
                circular 
                fullScreen 
                showItemNavigators 
                showThumbnails={false} 
                item={itemTemplate}
                thumbnail={thumbnails}
            />
            <div className={style.container}>
                    {
                        images && images.map((image, index) => {
                            if (index==0) {
                                return <Image 
                                        key={index}
                                        style={{ cursor: 'pointer' }} 
                                        onClick={() => {setActiveIndex(index); gallerie.current.show()}}
                                        src={image.imageLink} 
                                        imageClassName={style.firstImage}
                                        alt='image'
                                    />;   
                            }
                        })
                    }
                    <div className={style.other_image_container}>
                        {
                            images && images.map((image, index) => {
                                if (index!=0 && index<4) {
                                    return <Image 
                                            key={index}
                                            style={{ cursor: 'pointer' }} 
                                            onClick={() => {setActiveIndex(index); gallerie.current.show()}}
                                            src={image.imageLink} 
                                            imageClassName={style.otherImage}
                                            alt='image'
                                        />;   
                                }
                            })
                        }
                        {
                            images && images.map((image, index) => {
                                if (index==4) {
                                    return (
                                        <div key={index} onClick={()=>setAllPhotoVisible(true)} className={style.all_otherImage_container}>
                                            <Image 
                                                key={index}
                                                style={{ cursor: 'pointer' }} 
                                                src={image.imageLink} 
                                                imageClassName={style.otherImage}
                                                alt='image'
                                            /> 
                                            <div className={style.all_otherImage}>
                                                +{nombreImageNonAffiche()} photo{nombreImageNonAffiche()<1 ? "" : "s"}
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
            </div>

            <Dialog onHide={() => setAllPhotoVisible(false)} visible={allPhotoVisible} maximizable style={{ width: '70vw' }}>
                <div className={style.listePhoto}>
                    {
                        images && images.map((image, index) => {
                            return <Image 
                                    key={index}
                                    style={{ cursor: 'pointer' }} 
                                    onClick={() => {setActiveIndex(index); gallerie.current.show()}}
                                    src={image.imageLink} 
                                    imageClassName={style.list_image_item}
                                    alt='image'
                                />;  
                        })
                    }
                </div>
            </Dialog>
        </>
    )
}