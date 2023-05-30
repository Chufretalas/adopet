"use client"

import { useSession } from "next-auth/react"
import styles from "./styles.module.css"
import { redirect } from "next/navigation"
import DefaultPageWrapper from "@/components/DefaultPageWrapper/DefaultPageWrapper"
import ProfileButton from "@/components/ProfileButton/ProfileButton"
import LoadingMessage from "@/components/LoadingMessage/LoadingMessage"

export default function Profile() {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/login?redirect=/home")
        },
    })

    if (status === "loading") {
        return (
            <LoadingMessage/>
        )
    }

    return (
        <>
            <ProfileButton />
            <DefaultPageWrapper headertext="This profile is what is shown to the people you send messages to.">
                <span>opa</span>
            </DefaultPageWrapper>
        </>
    )
}