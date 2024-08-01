import Head from "next/head";
import style from './../../../style/pages/users/accommodation/id.module.css';
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import GallerieHotel from "@/components/GallerieHotel";
import { TabPanel, TabView } from "primereact/tabview";
import dynamic from "next/dynamic";
import { Rating } from "primereact/rating";
import NoteBar from "@/components/rating/NoteBar";
import { Divider } from "primereact/divider";
import { ScrollPanel } from "primereact/scrollpanel";
import BookingModal from "../../../components/modal/BookingModal";
import { useEffect, useState } from "react";
import DetailChambre from "@/components/modal/DetailChambre";
import Filter from "@/components/Filter";
import { useRouter } from "next/router";
import { UrlConfig } from "@/util/config";
import { FloatLabel } from 'primereact/floatlabel';
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
        


const Map = dynamic(()=> import('@/components/Map'),{ssr:false});

export default function HotelInfos() {

    const router = useRouter();

    const [allAccessoirce,setAllAccessoire]= useState([]);
    const [accessoireUtil,setAccessoireUtil]= useState([]);


    const { id } = router.query;

    const [guest,setGuest] = useState(null);
    const [check,setCheck] = useState(null);

    const [discount,setDiscount] = useState(0);
    const [chambreSelected,setChambreSelected] = useState([]);

    const [bookingVisible,setBookingVisible]=useState(false);
    const [availability, setAvailability] = useState(false);
    const [data, setData] = useState(false);
    const [imageHotel, setImageHotels] = useState(false);
    const [chambre, setChambre] = useState([]);
    const [chambre_id, setChambre_id] = useState(false);
    const [accessoires, setAccessoires] = useState({});
    const [accessoiresHaves, setAccessoiresHaves] = useState([]);


    const checkAvailability = () =>{
        guest && console.log("Guest :",guest);
        if (check!=null && check.length!=0) {
            console.log("Date check in",new Date(check[0]));
            console.log("Date check out",new Date(check[1]));
        }
    }

    
    
    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
                try {
                    const response = await fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/get-id-hebergement/${id}/`);
                    if (!response.ok) {
                        throw new Error('Erreur lors de la récupération des données');
                    }
                    const result = await response.json();

                    console.log(result);
                    setData(result);
                    if(result.accessoires && result.accessoires_haves.length!=0 && result.accessoires_haves) {
                        setAllAccessoire(result.accessoires);
                        let accessoireData =[];
                        let accValue = [];
                        result.accessoires_haves.map((a)=>{
                            let type=a.type_accessoire_nom;
                            if (type) {
                                if (!accessoireData.includes(type)) {
                                    accessoireData.push(type);
                                }
                            }
                        })
                        accessoireData.map((a)=>{
                            let accessoireDataID=[];
                            result.accessoires_haves.map((have)=>{
                                let type=have.type_accessoire_nom;
                                if (type) {
                                    if (a == type) {
                                        accessoireDataID.push(have);
                                    }
                                }
                            })
                            accValue.push({
                                type:a,
                                id:accessoireDataID
                            });
                        })
                        setAccessoireUtil(accValue);
                    }
                    if (result.images) setImageHotels(result.images);
                    if (result.chambres) setChambre(result.chambres);
                    if (result.accessoires) setAccessoires(result.accessoires);
                    if (result.accessoires_haves) setAccessoiresHaves(result.accessoires_haves);
                } catch (error) {
                    console.error('Erreur:', error);
                }
        };

        fetchData();
    }, [id]);
    
    const panelClassName = (parent, index) => {
        if (parent.state.activeIndex === index)
            return style.tab_active;
        else 
            return style.tab;
    }


    
    

    const selectChambre = (room)=>{
        let chambreCopy = [];
        let find=false;
        chambreSelected.map((c)=>{
            console.log(c.id,room.id);
            if (c.id != room.id) {
                chambreCopy.push(c);
            }
            else{
                find=true;
            }
        })
        if (chambreCopy.length==0 || !find) {
            chambreCopy.push(room);
        }
        console.log(chambreCopy);
        setChambreSelected(chambreCopy);
    }

    const getPriceChambreSelected = () =>{
        let price =0;
        chambreSelected.map((c)=>{
            price+=parseFloat(c.prix_nuit_chambre);
        })
        return price;
    }

    const renderAmenities = () => {
        if (!accessoireUtil.length) return <p>No amenities available.</p>;

        return accessoireUtil.map((acc, index) => (
            <div key={index} className={style.amenties}>
                <span className={style.amenties_title}>
                    <i className="pi pi-lock" />
                    {acc.type}
                </span>
                <div className={style.amenties_detail_container}>
                    {acc.id.length > 0 ? (
                        acc.id.map((item, i) => (
                            <span key={i} className={style.amenties_detail}>
                                <i className={"pi pi-check"} />
                                {item.nom_accessoire}
                            </span>
                        ))
                    ) : (
                        <p>No items available.</p>
                    )}
                </div>
            </div>
        ));
    };

    const applyDiscount=()=> {
        if (getPriceChambreSelected() < 0 || discount < 0 || discount > 100) {
          throw new Error("Invalid input: getPriceChambreSelected() and discount must be non-negative, and discount must be between 0 and 100.");
        }
        const discountAmount = (getPriceChambreSelected() * discount) / 100;
        const finalPrice = getPriceChambreSelected() - discountAmount;
        return finalPrice;
    }

    return(
        <>
            <Head>
                <title>Accommodation</title>
            </Head>

            <div className={style.container}>
                <div className={style.filter_header_top}>
                    <div className={style.filter_header_top_title_container}>
                        <span className={style.filter_header_top_title}>Find your best accommodation on Hotello</span>
                        <span className={style.filter_header_top_subtitle}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat explicabo cupiditate </span>
                    </div>
                    <div className={style.filter_parent}>
                        <Filter/>
                    </div>
                </div>
                <div className={style.header_container}>
                    <div className={style.header_left}>
                        <span className={style.header_left_title}>{data.nom_hebergement}</span>
                        <div className={style.header_left_detail}>
                            <Image alt="star" src="/images/star_filled.svg"/>
                            <span>{data.nombre_etoile_hebergement}</span>
                            <span className={style.header_left_review}> ( {data.avis_hotel ? data.avis_hotel.length : 0} reviews )</span>
                            <span className={style.header_left_localisation}>
                                <i className='pi pi-map-marker'/>
                                {data.localisation?.adresse}, {data.localisation?.ville}
                            </span>
                        </div>  
                    </div>
                    <div className={style.header_right}>
                        <div className={style.header_right_button_container}>
                            <Button raised icon="pi pi-heart" rounded text className={style.header_right_button}/>
                            <span className={style.header_right_button_label}>Like</span>
                        </div>
                        <div className={style.header_right_button_container}>
                            <Button raised icon="pi pi-send" rounded text className={style.header_right_button}/>
                            <span className={style.header_right_button_label}>Share</span>
                        </div>
                        <div className={style.header_right_button_container}>
                            <Button raised icon="pi pi-save" rounded text className={style.header_right_button}/>
                            <span className={style.header_right_button_label}>Save</span>
                        </div>
                    </div>
                </div>
                {imageHotel.length > 0 && <GallerieHotel images={imageHotel} />}
                <div className={style.body_accommodation}>
                    <TabView
                        pt={{
                            root: { className: style.tab_container },
                            panelContainer:{ className: style.tab_container },
                            navContainer:{ className: style.tab_container }
                        }}
                    >
                        <TabPanel
                            pt={{
                                headerAction:({parent})=>({
                                    className: panelClassName(parent,0)
                                }),
                                header:{ className: style.tab_container }
                            }}
                            header="Overview"
                        >
                        <div className={style.overview}>
                             <div className={style.accommodation_detail}>
                            <span className={style.accommodation_detail_title}>Description</span>
                            <div className={style.paragraphe}>
                                {data?.description_hebergement || 'No description available'}
                            </div>
                        </div>
                              <div className={style.accommodation_detail}>
                                <span className={style.accommodation_detail_title}>Amenities</span>
                                <div className={style.amenties_container}>
                                    {renderAmenities()}
                                </div>
                            </div>
                            <div className={style.accommodation_detail}>
                                <span className={style.accommodation_detail_title}>Reviews & ratings</span>
                                <div className={style.review_container}>
                                    <div className={style.note_container_header}>
                                        <div className={style.note_container_header_left}>
                                            <span className={style.note_container_header_label}>{data.nombre_etoile_hebergement}</span>
                                            <div className={style.note_container_header_value}>
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
                                                <span className={style.note_container_header_left_review}>( {data.avis_hotel ? data.avis_hotel.length : 0} reviews )</span>
                                            </div>
                                        </div>
                                        <Button className={style.button_review_filter} label="Filter" icon="pi pi-filter"/>
                                    </div>
                                    <div className={style.note_content_container}>
                                        <NoteBar
                                            label="Value for money"
                                            value={4}
                                            valueMax={5}
                                        />
                                        <NoteBar
                                            label="Staff"
                                            value={2.8}
                                            valueMax={5}
                                        />
                                        <NoteBar
                                            label="Comfort"
                                            value={3.2}
                                            valueMax={5}
                                        />
                                        <NoteBar
                                            label="Facilitites"
                                            value={2.1}
                                            valueMax={5}
                                        />
                                    </div>
                                </div>
                                <Button style={{width:"250px"}} label="See all reviews" className="button-primary"/>
                            </div> 
                            <div className={style.accommodation_detail}>
                                <span className={style.accommodation_detail_title}>Map</span>
                                {data.localisation?.latitude && data.localisation?.longitude ? (
                                    <Map 
                                        style={{ width: "100%", height: 500 }}
                                        lat={data.localisation.latitude}
                                            lng={data.localisation.longitude}
                                            name = {data.nom_hebergement}
                                    />
                                ) : (
                                    <p>Loading map...</p>
                                )}
                            </div>

                        </div>
                        </TabPanel>
                        <TabPanel
                            pt={{
                                headerAction: ({ parent }) => ({
                                    className: panelClassName(parent, 1)
                                }),
                                header: { className: style.tab_container }
                            }}
                            header="Amenities"
                        >
                            <div className={style.accommodation_detail}>
                                <span className={style.accommodation_detail_title}>Amenities</span>
                                <div className={style.amenties_container}>
                                    {renderAmenities()}
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel
                            pt={{
                                headerAction:({parent})=>({
                                    className: panelClassName(parent,2)
                                }),
                                header:{ className: style.tab_container }
                            }}
                            header="Reviews"
                        >
                            <div className={style.accommodation_detail}>
                                <span className={style.accommodation_detail_title}>Reviews & ratings</span>
                                <div className={style.review_container}>
                                    <div className={style.note_container_header}>
                                        <div className={style.note_container_header_left}>
                                            <span className={style.note_container_header_label}>{ data.nombre_etoile_hebergement}</span>
                                            <div className={style.note_container_header_value}>
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
                                                <span className={style.note_container_header_left_review}>( {data.avis_hotel ? data.avis_hotel.length : 0} reviews )</span>
                                            </div>
                                        </div>
                                        <Button className={style.button_review_filter} label="Filter" icon="pi pi-filter"/>
                                    </div>
                                    {/* <div className={style.note_content_container}>
                                        <NoteBar
                                            label="Value for money"
                                            value={4}
                                            valueMax={5}
                                        />
                                        <NoteBar
                                            label="Staff"
                                            value={2.8}
                                            valueMax={5}
                                        />
                                        <NoteBar
                                            label="Comfort"
                                            value={3.2}
                                            valueMax={5}
                                        />
                                        <NoteBar
                                            label="Facilitites"
                                            value={2.1}
                                            valueMax={5}
                                        />
                                    </div> */}
                                </div>
                                <Button style={{width:"250px"}} label="See all reviews" className="button-primary"/>
                            </div>  
                        </TabPanel>
                        <TabPanel
                            pt={{
                                headerAction:({parent})=>({
                                    className: panelClassName(parent,3)
                                }),
                                header:{ className: style.tab_container }
                            }}
                            header="Policies"
                        >

                        </TabPanel>
                        <TabPanel
                            pt={{
                                headerAction:({parent})=>({
                                    className: panelClassName(parent,4)
                                }),
                                header:{ className: style.tab_container }
                            }}
                            header="Map"
                        >
                            <Map 
                                style={{width:"100%",height:500}}
                                lat={-18.9433924}
                                lng={47.5288271}
                                name="Hotel le Louvre & spa"
                            />
                        </TabPanel>
                    </TabView>  
                    <div className={style.accommodation_card_container}>
                        <div className={style.accommodation_card}>
                            <div className={style.card_check_header}>
                                <span className={style.check_price_container}><span className={style.check_price}>$90</span>/night</span>
                                <div className={style.card_check_header_right}>
                                    <Image src="/images/star_filled.svg" alt="star" />
                                    <span>4</span>
                                    <span style={{textDecoration:"underline"}}>( {data.avis_hotel ? data.avis_hotel.length : 0} reviews )</span>
                                </div>
                            </div>
                            <div className={style.check_parent}>
                                    <FloatLabel>
                                    <Calendar dateFormat="dd-mm-yy" className={style.input_number} id="check" value={check} onChange={(e) => setCheck(e.value)} selectionMode="range" readOnlyInput hideOnRangeSelection />
                                        <label htmlFor="check">Check in | Check out</label>
                                    </FloatLabel>
                                    <FloatLabel>
                                        <InputNumber className={style.input_number} id="guest" value={guest} onChange={(e)=>setGuest(e.value)}/>
                                        <label htmlFor="guest">Guest</label>
                                    </FloatLabel>
                            </div>
                            <div className={style.check_detail_price_container}>
                                <div className={style.check_detail_price}>
                                    <span className={style.check_detail_price_label}>Price</span>
                                    <span className={style.check_detail_price_value}>${getPriceChambreSelected()}</span>
                                </div>
                                <div className={style.check_detail_price}>
                                    <span className={style.check_detail_price_label}>Discount</span>
                                    <span className={style.check_detail_price_value}>{discount}%</span>
                                </div>
                                <Divider/>
                                <div className={style.check_detail_price}>
                                    <span className={style.check_detail_price_total_label}>Total</span>
                                    <span className={style.check_detail_price_total_value}>${applyDiscount()}</span>
                                </div>
                            </div>
                            <Button onClick={()=>setBookingVisible(true)} className="button-primary" label="Book now"/>
                        </div>
                        
                         <div className={style.accommodation_card}>
                            <span className={style.card_availability_title}>Availability ({chambre.length})</span>
                            <div className={style.separateur}></div>
                            <ScrollPanel className={style.card_availability_parent}>
                                <div className={style.chambre_list}>
                                    {chambre.map((roomData, index) => (
                                        <div key={index}>
                                            <div className={style.chambre_container}>
                                                <div className={style.chambre_top}>
                                                    <div className={style.checkbox_container}>
                                                        <input onChange={()=>selectChambre(roomData)} type='checkbox' className={style.checkbox}/>
                                                        <span className={style.checkbox_label}>{roomData.chambre.type_chambre}</span>
                                                    </div>
                                                    <span className={style.chambre_price}>${roomData.prix_nuit_chambre}</span>
                                                </div>
                                                <div className={style.chambre_body}>
                                                    <Image imageClassName={style.chambre_image} alt="chambre" src={roomData.images_chambre[0] != null ? UrlConfig.apiBaseUrl+roomData.images_chambre[0].images : "/images/hotel/chambre.jpg"} />
                                                    <div className={style.chambre_detail}>
                                                        <span><i className="pi pi-home" /> {roomData.chambre.nombre_min_personnes} - {roomData.chambre.nombre_max_personnes} Personnes</span>
                                                        {roomData.accessoires.map(accessoire => (
                                                            <span key={accessoire.id}><i className="pi pi-tv" /> {accessoire.nom_accessoire}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <Button onClick={() => { setChambre_id(roomData.id) ,setAvailability(true) }} className="button-primary" label="Details" />

                                            </div>
                                            <div className={style.separateur}></div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollPanel>
                        </div>
                        
                    </div>
                </div>
            </div>


            <BookingModal visible={bookingVisible} onHide={()=>setBookingVisible(false)} />
            <DetailChambre visible={availability} id={chambre_id} onHide={()=>setAvailability(false)}/>

        </>
    )
}