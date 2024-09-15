import Head from "next/head";
import style from '@/style/pages/responsable/handcraft/product.module.css';
import { Button } from "primereact/button";
import { useEffect, useState, useContext, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { confirmPopup, ConfirmPopup } from "primereact/confirmpopup";
import { useRouter } from "next/router";
import ResponsableLayoutContext from "@/layouts/context/responsableLayoutContext";
import UrlConfig from "@/util/config";
import { Toast } from 'primereact/toast';

export default function Product() {
    const router = useRouter();
    const [selectedProductId, setSelectedProductId] = useState(null);
    const toast = useRef(null);

    const [category, setCategory] = useState(0);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [allProduct, setAllProducts] = useState([]);

    const buttonTemplate = (item) => (
        <>
            <Button icon="pi pi-pen-to-square" onClick={() => { router.push(`/responsable/handcraft/product/${item.id}`) }} text severity="success" />
            <Button onClick={(e) => confirm(e, item.id)} icon="pi pi-trash" text severity="danger" />
        </>
    );

    const confirm = (event, id) => {
        setSelectedProductId(id);
        confirmPopup({
            target: event.currentTarget,
            message: 'Do you want to delete this item?',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept,
            reject,
        });
    };

    const accept = () => {
        if (selectedProductId) {
            fetch(`${UrlConfig.apiBaseUrl}/api/artisanat/produit/${selectedProductId}/delete/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (response.ok) {
                        // Remove the deleted product from the state
                        const updatedProducts = products.filter(product => product.id !== selectedProductId);
                        setProducts(updatedProducts);
                        setAllProducts(updatedProducts);

                        // Show success message
                        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Product deleted successfully', life: 3000 });
                    } else {
                        console.error('Failed to delete the product');
                    }
                })
                .catch(err => console.error('Error during product deletion:', err));
        }
    };

    const reject = () => {
        setSelectedProductId(null);
    };

    const getNombreParCategory = (id) => {
        return allProduct.filter(product => product.category === id).length;
    };

    const categoryTemplate = (item) => {
        const categoryNames = item.category && Array.isArray(item.category) ? item.category.map(specId => {
            const category = categories.find(category => category.id === specId);
            return category ? category.name : 'Unknown';
        }).join(', ') : 'No Category';

        return <span>{categoryNames}</span>;
    };

    const filterCategories = (id) => {
        if (id !== 0) {
            const filteredProducts = allProduct.filter(product => product.category === id);
            setProducts(filteredProducts);
            setCategory(id);
        } else {
            setProducts(allProduct);
            setCategory(0);
        }
    };

    const { user } = useContext(ResponsableLayoutContext);

    useEffect(() => {
        if (user) {
            const id_artisanat = user.id_etablissement;
            FetchList_Orders(id_artisanat);
        }
    }, [user]);

    const FetchList_Orders = (id_artisanat) => {
        fetch(`${UrlConfig.apiBaseUrl}/api/artisanat/${id_artisanat}/produits/`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                const formattedData = data.map(item => ({
                    id: item.id || 'N/A',
                    name: item.nom_produit_artisanal || 'N/A',
                    category: Array.isArray(item.specifications) ? item.specifications : [],
                    quantity: item.nb_produit_dispo || 'N/A',
                    price: item.prix_artisanat || 'N/A'
                }));

                setProducts(formattedData);
                setAllProducts(formattedData);
            })
            .catch(err => console.error('Erreur lors de la récupération des produits:', err));

        fetch(`${UrlConfig.apiBaseUrl}/api/artisanat/specifications/`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                const formattedData = data.map(item => ({
                    id: item.id || 'N/A',
                    name: item.type_specification || 'N/A',
                }));
                setCategories(formattedData);
            })
            .catch(err => console.error('Erreur lors de la récupération des catégories:', err));
    };

    return (
        <>
            <Head>
                <title>Product</title>
            </Head>

            <div className={style.top_container}>
                <div className={style.top_container_title_container}>
                    <span className={style.top_container_title}>Product</span>
                    <span className={style.top_container_subtitle}>Nom Artisanat</span>
                </div>
                <Button onClick={() => router.push("/responsable/handcraft/addProduct")} label="+ Add new product" className={style.button_add} />
            </div>

            <div className={style.container}>
                <div className={style.category_container}>
                    <span className={style.category_title}>Category</span>
                    <div className={style.category_body}>
                        <div onClick={() => filterCategories(0)} className={category === 0 ? style.category_ative : style.category}>
                            <span>All</span>
                            <span>({allProduct.length})</span>
                        </div>
                        {
                            categories.map((c) => (
                                <div onClick={() => filterCategories(c.id)} key={c.id} className={category === c.id ? style.category_ative : style.category}>
                                    <span>{c.name}</span>
                                    <span>({getNombreParCategory(c.id)})</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={style.table_container}>
                    <DataTable paginator rows={10} value={products}>
                        <Column sortable field="id" header="No" />
                        <Column sortable field="name" header="Name" />
                        <Column sortable field="category" body={categoryTemplate} header="Category" />
                        <Column sortable field="quantity" header="Quantity" />
                        <Column sortable field="price" header="Price" />
                        <Column header="Action" body={buttonTemplate} />
                    </DataTable>
                </div>
            </div>
            <Toast ref={toast} />
            <ConfirmPopup />
        </>
    );
}
