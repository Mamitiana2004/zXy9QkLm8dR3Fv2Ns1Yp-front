import { createContext, useState } from "react";

const ResponsableLayoutContext = createContext();

export const ResponsableLayoutProvider = ({ children }) => {

    const [user, setUser] = useState(
        {
            username: "data.username",
            job_post: "Manager",
            id_etablissement: 1,
            type_etablissement: 1
        }
    );
    const [typeResponsable, setTypeResponsable] = useState(1);

    return <ResponsableLayoutContext.Provider
        value={{ user, setUser, typeResponsable, setTypeResponsable }}>{children}</ResponsableLayoutContext.Provider>
}

export default ResponsableLayoutContext;


