import Head from "next/head";
import UserTopbar from "@/layouts/users/UserTopbar";
import style from '@/style/pages/users/Setting.module.css';
import Link from "next/link";
export default function Setting() {



    
    return(
        <div className={style.container}>
            <div className={style.menu_container}>
                <Link style={{textDecoration:"none"}} href={"/users/profil"}>
                    <span className={style.menu_item}>Profil</span>
                </Link>
                <Link style={{textDecoration:"none"}} href={"/users/setting"}>
                    <span className={style.menu_active}>Setting</span>
                </Link>
                <Link style={{textDecoration:"none"}} href={"/users"}>
                    <span className={style.menu_item}>Return to home</span>
                </Link>
            </div>
        </div>
    );
}




Setting.getLayout = function getLayout(page) {
    return(
        <>
            <Head>
                <title>User Setting</title>
            </Head>
            <UserTopbar/>
            {page}
        </>
    );
}