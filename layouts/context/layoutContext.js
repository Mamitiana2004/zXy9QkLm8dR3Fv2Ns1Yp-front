import { createContext, useEffect, useState } from "react";
import './../../pages/i18n';
import i18n from "./../../pages/i18n";

const LayoutContext = createContext();

export const LayoutProvider=({children})=>{

    const [user,setUser]=useState({
        id:1,
        username:"Faneva Mamitiana"
    });
    const [lang,setLang] = useState("en");

    useEffect(()=>{
        i18n.changeLanguage(lang);
    },[lang]);

    return <LayoutContext.Provider value={{user,setUser,lang,setLang}}>{children}</LayoutContext.Provider>
}

export default LayoutContext;


