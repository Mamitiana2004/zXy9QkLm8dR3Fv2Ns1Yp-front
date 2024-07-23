import { createContext, useEffect, useState } from "react";
import './../../pages/i18n';
import i18n from "./../../pages/i18n";

const LayoutContext = createContext();

// export const LayoutProvider=({children})=>{

//     const [user,setUser]=useState();
//     const [lang,setLang] = useState("en");

//     useEffect(()=>{
//         i18n.changeLanguage(lang);
//     },[lang]);

//     return <LayoutContext.Provider value={{user,setUser,lang,setLang}}>{children}</LayoutContext.Provider>
// }

export const LayoutProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [lang, setLang] = useState("en");

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedUser = localStorage.getItem('user');
            const savedLang = localStorage.getItem('lang');
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
            if (savedLang) {
                setLang(savedLang);
                i18n.changeLanguage(savedLang); 
            }
        }
    }, []);

    useEffect(() => {
        i18n.changeLanguage(lang);
    }, [lang]);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    useEffect(() => {
        if (lang) {
            localStorage.setItem('lang', lang);
        }
    }, [lang]);

    return (
        <LayoutContext.Provider value={{ user, setUser, lang, setLang }}>
            {children}
        </LayoutContext.Provider>
    );
};
export default LayoutContext;


