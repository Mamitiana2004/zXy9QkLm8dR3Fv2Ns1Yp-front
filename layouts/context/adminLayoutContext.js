import { createContext,  useState } from "react";

const AdminLayoutContext = createContext();

export const AdminLayoutProvider=({children})=>{

    const [sideBar,setSideBar]= useState(false);

    const [user,setUser]=useState(1);

    return <AdminLayoutContext.Provider value={{sideBar,setSideBar,user,setUser}}>{children}</AdminLayoutContext.Provider>
}

export default AdminLayoutContext;


