import { useEffect, useState } from 'react';
import style from './../../style/components/images/ViewProduct.module.css';
import { Image } from 'primereact/image';
export default function ViewProduct(props) {

    const [imageView,setImageView]=useState();
    const [idImageView,setIdImageView]=useState();
    let [images,setImages] = useState([
        {imageLien:"/images/artisanat/artisanat.jpg"},
        {imageLien:"/images/hotel/hotel.jpg"},
        {imageLien:"/images/hotel/chambre.jpg"},
        {imageLien:"/images/hotel/hotel2.jpg"},
        {imageLien:"/images/hotel/hotel3.jpg"}
    ]);
    
    useEffect(()=>{
        setImageView(images[0].imageLien);
        setIdImageView(0);
    },[images])

    return(
        <div className={style.container}>
            <div className={style.apercu}>
                <Image imageClassName={style.image} src={imageView} alt="apercu" />
            </div>
            <div className={style.liste_image}>
            {
                images.map((image,key)=>{
                    if (idImageView!=key) {
                        return <Image  key={key} imageClassName={style.mini_image} alt='images' src={image.imageLien} />;
                    }
                })
            }
            </div>
        </div>
    );
}