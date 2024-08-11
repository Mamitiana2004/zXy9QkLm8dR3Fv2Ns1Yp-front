import Head from "next/head";
import style from './../../../style/pages/responsable/accommodation/dahsboard.module.css'
import { Button } from "primereact/button";
import { Chart } from "primereact/chart";
import { useEffect, useState, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Calendar } from "primereact/calendar";
import { useRouter } from "next/router";
import { getCsrfFromToken } from '@/util/csrf';
import ResponsableLayoutContext from "@/layouts/context/responsableLayoutContext";
import UrlConfig from "@/util/config";



export default function DashBoard() {

    const router = useRouter();
    const [barData, setBarData] = useState({});
    const [barOptions, setBarOptions] = useState({});

    const [barHorizontalData, setBarHorizontalData] = useState({});
    const [barHorizontalOptions, setBarHorizontalOptions] = useState({});

    const [lineData, setLineData] = useState({});
    const [lineOptions, setLineOptions] = useState({});

    const [recentBooking,setRecentBooking] = useState([
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"},
        {id:"#41",name:"Paul Adamas",room:"203",guests:"2",check_in:"07-07-2024",check_out:"08-07-2024"}
    ])

     // Integration 
    const { user } = useContext(ResponsableLayoutContext);

    const [nameHotel, setNameHotel] = useState(null);
    const [totalBookings, setTotalBookings] = useState(0);
    const [totalGuest, setTotalGuest] = useState(0);
    const [totalRooms, setTotalRooms] = useState(0);
    
    useEffect(() => { 
        if(user){
            const id_hebergement = user.id_etablissement;

            // Mode debug
            // console.log('User:', user);
            // console.log('id_hebergement:', id_hebergement);

            FetchDashboard_Hotel(id_hebergement);
        }
    }, [user])

    function FetchDashboard_Hotel(id_hebergement) { 
    getCsrfFromToken()
        .then(csrfToken => {
            // Fetch Hotel Data
            fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/get-id-hebergement/${id_hebergement}/`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFTOKEN': csrfToken,
                }
            })
            .then(response => response.json())
            .then(hotelData => {
                setNameHotel(hotelData);
            })
            .catch(err => console.error('Erreur lors de la récupération du nom de l\'hôtel:', err));
            
            // Fetch Hotel Statistics
            fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/${id_hebergement}/stats/`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFTOKEN': csrfToken,
                }
            })
            .then(response => response.json())
            .then(Total => {
                setTotalBookings(Total);
                setTotalGuest(Total);
                setTotalRooms(Total);
            })
            .catch(err => console.error('Erreur lors de la récupération des statistiques de l\'hôtel:', err));
        })
        .catch(err => console.error('Erreur lors de la récupération du token CSRF:', err));   
}


    useEffect(()=>{
        const data = {
            labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
            datasets:[
                {
                    label:"New booking",
                    backgroundColor:"#D4E4E2",
                    borderColor:"#D4E4E2",
                    data:[40,88,60,87,36,36,30]
                },
                {
                    label:"Confirmed booking",
                    backgroundColor:"#305555",
                    borderColor:"#305555",
                    data:[43,44,74,52,29,96,24]
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        fontColor: "#000"
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: "#4a4a4a",
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: "#4a4a4a"
                    },
                    grid: {
                        display:false,
                        drawBorder: false
                    }
                }
            }
        };

        setBarData(data);
        setBarOptions(options);
        const dataHorizontal = {
            labels:['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets:[
                {
                    label:"Booking",
                    backgroundColor:"#D4E4E2",
                    borderColor:"#D4E4E2",
                    data:[40,88,60,87,36,36,30]
                }
            ]
        };
        const optionsHorizontal = {
            indexAxis:'y',
            maintainAspectRatio: false,
            aspectRatio: 0.5,
            plugins: {
                legend: {
                    labels: {
                        fontColor: "#000"
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: "#4a4a4a",
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: "#4a4a4a"
                    },
                    grid: {
                        display:false,
                        drawBorder: false
                    }
                }
            }
        };
        setBarHorizontalData(dataHorizontal);
        setBarHorizontalOptions(optionsHorizontal);


        const dataLine = {
            labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
            datasets:[
                {
                    label:"New booking",
                    backgroundColor:"rgba(48, 85, 85,0.2)",
                    borderColor:"#305555",
                    data:[40,88,60,87,36,36,30],
                    tension:0.4,
                    fill:true
                }
            ]
        };
        const optionsLine = {
            maintainAspectRatio: false,
            aspectRatio: 1.9,
            plugins: {
                legend: {
                    labels: {
                        fontColor: "#000"
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: "#4a4a4a",
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: "#4a4a4a"
                    },
                    grid: {
                        display:false,
                        drawBorder: false
                    }
                }
            }
        };
        setLineData(dataLine);
        setLineOptions(optionsLine);
    },[])

    return(
        <>
            <Head>
                <title>Dashboard - Accommodation</title>
            </Head>

            <div className={style.top_container}>
                <div className={style.top_container_title_container}>
                    <span className={style.top_container_title}>Dashboard</span>
                    <span className={style.top_container_subtitle}>{nameHotel?.nom_hebergement || 'No Hotel Name'}</span>
                </div>
                <Button onClick={()=>router.push("/responsable/accommodation/addNewRoom")} label="+ Add new room" className={style.button_add}/>
            </div>


            <div className={style.container}>
                <div className={style.left_container}>
                    <div className={style.card_detail_container}>
                        <div className={style.card_detail}>
                            <i className="pi pi-calendar" style={{fontSize:"32px"}}/>
                            <div className={style.card_detail_text}>
                                <span className={style.card_detail_title}>Total booking</span>
                                <span className={style.card_detail_value}>{totalBookings.booking_count}</span>
                            </div>
                        </div>
                        <div className={style.card_detail}>
                            <i className="pi pi-calendar" style={{fontSize:"32px"}}/>
                            <div className={style.card_detail_text}>
                                <span className={style.card_detail_title}>Avaliable room</span>
                                <span className={style.card_detail_value}>{totalRooms.available_room_count}</span>
                            </div>
                        </div>
                        <div className={style.card_detail}>
                            <i className="pi pi-calendar" style={{fontSize:"32px"}}/>
                            <div className={style.card_detail_text}>
                                <span className={style.card_detail_title}>Total guests</span>
                                <span className={style.card_detail_value}>{totalGuest.total_guests}</span>
                            </div>
                        </div>
                    </div>

                    <div className={style.detail_dashboard}>
                        <span className={style.detail_dashboard_title}>Booking states</span>
                        <div className={style.card}>
                            <Chart type="bar" data={barData} options={barOptions}/>
                        </div>
                    </div>
                    
                    <div className={style.detail_dashboard}>
                        <span className={style.detail_dashboard_title}>Recent Bookings</span>
                        <div className={style.card}>
                            <DataTable value={recentBooking}>
                                <Column sortable field="id" header="No"/>
                                <Column sortable field="name" header="Name"/>
                                <Column sortable field="room" header="Room"/>
                                <Column sortable field="guests" header="Guests"/>
                                <Column sortable field="check_in" header="Check in"/>
                                <Column sortable field="check_out" header="Check out"/>
                            </DataTable>
                        </div>
                    </div>
                </div>
                <div className={style.right_container}>
                    <Calendar inline showWeek/>
                    <div className={style.card}>
                        <Chart type="bar" data={barHorizontalData} options={barHorizontalOptions}/>
                    </div>
                    <div className={style.card}>
                        <Chart type="line" data={lineData} options={lineOptions}/>
                    </div>
                </div>
            </div>


        </>
    )
}