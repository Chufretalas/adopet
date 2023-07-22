"use client"

import styles from "./styles.module.css"
import PetCard from "@/components/pages/home/PetCard"
import ProfileButton from "@/components/ProfileButton/ProfileButton"
import PageHeaderText from "@/components/PageHeaderText/PageHeaderText"
import LoadingMessage from "@/components/LoadingMessage/LoadingMessage"
import useUser from "@/hooks/use_user"
import OrangeButton from "@/components/OrangeButton/OrangeButton"
import NewPetDialog from "@/components/NewPetDialog/NewPetDialog"
import { useState } from "react"
import useSWR from "swr"
import fetchPetsForHome from "@/actions/fetch_pets_for_home"
import NeedsToLogin from "@/components/NeedsToLogin/NeedsToLogin"

export default function Home() {

    const { user, error, isLoading } = useUser()
    const [isOpened, setIsOpened] = useState<boolean>(false)

    const petsResponse = useSWR("fetchPetsForCards",
        async () => {
            const data = await fetchPetsForHome()
            if (data) {
                return data
            }
            throw Error("could not fetch available pets")
        }
    )


    if (isLoading) {
        return (
            <LoadingMessage />
        )
    }

    if (error && !user) {
        return (
            <NeedsToLogin redirect="home"/>
        )
    }

    async function handleNewPetButton() {
        setIsOpened(true)
    }

    if (petsResponse.isLoading || !petsResponse.data) {
        return (
            <LoadingMessage customMessage="waiting for the pets..."></LoadingMessage>
        )
    }


    return (
        <>
            <ProfileButton />
            <div className={styles.main}>
                {user!.role === "owner" ? <OrangeButton
                    className={styles.new_pet_button}
                    onClick={handleNewPetButton}>🐶 Click here to new pet up for adoption 😸</OrangeButton> : <></>}
                <PageHeaderText>Hello {user!.name} see some friends available for adoption.</PageHeaderText>
                <section className={styles.catalog}>
                    {petsResponse.data.map((pet, index) => <PetCard key={index} petData={pet} />)}
                </section>
            </div>
            <NewPetDialog
                isOpened={isOpened}
                onClose={() => {
                    setIsOpened(false)
                    petsResponse.mutate()
                }}
                userId={user!.id} />
        </>
    )
}