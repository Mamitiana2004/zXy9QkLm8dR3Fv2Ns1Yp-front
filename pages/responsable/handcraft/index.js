import { useRouter } from "next/router"
import { useEffect } from "react";

export default function Handcraft() {

    const router = useRouter();

    useEffect(() => {
        if (typeof window != "undefined") {
            router.push("handcraft/dashboard");
        }
    }, [router])

    return <></>
}