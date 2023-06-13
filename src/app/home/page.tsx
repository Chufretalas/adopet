"use client"

import styles from "./styles.module.css"
import PetCard from "@/components/pages/home/PetCard"
import { mockPet1, mockPet2 } from "@/util/mock_values"
import ProfileButton from "@/components/ProfileButton/ProfileButton"
import PageHeaderText from "@/components/PageHeaderText/PageHeaderText"
import LoadingMessage from "@/components/LoadingMessage/LoadingMessage"
import useUser from "@/hooks/use_user"
import Link from "next/link"

export default function Home() {

    const { user, error, isLoading } = useUser()


    if (isLoading) {
        return (
            <LoadingMessage />
        )
    }

    if (error && !user) {
        return (
            <>
                <h1>Needs to login</h1>
                <Link href={`/login?redirect=home`}>here to get out</Link>
            </>
        )
    }

    return (
        <>
            <ProfileButton />
            <div className={styles.main}>
                <PageHeaderText>Hello {user!.name} see some friends available for adoption.</PageHeaderText>
                <section className={styles.catalog}>
                    {[mockPet1, mockPet2, mockPet1].map((pet, index) => <PetCard key={index} petData={pet} />)}
                </section>
                <button onClick={() => {
                    window.localStorage.clear()
                    console.log("token: " + localStorage.getItem("token"))
                    location.reload()
                }}>signout</button>
            </div>
        </>
    )
}