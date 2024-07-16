import { createContext, useState } from "react";

const LayoutContext = createContext();

export const LayoutProvider=({children})=>{

    const [user,setUser]=useState({
        id:1,
        username:"Faneva mamitiana",
        userImage:"/images/users/user.jpg"
    });

    return <LayoutContext.Provider value={{user,setUser}}>{children}</LayoutContext.Provider>
}

export default LayoutContext;


