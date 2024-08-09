import { createContext, useEffect, useState } from "react";

const ResponsableLayoutContext = createContext();

// export const ResponsableLayoutProvider = ({ children }) => {

//     const [user, setUser] = useState();
//     const [typeResponsable, setTypeResponsable] = useState(1);

//     return <ResponsableLayoutContext.Provider
//         value={{ user, setUser, typeResponsable, setTypeResponsable }}>{children}</ResponsableLayoutContext.Provider>
// }


export const ResponsableLayoutProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [typeResponsable, setTypeResponsable] = useState(1);
    
    useEffect(() => {
        const savedUser = localStorage.getItem('responsable_user');
        const savedTypeResponsable = localStorage.getItem('type_responsable');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        if (savedTypeResponsable) {
            setTypeResponsable(parseInt(savedTypeResponsable, 10));
        }
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem('responsable_user', JSON.stringify(user));
        }
    }, [user]);

    useEffect(() => {
        localStorage.setItem('type_responsable', typeResponsable);
    }, [typeResponsable]);

    return (
        <ResponsableLayoutContext.Provider
            value={{ user, setUser, typeResponsable, setTypeResponsable }}
        >
            {children}
        </ResponsableLayoutContext.Provider>
    );
};


export default ResponsableLayoutContext;


