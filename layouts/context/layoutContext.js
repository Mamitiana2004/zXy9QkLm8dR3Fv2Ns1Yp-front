import { createContext, useState } from "react";

const LayoutContext = createContext();

export const LayoutProvider=({children})=>{

    const [user,setUser]=useState(null);

    return <LayoutContext.Provider value={{user,setUser}}>{children}</LayoutContext.Provider>
}

export default LayoutContext;


