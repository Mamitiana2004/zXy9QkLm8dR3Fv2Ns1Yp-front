import { useState, useEffect } from 'react';
import { Image } from 'primereact/image';
import style from '../../style/components/card/DetailProduct.module.css';
import ViewProduct from '../images/ViewProduct';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';
import { InputNumber } from 'primereact/inputnumber';
import { UrlConfig } from '@/util/config';
import { useRouter } from "next/router";

// Fonction pour formater les critiques en notation lisible
const formatReviews = (count) => {
    if (count >= 1000) {
        return (count / 1000).toFixed(1) + 'k';
    }
    return count;
};

// Fonction pour calculer la note moyenne
const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.note, 0);
    return (totalRating / reviews.length).toFixed(1);
};

export default function DetailProduct(props) {
    const [product, setProduct] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            fetch(`${UrlConfig.apiBaseUrl}/api/artisanat/produit/${id}/`)
                .then(response => response.json())
                .then(data => setProduct(data))
                .catch(error => console.error('Error fetching product:', error));
        }
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    // Calculer la note moyenne
    const averageRating = calculateAverageRating(product.avis_clients);
    // Compter le nombre de critiques
    const reviewCount = formatReviews(product.avis_clients.length || 0);

    return (
        <div className={style.container}>
            <div className={style.left}>
                <div className={style.image_view_container}>
                    <ViewProduct images={product.images} />
                </div>
                <div className={style.legend_image}>
                    <span className={style.legend}>
                        <Image src='/images/artisanat/garantie.svg'/>
                        Guarantee for 30 days
                    </span>
                    <span className={style.legend}>
                        <Image src='/images/artisanat/hand.svg'/>
                        100% Malagasy home-made 
                    </span>
                </div>
                <div className={style.review_container}>
                    <div className={style.note_container}>
                        <span className={style.note}>{averageRating}</span>
                        <div className={style.detail_note}>
                            <Rating 
                                value={averageRating} 
                                disabled 
                                cancel={false}
                                pt={{
                                    onIcon:()=>({
                                        style:{
                                            "color":"#FFD700"
                                        }
                                    })
                                }}
                            />
                            <span className={style.review_detail}>{reviewCount} reviews</span>
                        </div>
                    </div>
                    <Button className='button-primary' label='See reviews'/>
                </div>
            </div>
            <div className={style.right}>
                <div className={style.right_head_container}>
                    <div className={style.right_head_left_container}>
                        <span className={style.breadcrumd}>Handcraft / Basketry / Sac</span>
                        <span className={style.right_head_title}>{product.nom_produit_artisanal}</span>
                        <div className={style.right_head_detail}>
                            <span>Store : {product.artisanat.nom_artisanat}</span>
                            <span>{product.artisanat.localisation_artisanat.ville} - {product.artisanat.localisation_artisanat.adresse}</span>
                        </div>
                    </div>
                    <span className={style.price}>${product.prix_artisanat}</span>
                </div>
                <ScrollPanel style={{height:"245px"}}>
                    <div className={style.description}>
                        {product.description_artisanat}
                    </div>
                </ScrollPanel>
                <div className={style.specification_container}>
                    {/* Specification gauche */}
                    <div className={style.specification_column}>
                        <div className={style.specification_title}>Specification</div>
                        <ul className={style.specification_list}>
                            {product.specifications
                                .filter((_, index) => index % 2 === 0) 
                                .map((spec, index) => (
                                    <li key={index} className={style.specification_item}>
                                        {spec.type_specification}
                                    </li>
                                ))}
                        </ul>
                    </div>

                    {/* Specification droite */}
                    <div className={style.specification_column}>
                        <div className={style.specification_title}>Specification</div>
                        <ul className={style.specification_list}>
                            {product.specifications
                                .filter((_, index) => index % 2 !== 0)
                                .map((spec, index) => (
                                    <li key={index} className={style.specification_item}>
                                        {spec.type_specification}
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>


                <div className={style.right_bottom_container}>
                    <div className={style.quantity_container}>
                        <span className={style.quantity_label}>Quantity :</span>
                        <InputNumber inputClassName={style.quantity}/>
                    </div>
                    <div className={style.button_group}>
                        <Button icon="pi pi-shopping-cart" raised label='Add to cart' className='button-secondary'/>
                        <Button icon="pi pi-shopping-bag" label='Buy now' className='button-primary'/>
                    </div>
                </div>
            </div>
        </div>
    );
}
