import Head from "next/head";
import style from './../../../style/pages/responsable/handcraft/product.module.css'
import { Button } from "primereact/button";
import { useEffect, useState , useContext} from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { confirmPopup, ConfirmPopup } from "primereact/confirmpopup";
import { useRouter } from "next/router";
import ResponsableLayoutContext from "@/layouts/context/responsableLayoutContext"; 
import UrlConfig from "@/util/config";
    
    
export default function Product() {

    const router = useRouter();
    const [category,setCategory] = useState(0);

    const [categories,setCategories] = useState([
        // {id:1,name:"basketry"},
        // {id:2,name:"wooden sculture"},
        // {id:3,name:"metal sculture"}
    ])

    const [products,setProducts] = useState([])
    const [allProduct,setAllProducts] = useState([]);
    // useEffect(()=>{
    //     fetch("/api/handcraft/getAll")
    //     .then(res=>res.json())
    //     .then(data=>{setProducts(data);setAllProducts(data)})
    //     .catch(error=>console.log(error))
    // },[])

    const buttonTemplate = (item) =>{
        return(
            <>
                <Button icon="pi pi-pen-to-square" text severity="success"/>
                <Button onClick={confirm} icon="pi pi-trash" text severity="danger"/>
            </>
        )
    }

    const confirm = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Do you want to delete this item?',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept
        });
    };

    const getNombreParCategory = (id) =>{
        let nombre=0;
        allProduct.map((product)=>{
            if (product.category == id) {
                nombre++;
            }
        });
        return nombre;
    }


    const categoryTemplate = (item) => {
        const categoryNames = item.category && Array.isArray(item.category) ? item.category.map(specId => {
            const category = categories.find(category => category.id === specId);
            return category ? category.name : 'Unknown';
        }).join(', ') : 'No Category';

        return <span>{categoryNames}</span>;
    };


   

    const accept = () =>{

    }


    const filterCategories = (id) =>{
        if (id!=0) {
            const productCopy = [];
            allProduct.map((product)=>{
                if (product.category==id) {
                    productCopy.push(product);
                }
            })
            setProducts(productCopy);
            setCategory(id);
        }
        else{
            setProducts(allProduct);
            setCategory(0);
        }
    }


    // Debut integration Product
    const { user } = useContext(ResponsableLayoutContext);

    useEffect(() => {
        if (user) {
            const id_artisanat = user.id_etablissement;
            console.log(user);

            FetchList_Orders(id_artisanat);
        }
    }, [user]);

    function FetchList_Orders(id_artisanat) {
                fetch(`${UrlConfig.apiBaseUrl}/api/artisanat/${id_artisanat}/produits/`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        
                        const formattedData = data.map(item => ({
                            id: item.id || 'N/A',
                            name: item.nom_produit_artisanal || 'N/A',
                            category: Array.isArray(item.specifications) ? item.specifications : [], // Assurez-vous que category est toujours un tableau.
                            quantity: item.nb_produit_dispo || 'N/A',
                            price: item.prix_artisanat || 'N/A'
                        }));


                        setProducts(formattedData);
                        setAllProducts(formattedData);
                    })
                    .catch(err => console.error('Erreur lors de la récupération des Listes des Products:', err));
        
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
    .catch(err => console.error('Erreur lors de la récupération des Listes des Categorie:', err));

    }

    return(
        <>
            <Head>
                <title>Product</title>
            </Head>

            <div className={style.top_container}>
                <div className={style.top_container_title_container}>
                    <span className={style.top_container_title}>Product</span>
                    <span className={style.top_container_subtitle}>Nom Artisanat</span>
                </div>
                <Button onClick={()=>router.push("/responsable/handcraft/addProduct")} label="+ Add new prroduct" className={style.button_add}/>
            </div>

            <div className={style.container}>
                <div className={style.category_container}>
                    <span className={style.category_title}>Category</span>
                    <div className={style.category_body}>
                        <div onClick={()=>filterCategories(0)} className={category==0 ? style.category_ative : style.category}>
                            <span>All</span>
                            <span>({allProduct.length})</span>
                        </div>
                        {
                            categories.map((c)=>{
                                return <div onClick={()=>filterCategories(c.id)} key={c.id} className={category==c.id ? style.category_ative : style.category}>
                                    <span>{c.name}</span> 
                                    <span>({getNombreParCategory(c.id)})</span>
                                </div>  
                            })
                        }
                    </div>
                </div>
                <div className={style.table_container}>
                    <DataTable  paginator rows={10} value={products}>
                        <Column sortable field="id" header="No"/>
                        <Column sortable field="name" header="Name"/>
                        <Column sortable field="category" body={categoryTemplate} header="Category"/>
                        <Column sortable field="quantity" header="Quantity"/>
                        <Column sortable field="price" header="Price"/>
                        <Column header="Action" body={buttonTemplate}/>
                    </DataTable>
                </div>
            </div>

            <ConfirmPopup/>


        </>
    )
}