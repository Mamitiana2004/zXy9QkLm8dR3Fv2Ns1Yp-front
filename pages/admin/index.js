import AdminLayoutContext from "@/layouts/context/adminLayoutContext"
import { getAccessAdmin, getNewAdminAccess } from "@/util/Cookies";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react"

export default function Admin() {

    const { user, setUser } = useContext(AdminLayoutContext);
    const router = useRouter();

    useEffect(() => {
        if (user == null) {
            router.push("/admin/login");
        }
        getAccessAdmin()
            .then((data) => {
                if (!data) {
                    router.push("/admin/login");
                    setUser(null)
                }
            })

    }, [router, setUser, user])

    return (
        <>
            <h1>Waiting ...</h1>
        </>
    )
}