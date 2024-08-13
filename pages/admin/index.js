import AdminLayoutContext from "@/layouts/context/adminLayoutContext"
import { useRouter } from "next/router";
import { useContext, useEffect } from "react"

export default function Admin() {

    const {user,setUser} = useContext(AdminLayoutContext);
    const router = useRouter();

    useEffect(()=>{
        if (user==null) {
            router.push("/admin/login");
        }
    },[])

    return(
        <>
            <h1>Test</h1>
        </>
    )
}