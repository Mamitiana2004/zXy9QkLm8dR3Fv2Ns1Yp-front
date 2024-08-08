import { createContext, useState } from "react";

const ResponsableLayoutContext = createContext();

export const ResponsableLayoutProvider = ({ children }) => {

    const [user, setUser] = useState();
    const [typeResponsable, setTypeResponsable] = useState(1);

    return <ResponsableLayoutContext.Provider
        value={{ user, setUser, typeResponsable, setTypeResponsable }}>{children}</ResponsableLayoutContext.Provider>
}

export default ResponsableLayoutContext;


