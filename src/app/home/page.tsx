"use client"

import styles from "./styles.module.css"
import PetCard from "@/components/pages/home/PetCard"
import { mockPet1, mockPet2 } from "@/util/mock_values"
import ProfileButton from "@/components/ProfileButton/ProfileButton"
import PageHeaderText from "@/components/PageHeaderText/PageHeaderText"
import LoadingMessage from "@/components/LoadingMessage/LoadingMessage"
import { redirect, useRouter } from "next/navigation"
import useUser from "@/hooks/use_user"
import useSWR from "swr"
import fetchProfileStuff from "@/actions/fetch_profile_stuff"
import { verifyJWT } from "@/actions/account"

export default function Home() {

    const { user, error, isLoading } = useUser()


    if (isLoading) {
        return (
            <LoadingMessage />
        )
    }

    if (error && !user) {
        redirect(`/login?redirect=/home`)
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