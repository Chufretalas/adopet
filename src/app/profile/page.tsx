"use client"

import { useSession } from "next-auth/react"
import styles from "./styles.module.css"
import { redirect } from "next/navigation"

export default function Profile() {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/login?redirect=/home")
        },
    })

    if (status === "loading") {
        return (
            <h1 className={styles.loading}>Wait just a second...</h1>
        )
    }
}