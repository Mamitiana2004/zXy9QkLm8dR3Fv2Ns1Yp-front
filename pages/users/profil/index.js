import Head from "next/head";
import style from '@/style/pages/users/Profile.module.css';
import Link from "next/link";
import { Avatar } from "primereact/avatar";
import { TabPanel, TabView } from "primereact/tabview";
import { Button } from "primereact/button";
import AppTopbar from "@/layouts/AppTopbar";
export default function Profile() {
    const [userInfo, setUserInfo] = useState(null);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [adresse, setAdresse] = useState("");
    const [email, setEmail] = useState("");
    const [numero, setNumero] = useState("");
    const [bio, setBio] = useState("");
    const toast = useRef(null);
    const [profilePic, setProfilePic] = useState("");
    const [file, setFile] = useState(null);
    const [userProfil, setUsedProfil] = useState("");
    const { user, setUser } = useContext(LayoutContext);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };


    const panelClassName = (parent, index) => {
        if (parent.state.activeIndex === index)
            return style.tab_active;
        else
            return style.tab;
    }
    useEffect(() => {
        FetchUser()
            .then((data) => {
                setUserInfo(data);
                setFirstname(data.first_name);
                setLastname(data.last_name);
                setEmail(data.email);
                setUsername(data.username);
                setAdresse(data.adresse);
                setNumero(data.numero_client);
                setBio(data.biographie);
                setProfilePic(`${UrlConfig.apiBaseUrl}${data.profilPic}`);
                setUsedProfil(`${UrlConfig.apiBaseUrl}${data.profilPic}`);

            })
            .catch((error) => {
                console.error('Error fetching user info:', error);
            });
    }, []);

    const handleEditSubmit = (e) => {
        e.preventDefault();
        getNewAccess();

        let token = Cookies.get("accessToken");

        if (!token) {
            getNewAccess();

            token = Cookies.get("accessToken");

            if (!token) {
                console.error("No access token available");
                toast.current.show({
                    severity: "error",
                    summary: "Error",
                    detail: "Please try again later",
                    life: 5000
                });
                return;
            }
        }

        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('numero_client', numero);
        formData.append('biographie', bio);
        formData.append('first_name', firstname);
        formData.append('last_name', lastname);
        formData.append('adresse', adresse);
        if (file) {
            formData.append('profilPic', file);
        }


        fetch(`${UrlConfig.apiBaseUrl}/api/accounts/edit-client/`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        })
            .then(async response => {
                console.log("Response received");
                if (!response.ok) {
                    const errorData = await response.json();
                    toast.current.show({
                        severity: "error",
                        summary: "Error",
                        detail: "Try again later",
                        life: 5000
                    });
                    console.error("Error data:", errorData);
                    throw new Error(`Error: ${errorData.message || "Unknown error"}`);

                }
                return response.json();
            })
            .then(data => {
                setUsername(data.username)
                setUsedProfil(profilePic);
                setUser(
                    {
                        username: data.username,
                        id: data.id,
                        userImage: profilePic,
                    }
                );
                toast.current.show({
                    severity: "success",
                    summary: "Success",
                    detail: "Profil updated successfully",
                    life: 5000
                });
            })
            .catch(error => {
                console.error("Error updating user profile:", error);
                toast.current.show({
                    severity: "error",
                    summary: "Error",
                    detail: "Please try again later",
                    life: 5000
                });
            });

    };

    return (
        <div className={style.container}>
            <div className={style.menu_container}>
                <Link style={{textDecoration:"none"}} href={"/users/profil"}>
                    <span className={style.menu_active}><i className="pi pi-user"/> Profil</span>
                </Link>
                <Link style={{textDecoration:"none"}} href={"/users/cart"}>
                    <span className={style.menu_item}><i className="pi pi-shopping-cart"/> Cart</span>
                </Link>
                <Link style={{textDecoration:"none"}} href={"/users/cart"}>
                    <span className={style.menu_item}><i className="pi pi-clock"/> History</span>
                </Link>
                <Link style={{textDecoration:"none"}} href={"/users/cart"}>
                    <span className={style.menu_item}><i className="pi pi-bell"/> Notification</span>
                </Link>
                <Link style={{textDecoration:"none"}} href={"/users/cart"}>
                    <span className={style.menu_item}><i className="pi pi-shield"/> Security</span>
                </Link>
                <Link style={{textDecoration:"none"}}  href={"/users/setting"}>
                    <span className={style.menu_item}><i className="pi pi-cog"/> Setting</span>
                </Link>
                <Link style={{textDecoration:"none"}} href={"/users/login"}>
                    <span className={style.menu_item}><i className="pi pi-sign-out"/> Log out</span>
                </Link>
            </div>

            <div className={style.profil_container}>
                <Link href={"/users"} className={style.back}><i className="pi pi-arrow-left"/> Back</Link>
                <div className={style.profil_image_container}>
                    <div className={style.profil_image_wrapper}>
                        <Avatar label="F" shape="circle" alt="user" className={style.profil_image} image="/images/users/user.jpg"/>
                        <div className={style.profil_user_info}>
                            <span className={style.profil_username}>Faneva Mamitana</span>
                            <span className={style.profil_adresse}>
                                <span>Account ID :</span>
                                <span>#23466809</span>
                            </span>
                        </div>
                    </div>
                    <Button className={style.edit_button} label="Edit" icon="pi pi-pen-to-square"/>
                </div>
                <div className={style.separateur}></div>
                <div className={style.profil_detail_container}>
                    <div className={style.profil_detail}>
                        <span className={style.title}>Personnal information</span>
                        <div className={style.profil}>
                            <div className={style.detail}>
                                <span className={style.label}>First name</span>
                                <span>Faneva </span>
                            </div>
                            <div className={style.detail}>
                                <span className={style.label}>First name</span>
                                <span>Faneva </span>
                            </div>
                            <div className={style.detail}>
                                <span className={style.label}>First name</span>
                                <span>Faneva </span>
                            </div>
                            <div className={style.detail}>
                                <span className={style.label}>First name</span>
                                <span>Faneva </span>
                            </div>
                            <div className={style.detail}>
                                <span className={style.label}>First name</span>
                                <span>Faneva </span>
                            </div>
                            <div className={style.detail}>
                                <span className={style.label}>First name</span>
                                <span>Faneva </span>
                            </div>
                        </div>
                    </div>
                    <Button className={style.edit_button} label="Edit" icon="pi pi-pen-to-square"/>
                </div>
            </div>
            <Toast ref={toast} />

        </div>
    );
}




Profile.getLayout = function getLayout(page) {
    return (
        <>
            <Head>
                <title>User profile</title>
            </Head>
            <AppTopbar/>
            {page}
        </>
    );
}