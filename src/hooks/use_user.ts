"use client"

import { verifyJWT } from "@/actions/account"
import useSWR from "swr"

export default function useUser() {
    const { data, error, isLoading } =  useSWR(
        "use_user",
        async () => {
            const token = window.localStorage.getItem("token")
            console.log("token " + token)
            if (token) {
                const user = await verifyJWT(token as string)
                if (user) {
                    return user
                }
            }
            throw Error("not authorized")
        }
    )

    return {user: data, error, isLoading}
}