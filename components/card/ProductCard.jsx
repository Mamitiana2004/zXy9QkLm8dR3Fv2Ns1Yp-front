// import { useState } from 'react';
import { Image } from 'primereact/image';
import style from '../../style/components/card/ProductCard.module.css';
import { Button } from 'primereact/button';
import { useRouter } from 'next/router';
import { UrlConfig } from '@/util/config';
import { LikeProduct, checkIfClientLikedProduct } from '@/util/Like';
import { useEffect } from 'react';
// import React, { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { useContext, useRef, useState } from 'react';
import LayoutContext from '@/layouts/context/layoutContext';



export default function ProductCard(props) {
    const router = useRouter();
    const [isLiked, setIsLiked] = useState(false); 
    const toast = useRef(null);

     const { user, setUser } = useContext(LayoutContext);
    if(user){
        useEffect(() => {
            const fetchLikeStatus = async () => {
                const liked = await checkIfClientLikedProduct(props.id);
                setIsLiked(liked);
            };

            if (props.id) {
                fetchLikeStatus();
            }
        }, [props.id]);
    }

    const coverImage = props.images.find(img => img.couverture)?.image;
    const usedImage = coverImage ? coverImage : props.images[0].image;
    const imageUrl = usedImage ? `${UrlConfig.apiBaseUrl}${usedImage}` : '/images/artisanat/artisanat.jpg';

    const handleLikeClick = () => {
        if (!user) {
            router.push('/users/login');
            return;
        }
        if (props.id) {
            const like = LikeProduct(props.id);
            console.log(like);// Pass toast reference
                // setIsLiked(like);

            setIsLiked(prev => !prev);   
        } else {
            console.error('Product ID is undefined');
        }
    };

    return (
        <div className={style.container}>
            <div className={style.image_container}>
                <Image
                    src={imageUrl}
                    alt={props.nom_produit}
                    imageClassName={style.image_product}
                    className={style.image_product}
                />
                <div className={style.background}></div>
                {props.discount != null && (
                    <div className={style.discount}>
                        <span>-{props.discount}%</span>
                    </div>
                )}
                <Toast ref={toast} /> 
                <button
                    onClick={handleLikeClick}
                    className={style.like_container}
                >
                    <i className={`pi ${isLiked ? 'pi-heart-fill' : 'pi-heart'}`} />
                </button>
                <div className={style.product_detail}>
                    <div className={style.product_detail_container}>
                        <div className={style.product_detail_wrapper}>
                            <div className={style.product_detail_title_container}>
                                <span className={style.product_detail_title}>{props.nom_produit}</span>
                                <span className={style.product_detail_subtitle}>By {props.by}</span>
                            </div>
                            <span className={style.product_detail_price}>{props.prix}</span>
                        </div>
                        <span className={style.product_detail_position}>
                            <i className='pi pi-map-marker' />
                            {props.location}
                        </span>
                    </div>
                    <Button onClick={() => router.push(props.href)} className={style.button} label='View' />
                </div>
            </div>
        </div>
    );
}

