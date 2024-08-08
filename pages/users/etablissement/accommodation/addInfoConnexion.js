import AppTopbar from "@/layouts/AppTopbar";
import Head from "next/head";
import style from './../../../../style/pages/users/etablissement/etablissement.module.css';
import { Stepper } from "primereact/stepper";
import { Image } from "primereact/image";
import { StepperPanel } from "primereact/stepperpanel";
import { useContext, useRef, useState } from "react";
import { Button } from "primereact/button";
import { useRouter } from "next/router";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import UrlConfig from "@/util/config";
import { Divider } from "@mui/material";
import stylePassword from '@/style/components/PasswordInput.module.css';
import { Password } from "primereact/password";
import { Toast } from 'primereact/toast';

export default function AddInfoConnexion() {
    const toast = useRef(null);

    const [password, setPassword] = useState();
    const passwordInput = useRef(null);
    const [passwordErreur, setPasswordErreur] = useState(null);

    const [confPassword, setConfPassword] = useState("");
    const [confPasswordErreur, setConfPasswordErreur] = useState(null);
    const confPasswordInput = useRef(null);

    const [checkLenght, setCheckLenght] = useState(false);
    const [checkUppercase, setCheckUppercase] = useState(false);
    const [checkLowercase, setCheckLowercase] = useState(false);
    const [checkNumber, setCheckNumber] = useState(false);
    const [checkSpecial, setCheckSpecial] = useState(false);

    const checkChacun = (password) => {
        setCheckLenght(password.length > 8);
        setCheckSpecial(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password));
        setCheckNumber(/\d/.test(password));
        setCheckUppercase(/[A-Z]/.test(password));
        setCheckLowercase(/[a-z]/.test(password));
    }
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        let canSendData = true;
        if (password.length < 8 || password.trim() == "") {
            passwordInput.current.className = style.form_input_erreur;
            setPasswordErreur("Password required");
            canSendData = false;
        }
        if (confPassword != password) {
            confPasswordInput.current.className = style.form_input_erreur;
            setConfPasswordErreur("Password does not match");
            canSendData = false;
        }
        if (canSendData) {
            LoadData();
        }

    }

    const passwordInputHeader = <span className={stylePassword.header_container}>Pick a new password</span>;


    const SendData = async (data) => {
        try {
            const response = await fetch(`${UrlConfig.apiBaseUrl}/api/accounts/responsables/create/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const data = await response.json();
                return data
            } else {
                console.error("Erreur lors de l'enregistrement:", response.statusText);
            }
        } catch (error) {
            console.error("Erreur de requête:", error);
        }
    }
    const CreateHebergemet = async (data) => {
        try {
            const response = await fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/create-hebergement/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.error("Erreur lors de l'enregistrement:", response.statusText);
            }
        } catch (error) {
            console.error("Erreur de requête:", error);
        }
    }

    const addInfoUserFini = () => {
        // router.push("/users/etablissement/accommodation/addImage")
    }

    const LoadData = async () => {
        let userInfo = localStorage.getItem("userInfo");
        const type_etablissement = localStorage.getItem("type_etablissement");
        const accommodation_info = JSON.parse(localStorage.getItem("accommodationInfo"));
        const email = localStorage.getItem("email_etablissement");
        userInfo = JSON.parse(userInfo);
        userInfo.password = password;
        userInfo.type_responsable = parseInt(type_etablissement);
        userInfo.email = email;

        SendData(userInfo).then((data) => {
            if (data.id) {
                accommodation_info.responsable_id = data.id;
                const created = CreateHebergemet(accommodation_info);
                if (created) {
                    toast.current.show({
                        severity: "success",
                        summary: "Success",
                        detail: "Accomodation created successfully",
                        life: 5000
                    });
                    const responsable_info = {
                        username: data.username,
                        job_post: "Manager",
                        id_etablissement: created.id_hebergement,
                        type_etablissement: type_etablissement
                    }
                    localStorage.setItem("responsable_info", JSON.stringify(responsable_info));
                    localStorage.removeItem("userInfo");
                    localStorage.removeItem("type_etablissement");
                    localStorage.removeItem("accommodationInfo");
                    localStorage.removeItem("email_etablissement");

                    setTimeout(() => {
                        router.push("/users/etablissement/accommodation/addImage");
                    }, 3000);

                } else {
                    toast.current.show({
                        severity: "error",
                        summary: "Error",
                        detail: "Please try again later",
                        life: 5000
                    });
                }
            }
        })


    };

    const passwordInputFooter = (
        <>
            <Divider />
            <div className={stylePassword.check_wrapper}>
                <div className={stylePassword.check}>
                    <Image alt='check' imageClassName={stylePassword.check_logo} src={checkLenght ? "/images/auth/check_logo.svg" : "/images/auth/check_unknow.svg"} />
                    <span className={stylePassword.check_label}>Must be at least 8 characters</span>
                </div>
                <div className={stylePassword.check}>
                    <Image alt='check' imageClassName={stylePassword.check_logo} src={checkUppercase ? "/images/auth/check_logo.svg" : "/images/auth/check_unknow.svg"} />
                    <span className={stylePassword.check_label}>Must contain at least one uppercase character</span>
                </div>
                <div className={stylePassword.check}>
                    <Image alt='check' imageClassName={stylePassword.check_logo} src={checkLowercase ? "/images/auth/check_logo.svg" : "/images/auth/check_unknow.svg"} />
                    <span className={stylePassword.check_label}>Must contain at least one lowercase character</span>
                </div>
                <div className={stylePassword.check}>
                    <Image alt='check' imageClassName={stylePassword.check_logo} src={checkNumber ? "/images/auth/check_logo.svg" : "/images/auth/check_unknow.svg"} />
                    <span className={stylePassword.check_label}>Must contain at least one number</span>
                </div>
                <div className={stylePassword.check}>
                    <Image alt='check' imageClassName={stylePassword.check_logo} src={checkSpecial ? "/images/auth/check_logo.svg" : "/images/auth/check_unknow.svg"} />
                    <span className={stylePassword.check_label}>Must contain at least one special character</span>
                </div>
            </div>
        </>
    )
    return (
        <div className={style.container}>

            <div className={style.left_container}>
                <Image alt="logo" src="/images/logo-aftrip.png" />
                <Stepper activeStep={3} linear className={style.stepper}>
                    <StepperPanel></StepperPanel>
                    <StepperPanel></StepperPanel>
                    <StepperPanel></StepperPanel>
                    <StepperPanel></StepperPanel>
                </Stepper>
            </div>
            <div className={style.right_container}>
                <div className={style.top_container}>
                    <span className={style.top_title}>Create your etablissement account</span>
                    <span className={style.top_subtitle}>Please enter your information about your accommodation manager on the plateform</span>
                </div>
                <div className={style.addInfoConnexion_parent}>

                    {/* <FloatLabel>
                        <InputText
                            className={style.input}
                            id="input_name"
                        />
                        <label style={{ display: "flex", alignItems: "center", gap: "8px" }} htmlFor="input_name">
                            <i className="pi pi-user" />
                            Email
                        </label>
                    </FloatLabel> */}

                    <FloatLabel>
                        <Password
                            ref={passwordInput}
                            className={style.input}
                            id="input_name"
                            type="password"
                            value={password}
                            header={passwordInputHeader}
                            footer={passwordInputFooter}
                            onChange={(e) => {
                                passwordInput.current.className = style.form_input;
                                setPassword(e.target.value)
                                setPasswordErreur(null);
                                checkChacun(e.target.value);
                            }}
                        />
                        <label style={{ display: "flex", alignItems: "center", gap: "8px" }} htmlFor="input_name">
                            <i className="pi pi-user" />
                            Password
                        </label>
                    </FloatLabel>

                    <FloatLabel>
                        <Password
                            ref={confPasswordInput}

                            className={style.input}
                            id="input_password"
                            type="password"
                            value={confPassword}
                            onChange={(e) => {
                                setConfPassword(e.target.value)
                                setConfPasswordErreur(null);
                            }}

                        />
                        <label style={{ display: "flex", alignItems: "center", gap: "8px" }} htmlFor="input_name">
                            <i className="pi pi-user" />
                            Confirm Password
                        </label>
                    </FloatLabel>
                </div>
                <Button onClick={handleSubmit} className="button-primary" label="Continue" />


            </div>
            <Toast ref={toast} />

        </div>
    )
}

AddInfoConnexion.getLayout = function getLayout(page) {
    return (
        <>
            <Head>
                <title>Add Info user</title>
            </Head>
            <AppTopbar />
            {page}
        </>
    )
}