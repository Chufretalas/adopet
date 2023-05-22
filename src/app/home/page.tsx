"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { redirect } from "next/navigation"

export default function DashBoard() {

    const { data: session } = useSession()

    if (!session) {
        redirect("/")
    }

    console.log(session)

    return (
        <div>
            opa aqui é onde a pessao vai catar os bixos
            <button onClick={() => signOut()}>signout</button>
        </div>
    )
}