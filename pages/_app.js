import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';
import './../style/globals.css';
import './i18n';
import Layout from "@/layouts/layout";
import { useContext, useEffect, useState } from "react";
import { Router } from "next/router";
import dynamic from "next/dynamic";
import { LayoutProvider } from "@/layouts/context/layoutContext";
import { appWithTranslation } from "next-i18next";

const Loader = dynamic(()=> import('@/layouts/Loader'),{ssr:false});



function MyApp({ Component, pageProps }) {

    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        const handleStart = () => setLoading(true);
        const handleEnd = () => setLoading(false);

        Router.events.on("routeChangeStart",handleStart);
        Router.events.on("routeChangeComplete",handleEnd);
        Router.events.on("routeChangeError",handleEnd);
        return () =>{
            Router.events.off("routeChangeStart",handleStart);
            Router.events.off("routeChangeComplete",handleEnd);
            Router.events.off("routeChangeError",handleEnd);
        }
    },[])


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