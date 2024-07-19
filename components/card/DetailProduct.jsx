import { Image } from 'primereact/image';
import style from '../../style/components/card/DetailProduct.module.css';
import ViewProduct from '../images/ViewProduct';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';
import { InputNumber } from 'primereact/inputnumber';

export default function DetailProduct(props) {



    return (
        <div className={style.container}>
            <div className={style.left}>
                <div className={style.image_view_container}>
                    <ViewProduct/>
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
                        <span className={style.note}>4</span>
                        <div className={style.detail_note}>
                            <Rating 
                                value={4} 
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
                            <span className={style.review_detail}>1.5k reviews</span>
                        </div>
                    </div>
                    <Button className='button-primary' label='See reviews'/>
                </div>
            </div>
            <div className={style.right}>
                <div className={style.right_head_container}>
                    <div className={style.right_head_left_container}>
                        <span className={style.breadcrumd}>Handcraft / Basketry / Sac</span>
                        <span className={style.right_head_title}>Raffia Bag ysl trend 2024</span>
                        <div className={style.right_head_detail}>
                            <span>Store : Tik’Art</span>
                            <span>Ivato - Antananarivo 101</span>
                        </div>
                    </div>
                    <span className={style.price}>$25.5</span>
                </div>
                <ScrollPanel style={{height:"245px"}}>
                    <div className={style.description}>
                    Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dol
                    or emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem
                    ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor eme
                    t si Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsu
                    m dolor emet si Lorem ipsum dolor emet siLorem ipsum dolor emet siLo
                    rem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor
                    emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet siLorem i
                    psum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor eme
                    t si Lorem ipsum dolor eme t si Lorem ipsum dolor emet si Lorem ipsu
                    m dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet si 
                    Lorem ipsum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolo
                    r emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet siLorem i
                    psum dolor emet si Lorem ipsum dolor emet si Lorem ipsum dolor emet 
                    si Lorem ipsum dolor emet si Lorem ipsum dolor emet si
                    </div>
                </ScrollPanel>
                <div className={style.specification_container}>
                    <span className={style.specification_title}>Specificication</span>
                    <div className={style.specification_body}>
                        <ul>
                            <li>Lorem ipsum dolor emet si</li>
                            <li>Lorem ipsum dolor emet si</li>
                            <li>Lorem ipsum dolor emet si</li>
                            <li>Lorem ipsum dolor emet si</li>
                        </ul>
                        <ul>
                            <li>Lorem ipsum dolor emet si</li>
                            <li>Lorem ipsum dolor emet si</li>
                            <li>Lorem ipsum dolor emet si</li>
                            <li>Lorem ipsum dolor emet si</li>
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
    )
}