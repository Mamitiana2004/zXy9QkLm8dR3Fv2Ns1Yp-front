import Head from "next/head";
import UserTopbar from "@/layouts/users/UserTopbar";
import style from '@/style/pages/responsable/Responsable.module.css';
export default function Responsable() {



    
    return(
        <div className={style.container}>
            
        </div>
    );
}




Responsable.getLayout = function getLayout(page) {
    return(
        <>
            <Head>
                <title>User Responsable</title>
            </Head>
            <UserTopbar/>
            {page}
        </>
    );
}