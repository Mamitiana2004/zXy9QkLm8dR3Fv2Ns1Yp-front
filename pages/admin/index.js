import AdminLayoutContext from "@/layouts/context/adminLayoutContext"
import { getAccessAdmin, getNewAdminAccess } from "@/util/Cookies";
import { useContext, useEffect, useState } from "react"

import Head from "next/head";
import style from '@/style/pages/admin/dahsboard.module.css'
import { Button } from "primereact/button";
import { Chart } from "primereact/chart";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Calendar } from "primereact/calendar";
import { useRouter } from "next/router";
import { SelectButton } from "primereact/selectbutton";
import { Tag } from "primereact/tag";

export default function DashBoard() {
    const [staticData, setStaticData] = useState(false);

    const { user, setUser } = useContext(AdminLayoutContext);
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    const options = ['Accommodation', 'Craft', "Tour"];

    const [value, setValue] = useState(options[0]);


    const justifyTemplate = (option) => {
        return <i className={option.icon}></i>;
    }
    const router = useRouter();

    const [lineTourData, setLineTourData] = useState({});
    const [lineAccomodationData, setLineAccomodationData] = useState({});
    const [lineHandcraftData, setLineHandcraftData] = useState({});

    // Weekly data
    const [TourData, setTourData] = useState([]);
    const [AccomodationData, setAccomodationData] = useState([]);
    const [HandcraftData, setHandcraftData] = useState([]);
    // Weekly data
    const [monthlyTourData, setMonthlyTourData] = useState([]);
    const [monthlyAccomodationData, setMonthlyAccomodationData] = useState([]);
    const [monthlyHandcraftData, setMonthlyHandcraftData] = useState([]);

    const [lineOptions, setLineOptions] = useState({});

    // États pour les récentes réservations
    const [recentTourBooking, setRecentTourBooking] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(['January', 'February', 'March', 'April', 'May', 'June', 'July']);
    const [recentAccomodationBooking, setRecentAccomodationBooking] = useState([]);
    const [recentHandcraftBooking, setRecentHandcraftBooking] = useState([]);
    const [nbAccomodations, setNbAccomodation] = useState();
    const [nbHandcrafts, setNbHandcraft] = useState();
    const [nbTour, setNbTour] = useState();

    const [recentBooking, setRecentBooking] = useState([]);
    const switchDataShowed = () => {
        if (!staticData) {
            loadStaticData();
        } else {
            loadDynamicData();
        }

    }
    const loadStaticData = () => {
        setStaticData(true)
        setTourData([45, 72, 53, 91, 62, 80, 39]);
        setAccomodationData([35, 67, 59, 82, 48, 93, 50]);
        setHandcraftData([52, 78, 61, 90, 40, 84, 46]);

        // Données mensuelles statiques
        setMonthlyTourData([120, 50, 80, 100, 90, 110, 130]);
        setMonthlyAccomodationData([110, 140, 190, 150, 170, 160, 140]);
        setMonthlyHandcraftData([100, 130, 160, 140, 150, 180, 120]);

        setRecentTourBooking(
            [
                { id: "#51", name: "Alice Walker", tour: "Safari Adventure", email: "alice@example.com", guests: "4", start_date: "10-08-2024", end_date: "20-08-2024" },
                { id: "#52", name: "Bob Brown", tour: "Mountain Trek", email: "bob@example.com", guests: "2", start_date: "15-08-2024", end_date: "25-08-2024" },
                { id: "#53", name: "Charlie Davis", tour: "City Tour", email: "charlie@example.com", guests: "3", start_date: "20-08-2024", end_date: "30-08-2024" },
                { id: "#54", name: "Diana Evans", tour: "Beach Holiday", email: "diana@example.com", guests: "5", start_date: "25-08-2024", end_date: "04-09-2024" },
                { id: "#55", name: "Evan White", tour: "Cruise", email: "evan@example.com", guests: "2", start_date: "01-09-2024", end_date: "11-09-2024" }
            ]
        );
        setRecentAccomodationBooking([
            { id: "#61", name: "Sophia Martin", accommodation: "Luxury Suite", email: "sophia@example.com", guests: "2", check_in: "05-09-2024", check_out: "10-09-2024" },
            { id: "#62", name: "Liam Wilson", accommodation: "Standard Room", email: "liam@example.com", guests: "1", check_in: "10-09-2024", check_out: "15-09-2024" },
            { id: "#63", name: "Olivia Scott", accommodation: "Deluxe Room", email: "olivia@example.com", guests: "3", check_in: "15-09-2024", check_out: "20-09-2024" },
            { id: "#64", name: "Noah Young", accommodation: "Family Suite", email: "noah@example.com", guests: "4", check_in: "20-09-2024", check_out: "25-09-2024" },
            { id: "#65", name: "Isabella Harris", accommodation: "Penthouse", email: "isabella@example.com", guests: "2", check_in: "25-09-2024", check_out: "30-09-2024" }
        ]);

        setRecentHandcraftBooking([
            { id: "#71", name: "James Taylor", item: "Handcrafted Vase", email: "james@example.com", quantity: "1", date: "01-08-2024" },
            { id: "#72", name: "Mia Anderson", item: "Wooden Sculpture", email: "mia@example.com", quantity: "2", date: "02-08-2024" },
            { id: "#73", name: "Ava Thompson", item: "Leather Bag", email: "ava@example.com", quantity: "1", date: "03-08-2024" },
            { id: "#74", name: "William Garcia", item: "Ceramic Pot", email: "william@example.com", quantity: "3", date: "04-08-2024" },
            { id: "#75", name: "Emma Martinez", item: "Handmade Jewelry", email: "emma@example.com", quantity: "2", date: "05-08-2024" }
        ]);
        setRecentBooking([
            { id: "#51", name: "Alice Walker", tour: "Safari Adventure", email: "alice@example.com", guests: "4", start_date: "10-08-2024", end_date: "20-08-2024" },
            { id: "#52", name: "Bob Brown", tour: "Mountain Trek", email: "bob@example.com", guests: "2", start_date: "15-08-2024", end_date: "25-08-2024" },
            { id: "#53", name: "Charlie Davis", tour: "City Tour", email: "charlie@example.com", guests: "3", start_date: "20-08-2024", end_date: "30-08-2024" },
            { id: "#54", name: "Diana Evans", tour: "Beach Holiday", email: "diana@example.com", guests: "5", start_date: "25-08-2024", end_date: "04-09-2024" },
            { id: "#55", name: "Evan White", tour: "Cruise", email: "evan@example.com", guests: "2", start_date: "01-09-2024", end_date: "11-09-2024" }
        ]);

        setNbAccomodation(854);
        setNbHandcraft(52);
        setNbTour(8);
    }
    const loadDynamicData = () => {
        setStaticData(false)

        // Données hebdomadaire dynamique
        setTourData([]);
        setAccomodationData([]);
        setHandcraftData([]);

        // Données mensuelles dynamique
        setMonthlyTourData([]);
        setMonthlyAccomodationData([]);
        setMonthlyHandcraftData([]);

        // reservationRecent
        setRecentBooking([])

        setRecentTourBooking([]);
        setRecentAccomodationBooking([]);

        setRecentHandcraftBooking([]);


        setNbAccomodation(0);
        setNbHandcraft(0);
        setNbTour(0);
    }

    useEffect(() => {

        if (user == null) {
            router.push("/admin/login");
        }
        getAccessAdmin()
            .then((data) => {
                if (!data) {
                    router.push("/admin/login");
                    setUser(null)
                }
            })
    }, [router, setUser, user])

    useEffect(() => {
        const dataAccomodationLine = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: "Reservation Hebergement",
                    backgroundColor: "rgba(48, 85, 85, 0.2)",
                    borderColor: 'rgba(255, 99, 132, 1)',
                    data: AccomodationData,
                    tension: 0.3,
                    fill: true
                }
            ]
        };

        const dataTourLine = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: "Reservation Tour",
                    backgroundColor: "rgba(48, 85, 85, 0.2)",
                    borderColor: 'rgba(54, 162, 235, 1)',
                    data: TourData,
                    tension: 0.3,
                    fill: true
                }
            ]
        };

        const dataHandCraftLine = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: "Achat Handcraft",
                    backgroundColor: "rgba(48, 85, 85, 0.2)",
                    borderColor: 'rgba(255, 159, 64, 1)',
                    data: HandcraftData,
                    tension: 0.3,
                    fill: true
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
                        display: false,
                        drawBorder: false
                    }
                }
            }
        };
        setLineTourData(dataTourLine);
        setLineAccomodationData(dataAccomodationLine);
        setLineHandcraftData(dataHandCraftLine);
        setLineOptions(optionsLine);
    }, [AccomodationData, HandcraftData, TourData])


    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: currentMonth,
            datasets: [
                {
                    label: 'Accommodation State',
                    data: monthlyAccomodationData,
                    fill: false,
                    tension: 0.4,
                    borderColor: documentStyle.getPropertyValue('--blue-500')
                },
                {
                    label: 'Handcraft State',
                    data: monthlyHandcraftData,
                    fill: false,
                    // borderDash: [5, 5],
                    tension: 0.4,
                    borderColor: documentStyle.getPropertyValue('--teal-500')
                },
                {
                    label: 'Tour State',
                    data: monthlyTourData,
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--red-500'),
                    tension: 0.4,
                    backgroundColor: 'rgba(255,167,38,0.2)'
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, [currentMonth, monthlyAccomodationData, monthlyHandcraftData, monthlyTourData]);

    const bodyTag = (item) => {
        return !item.ban ? <Tag severity="success" value="900$"></Tag> : <Tag severity="warning" value="600$"></Tag>
    }

    const switchValue = (item) => {

        if (value == options[0]) {
            setRecentBooking(recentAccomodationBooking);
        }
        else if (value == options[2]) {
            setRecentBooking(recentTourBooking);
        }
        else if (value == options[1]) {
            setRecentBooking(recentHandcraftBooking);
        }
        setValue(item);
    }
    return (
        <>
            <Head>
                <title>Dashboard - Accommodation</title>
            </Head>

            <div className={style.top_container}>
                <div className={style.top_container_title_container}>
                    <span className={style.top_container_title}>Dashboard</span>
                    <span className={style.top_container_subtitle}>Craft-Aftrip</span>
                </div>

                <div className={style.card_detail_container}>

                    <Button
                        label={staticData ? "Donnée static" : "Donnée Dynamic"}
                        icon={staticData ? "pi pi-check-circle" : "pi pi-check"}
                        onClick={() => { switchDataShowed() }}
                        className={`p-button-primary ${staticData ? 'p-button-rounded' : 'p-button-outlined'}`}
                    />
                </div>
                <div className={style.card_detail_container}>

                    <div className={style.card_detail}>
                        <i className="pi pi-calendar" style={{ fontSize: "32px" }} />
                        <div className={style.card_detail_text}>
                            <span className={style.card_detail_title}>Accommodations</span>
                            <span className={style.card_detail_value}>{nbAccomodations}</span>
                        </div>
                    </div>

                    <div className={style.card_detail}>
                        <i className="pi pi-calendar" style={{ fontSize: "32px" }} />
                        <div className={style.card_detail_text}>
                            <span className={style.card_detail_title}>Handcrafts</span>
                            <span className={style.card_detail_value}>{nbHandcrafts}</span>
                        </div>
                    </div>

                    <div className={style.card_detail}>
                        <i className="pi pi-calendar" style={{ fontSize: "32px" }} />
                        <div className={style.card_detail_text}>
                            <span className={style.card_detail_title}>Tour Operator</span>
                            <span className={style.card_detail_value}>{nbTour}</span>
                        </div>
                    </div>

                </div>
            </div>


            <div className={style.container}>
                <div className={style.left_container}>
                    <div className={style.detail_dashboard}>
                        {/* <span className={style.detail_dashboard_title}>Booking state</span> */}
                        <div className={style.card}>
                            <Chart type="line" data={chartData} options={chartOptions} />
                        </div>
                    </div>

                    <div className={style.card}>
                        <Chart type="line" data={lineAccomodationData} options={lineOptions} />
                        <Chart type="line" data={lineHandcraftData} options={lineOptions} />
                        <Chart type="line" data={lineTourData} options={lineOptions} />
                    </div>
                    <div className={style.detail_dashboard}>
                        {/* <span className={style.detail_dashboard_title}>Latest Transactions</span> */}
                        <div className={style.card}>
                            <DataTable value={recentBooking}>
                                <Column field="id" header="No" />
                                <Column field="name" header="Name" />
                                <Column field="room" header="Room" />
                                <Column field="guests" header="Guests" />
                                <Column field="check_in" header="Check in" />
                                <Column field="check_out" header="Check out" />
                            </DataTable>
                        </div>
                    </div>

                </div>
                <div className={style.right_container}>

                    <div className={style.card}>
                        <span className={style.centered_title}>
                            <SelectButton
                                value={value}
                                onChange={(e) => {
                                    switchValue(e.value);
                                }
                                } options={options} />
                        </span>

                        <DataTable value={recentBooking}>
                            <Column field="name" header="Username" />
                            <Column field="email" header="Email" />
                            <Column field="check_out" header="Date" />
                            <Column field="id" body={bodyTag} header="$" />
                        </DataTable>
                    </div>
                    <Calendar inline showWeek />
                    <div className={style.detail_dashboard}>
                        {/* <span className={style.detail_dashboard_title}>Latest Transactions</span> */}
                        <div className={style.card}>
                            <DataTable value={recentBooking}>
                                <Column field="id" header="No" />
                                <Column field="name" header="Name" />
                                <Column field="room" header="Room" />
                                <Column field="guests" header="Guests" />
                                <Column field="check_in" header="Check in" />
                                <Column field="check_out" header="Check out" />
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}