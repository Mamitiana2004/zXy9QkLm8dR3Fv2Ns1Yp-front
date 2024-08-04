import { useEffect, useRef, useState, useContext } from 'react';
import { Image } from 'primereact/image';
import style from '../../style/components/card/ProductCard.module.css';
import { Button } from 'primereact/button';
import { useRouter } from 'next/router';
import { UrlConfig } from '@/util/config';
import { LikeProduct, checkIfClientLikedProduct } from '@/util/Like';
import { Toast } from 'primereact/toast';
import LayoutContext from '@/layouts/context/layoutContext';

export default function ProductCard(props) {
    const router = useRouter();
    const [isLiked, setIsLiked] = useState(false);
    const toast = useRef(null);
    const { user } = useContext(LayoutContext);
    const [nbLike, setNbLike] = useState(props.nb_like);


    const handleButtonClick = () => {
        console.log(props.href);
        if (!props.href) {
            console.error('URL is undefined');
            return;
        }
        router.push(props.href);
    };


    // Always call useEffect, but add condition inside
    useEffect(() => {
        const fetchLikeStatus = () => {
            if (props.id) {
                checkIfClientLikedProduct(props.id).then((liked) => {
                    setIsLiked(liked);
                }).catch((error) => {
                    console.error('Error fetching like status:', error);
                });
            }
        };

        if (user) {
            fetchLikeStatus();
        }
    }, [props.id, user]);

    const coverImage = props.images.find(img => img.couverture)?.image;
    const usedImage = coverImage ? `${UrlConfig.apiBaseUrl}${coverImage}` : props.images[0] ? `${UrlConfig.apiBaseUrl}${props.images[0].image}` : '/images/artisanat/artisanat.jpg';
    const imageUrl = `${usedImage}`;

    const handleLikeClick = () => {
        if (!user) {
            router.push('/users/login');
            return;
        }
        if (props.id) {
            LikeProduct(props.id).then(() => {
                setIsLiked((prev) => !prev);
                setNbLike((prevNbLike) => (isLiked ? prevNbLike - 1 : prevNbLike + 1));
            }).catch((error) => {
                console.error('Error liking the product:', error);
            });
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
                    <span>{nbLike}</span>
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
                    <Button onClick={handleButtonClick} className={style.button} label='View' />
                </div>
            </div>
        </div>
    );
}
