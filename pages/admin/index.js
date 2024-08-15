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
import { TabView } from "primereact/tabview";
import { TabPanel } from "@mui/lab";
import { SelectButton } from "primereact/selectbutton";
import { Tag } from "primereact/tag";
export default function DashBoard() {

    const { user, setUser } = useContext(AdminLayoutContext);
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    const options = ['Accommodation', 'Craft', "Tour"];

    const [value, setValue] = useState(options[0]);


    const justifyTemplate = (option) => {
        return <i className={option.icon}></i>;
    }
    const router = useRouter();

    const [barHorizontalData, setBarHorizontalData] = useState({});
    const [barHorizontalOptions, setBarHorizontalOptions] = useState({});
    const scrollableTabs = Array.from({ length: 5 }, (_, i) => ({ title: `Tab ${i + 1}`, content: `Tab ${i + 1} Content` }))

    const [lineData, setLineData] = useState({});
    const [lineOptions, setLineOptions] = useState({});

    const [recentBooking, setRecentBooking] = useState([
        { id: "#41", name: "Paul Adamas", room: "203", email: "arlecchino@gmail.com", ban: "false", check_in: "07-07-2024", check_out: "08-07-2024" },
        { id: "#41", name: "Paul Adamas", room: "203", email: "arlecchino@gmail.com", guests: "2", check_in: "07-07-2024", check_out: "08-07-2024" },
        { id: "#41", name: "Paul Adamas", room: "203", email: "arlecchino@gmail.com", ban: "false", check_in: "07-07-2024", check_out: "08-07-2024" },
        { id: "#41", name: "Paul Adamas", room: "203", email: "arlecchino@gmail.com", guests: "2", check_in: "07-07-2024", check_out: "08-07-2024" },
        { id: "#41", name: "Paul Adamas", room: "203", email: "arlecchino@gmail.com", guests: "2", check_in: "07-07-2024", check_out: "08-07-2024" }
    ])

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

        const dataHorizontal = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: "Booking",
                    backgroundColor: "#D4E4E2",
                    borderColor: "#D4E4E2",
                    data: [40, 88, 60, 87, 36, 36, 30]
                }
            ]
        };
        const optionsHorizontal = {
            indexAxis: 'y',
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
                        display: false,
                        drawBorder: false
                    }
                }
            }
        };
        setBarHorizontalData(dataHorizontal);
        setBarHorizontalOptions(optionsHorizontal);


        const dataLine = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: "New booking",
                    backgroundColor: "rgba(48, 85, 85,0.2)",
                    borderColor: "#305555",
                    data: [40, 88, 60, 87, 36, 36, 30],
                    tension: 0.4,
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
        setLineData(dataLine);
        setLineOptions(optionsLine);
    }, [])


    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Accommodation State',
                    data: [65, 99, 80, 81, 56, 55, 40],
                    fill: false,
                    tension: 0.4,
                    borderColor: documentStyle.getPropertyValue('--blue-500')
                },
                {
                    label: 'Handcraft State',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    // borderDash: [5, 5],
                    tension: 0.4,
                    borderColor: documentStyle.getPropertyValue('--teal-500')
                },
                {
                    label: 'Tour State',
                    data: [12, 51, 62, 33, 21, 62, 45],
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
    }, []);

    const bodyTag = (item) => {
        return !item.ban ? <Tag severity="success" value="900$"></Tag> : <Tag severity="warning" value="600$"></Tag>
    }

    const switchValue = (item) => {
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

                    <div className={style.card_detail}>
                        <i className="pi pi-calendar" style={{ fontSize: "32px" }} />
                        <div className={style.card_detail_text}>
                            <span className={style.card_detail_title}>Total booking</span>
                            <span className={style.card_detail_value}>32</span>
                        </div>
                    </div>

                    <div className={style.card_detail}>
                        <i className="pi pi-calendar" style={{ fontSize: "32px" }} />
                        <div className={style.card_detail_text}>
                            <span className={style.card_detail_title}>Total booking</span>
                            <span className={style.card_detail_value}>32</span>
                        </div>
                    </div>

                    <div className={style.card_detail}>
                        <i className="pi pi-calendar" style={{ fontSize: "32px" }} />
                        <div className={style.card_detail_text}>
                            <span className={style.card_detail_title}>Total booking</span>
                            <span className={style.card_detail_value}>32</span>
                        </div>
                    </div>

                </div>
            </div>


            <div className={style.container}>
                <div className={style.left_container}>
                    {/* <div className={style.card_detail_container}>
                        <div className={style.card_detail}>
                            <i className="pi pi-calendar" style={{ fontSize: "32px" }} />
                            <div className={style.card_detail_text}>
                                <span className={style.card_detail_title}>Total booking</span>
                                <span className={style.card_detail_value}>32</span>
                            </div>
                        </div>
                        <div className={style.card_detail}>
                            <i className="pi pi-calendar" style={{ fontSize: "32px" }} />
                            <div className={style.card_detail_text}>
                                <span className={style.card_detail_title}>Total booking</span>
                                <span className={style.card_detail_value}>32</span>
                            </div>
                        </div>
                        <div className={style.card_detail}>
                            <i className="pi pi-calendar" style={{ fontSize: "32px" }} />
                            <div className={style.card_detail_text}>
                                <span className={style.card_detail_title}>Total booking</span>
                                <span className={style.card_detail_value}>32</span>
                            </div>
                        </div>
                    </div> */}


                    <div className={style.detail_dashboard}>
                        <span className={style.detail_dashboard_title}>Booking state</span>
                        <div className={style.card}>
                            <Chart type="line" data={chartData} options={chartOptions} />

                        </div>
                    </div>

                    <div className={style.detail_dashboard}>
                        <span className={style.detail_dashboard_title}>Latest Transactions</span>
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
                    <div className={style.card}>
                        <Chart type="line" data={lineData} options={lineOptions} />
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

                </div>
            </div>


        </>
    )
}