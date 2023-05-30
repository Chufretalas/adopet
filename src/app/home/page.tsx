"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { redirect } from "next/navigation"
import styles from "./styles.module.css"
import smsIco from "../../../public/assets/icons/sms.svg"
import Image from "next/image"
import Link from "next/link"
import PetCard from "@/components/pages/home/PetCard"
import { mockPet1, mockPet2 } from "@/util/mock_values"
import ProfileButton from "@/components/ProfileButton/ProfileButton"
import PageHeaderText from "@/components/PageHeaderText/PageHeaderText"
import LoadingMessage from "@/components/LoadingMessage/LoadingMessage"

export default function DashBoard() {

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
        <ProfileButton/>
        <div className={styles.main}>
            <PageHeaderText>Hello {session.user?.name}! See some friends available for adoption.</PageHeaderText>
            <section className={styles.catalog}>
                {[mockPet1, mockPet2, mockPet1].map((pet, index) => <PetCard key={index} petData={pet} />)}
            </section>
            <button onClick={() => signOut()}>signout</button>
        </div>
        </>
    )
}