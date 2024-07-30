import { createContext, useEffect, useState } from "react";
import '../../util/i18n';
import i18n from "../../util/i18n";

const LayoutContext = createContext();

export const LayoutProvider=({children})=>{

    const [user,setUser]=useState(null);
    const [lang,setLang] = useState("en");

    useEffect(()=>{
        i18n.changeLanguage(lang);
    },[lang]);

    return <LayoutContext.Provider value={{user,setUser,lang,setLang}}>{children}</LayoutContext.Provider>
}

export default LayoutContext;


