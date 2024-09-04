import { getResponsableAccessToken, removeAccessResponsable } from "@/util/Cookies";
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

    useEffect(() => {
        const checkAccessToken = async () => {
            try {
                const token = await getResponsableAccessToken();
                if (!token) {
                    localStorage.removeItem('type_responsable');
                    localStorage.removeItem('responsable_user');
                    setUser(null);
                }
            } catch (error) {
                localStorage.removeItem('responsable_user');
                localStorage.removeItem('type_responsable');
                setUser(null);
            }
        };

        checkAccessToken();
    }, []);

    useEffect(() => {
        const clearUser = async () => {
            try {
                if (!user) {
                    localStorage.removeItem('type_responsable');
                    localStorage.removeItem('responsable_user');
                    setUser(null);
                    removeAccessResponsable();
                }
            } catch (error) {
                localStorage.removeItem('responsable_user');
                localStorage.removeItem('type_responsable');
                setUser(null);
                removeAccessResponsable();
            }
        };
        clearUser();
    }, [user]);
    return (
        <ResponsableLayoutContext.Provider
            value={{ user, setUser, typeResponsable, setTypeResponsable }}
        >
            {children}
        </ResponsableLayoutContext.Provider>
    );
};


export default ResponsableLayoutContext;


