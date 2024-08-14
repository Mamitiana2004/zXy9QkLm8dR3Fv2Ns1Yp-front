import Head from "next/head";
import style from '../../../style/pages/admin/accommodation/Accommodation.module.css';
import { Toolbar } from "primereact/toolbar";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Image } from "primereact/image";
import { Rating } from "primereact/rating";
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from "primereact/inputtext";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Dropdown } from "primereact/dropdown";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import { useRouter } from "next/router";
import AdminLayoutContext from "@/layouts/context/adminLayoutContext";
import { getAccessAdmin } from "@/util/Cookies";

let emptyAccommodation = {
    id: null,
    name: "",
    type_accommodation: null,
    star: 0
}


export default function Accommodation() {


    const dt = useRef(null);
    const toast = useRef(null);
    const [filters, setFilters] = useState(null);
    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            nom_hebergement: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            min_prix_nuit_chambre: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            nombre_etoile_hebergement: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
        });
        setGlobalFilter('');
    };
    const router = useRouter();

    const { user, setUser } = useContext(AdminLayoutContext);

    // a ajouter dans chaque page d'admin
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

    const [accommodationData, setAccommodationData] = useState(emptyAccommodation);

    const [type_accommodation, setType_accommodation] = useState([
        { id: 1, nom_type: "Hotel" },
        { id: 2, nom_type: "Maison" },
        { id: 3, nom_type: "Villa" }
    ]);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [typeDialog, setTypeDialog] = useState(0);//0 insert - 1 update

    const [accommodations, setAccommodations] = useState(null);
    const [accommodationSelected, setAccommodationSelected] = useState([]);
    const getAllAccommodation = () => {
        fetch("/api/hebergement/getAll")
            .then(res => res.json())
            .then(data => setAccommodations(data))
            .catch((error) => {
                toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Data error' + error, life: 3000 })
            })
    }
    const getTypeAccommodation = (id) => {
        return type_accommodation.find(accom => accom.id === id);
    };


    //datatable
    const [globalFilter, setGlobalFilter] = useState();

    useEffect(() => {
        getAllAccommodation();
        initFilters();
    }, [])

    useEffect(() => {
        if (typeDialog == 0) {
            setAccommodationData(emptyAccommodation);
        }
    }, [typeDialog])

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const update = (item) => {
        let data = {
            id: item.id,
            name: item.nom_hebergement,
            star: item.nombre_etoile_hebergement,
            type_accommodation: getTypeAccommodation(item.idTypeAccommodation)
        }
        console.log(data);
        setAccommodationData(data);
        setTypeDialog(1);
        setDialogVisible(true);
    }

    const leftToolbarTemplate = (
        <React.Fragment>
            <div className={style.leftToolbar}>
                <Button onClick={() => { setDialogVisible(true); setTypeDialog(0) }} label="New" icon="pi pi-plus" severity="success" />
                <Button onClick={() => { confirmAllDelete() }} label="Delete" icon="pi pi-trash" severity="danger" disabled={!accommodationSelected || !accommodationSelected.length} />
            </div>
        </React.Fragment>
    );



    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    const imageBodyTemplate = (item) => {
        return <Image imageClassName={style.image_data} src={item.images} alt={item.name} />
    }

    const typeBodyTemplate = (item) => {
        return <span>{getTypeAccommodation(item.idTypeAccommodation).nom_type}</span>
    }

    const starBodyTemplate = (item) => {
        return <Rating
            value={item.nombre_etoile_hebergement}
            disabled
            cancel={false}
            pt={{
                onIcon: () => ({
                    style: {
                        "color": "#FFD700"
                    }
                })
            }}
        />
    }

    const actionBodyTemplate = (item) => {
        return (
            <div className={style.actionBodyTemplate}>
                <Button onClick={() => { update(item) }} icon="pi pi-pencil" rounded outlined severity="success" />
                <Button onClick={() => confirmDelete(item)} icon="pi pi-trash" rounded outlined severity="danger" />
            </div>
        )
    }

    const confirmDelete = (item) => {
        confirmDialog({
            message: 'Do you want to delete this accommodation?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: () => deleteAccommodation(item)
        });
    }

    const confirmAllDelete = () => {
        if (accommodationSelected.length) {
            confirmDialog({
                message: `Do you want to delete this accommodation ${accommodationSelected.length} ?`,
                header: 'Delete Confirmation',
                icon: 'pi pi-info-circle',
                defaultFocus: 'reject',
                acceptClassName: 'p-button-danger',
                accept: () => deleteAllAccommodation()
            });
        }
    }

    const deleteAllAccommodation = () => {
        let _accommodations = [...accommodations];
        accommodationSelected.map((item) => {
            _accommodations = _accommodations.filter((val) => val.id !== item.id);
        })
        setAccommodations(_accommodations);
        toast.current.show({ severity: 'success', summary: 'Success', detail: `Accommodation(${accommodationSelected.length})  deleted`, life: 3000 });
        setAccommodationSelected([]);
    }

    const deleteAccommodation = (item) => {
        let _accommodations = accommodations.filter((val) => val.id !== item.id);
        setAccommodations(_accommodations);
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Accommodation deleted', life: 3000 });
    }

    const header = (
        <div className={style.header_datatable}>
            <h4 className="m-0">Accommodation</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </IconField>
        </div>
    )

    const sendData = () => {
        let accommodationCopy = [...accommodations];
        if (typeDialog == 0) {

        }
        if (typeDialog == 1) {

        }
        setDialogVisible(false);
    }

    const changeType = (e) => {
        let data = {
            id: accommodationData.id,
            name: accommodationData.nom,
            star: accommodationData.star,
            type_accommodation: e.value
        }
        setAccommodationData(data);
    }

    const changeName = (e) => {
        let data = {
            id: accommodationData.id,
            name: e.target.value,
            star: accommodationData.star,
            type_accommodation: accommodationData.type_accommodation
        }
        setAccommodationData(data);
    }

    const changeStar = (e) => {
        let data = {
            id: accommodationData.id,
            name: accommodationData.name,
            star: e.value,
            type_accommodation: accommodationData.type_accommodation
        }
        setAccommodationData(data);
    }

    return (
        <>
            <Head>
                <title>Accommodation</title>
            </Head>
            <div className={style.container}>
                <Toolbar start={leftToolbarTemplate} end={rightToolbarTemplate} />
                <DataTable
                    ref={dt}
                    value={accommodations}
                    header={header}
                    globalFilter={globalFilter}
                    filters={filters}
                    selection={accommodationSelected}
                    onSelectionChange={(e) => setAccommodationSelected(e.value)}
                >
                    <Column selectionMode="multiple" exportable={false} />
                    <Column sortable field="id" header="ID" exportable={false} />
                    <Column sortable filter filterPlaceholder="Search by name" field="nom_hebergement" header="Name" />
                    <Column body={imageBodyTemplate} header="Image" />
                    <Column body={typeBodyTemplate} header="Type" />
                    <Column sortable filter filterField="nombre_etoile_hebergement" dataType="numeric" field="nombre_etoile_hebergement" body={starBodyTemplate} header="Stars" />
                    <Column dataType="numeric" filter filterField="min_prix_nuit_chambre" sortable field="min_prix_nuit_chambre" header="Price Min" />
                    <Column body={actionBodyTemplate} exportable={false} />
                </DataTable>
            </div>
            <Toast ref={toast} />
            <ConfirmDialog />

            <Dialog header={typeDialog == 0 ? "Add new Hotel" : "Update hotel"} draggable={false} visible={dialogVisible} onHide={() => setDialogVisible(false)}>

                <div className={style.add_container}>

                    <div className={style.input_container}>
                        <span>Nom :</span>
                        <input onChange={changeName} value={accommodationData.name} className={style.add_input} />
                    </div>

                    <div className={style.input_container}>
                        <span>Type :</span>
                        <Dropdown
                            value={accommodationData.type_accommodation}
                            options={type_accommodation}
                            optionLabel="nom_type"
                            onChange={(e) => changeType(e)}
                        />
                    </div>

                    <div className={style.input_container}>
                        <span>Stars</span>
                        <Rating
                            value={accommodationData.star}
                            onChange={(e) => changeStar(e)}
                            cancel={false}
                            pt={{
                                onIcon: () => ({
                                    style: {
                                        "color": "#FFD700"
                                    }
                                })
                            }}
                        />
                    </div>

                    <Button onClick={() => sendData()} className="button-primary" label={typeDialog == 0 ? "Add" : "Update"} />

                </div>

            </Dialog>
        </>
    )
}