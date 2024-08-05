import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';
import './../style/globals.css';
import '../util/i18n';
import Layout from "@/layouts/layout";
import { useContext, useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import dynamic from "next/dynamic";
import { LayoutProvider } from "@/layouts/context/layoutContext";
import { appWithTranslation } from "next-i18next";
import ResponsableLayout from "@/layouts/responsable/ResponsableLayout";
import { ResponsableLayoutProvider } from "@/layouts/context/responsableLayoutContext";
import 'react-calendar/dist/Calendar.css';
const Loader = dynamic(()=> import('@/layouts/Loader'),{ssr:false});



function MyApp({ Component, pageProps }) {

    const [loading,setLoading]=useState(false);
    const router = useRouter();

    useEffect(()=>{
        const handleStart = () => setLoading(true);
        const handleEnd = () => setLoading(false);
        // document.addEventListener('contextmenu', (event) => event.preventDefault());
        // document.addEventListener('keydown', (event) => {
        //     if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key === 'C')) {
        //       event.preventDefault();
        //     }
        // });
          
        Router.events.on("routeChangeStart",handleStart);
        Router.events.on("routeChangeComplete",handleEnd);
        Router.events.on("routeChangeError",handleEnd);
        return () =>{
            Router.events.off("routeChangeStart",handleStart);
            Router.events.off("routeChangeComplete",handleEnd);
            Router.events.off("routeChangeError",handleEnd);
        }
    },[])


    if(router.asPath.includes("/responsable") && !Component.getLayout){
        return(
            <PrimeReactProvider>
                <ResponsableLayoutProvider>
                    <ResponsableLayout>
                        {loading && <Loader/>}
                        <Component {...pageProps}/>
                    </ResponsableLayout>
                </ResponsableLayoutProvider>
            </PrimeReactProvider>
        )
    }
    if (Component.getLayout) {
        return(
            <PrimeReactProvider>
                <LayoutProvider>
                    {loading && <Loader/>}
                    {Component.getLayout(<Component {...pageProps}/>)}
                </LayoutProvider>
            </PrimeReactProvider>
        );
    }
    else{
        return (
            <PrimeReactProvider>
                <LayoutProvider>
                    {loading && <Loader/>}
                    <Layout>
                        <Component {...pageProps}/>
                    </Layout>
                </LayoutProvider>
            </PrimeReactProvider>
        );
    }
}
export default appWithTranslation(MyApp);