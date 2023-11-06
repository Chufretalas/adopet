"use client"

import styles from "./styles.module.css"
import fetchMyPets from "@/actions/fetch_my_pets"
import LoadingMessage from "@/components/LoadingMessage/LoadingMessage"
import NeedsToLogin from "@/components/NeedsToLogin/NeedsToLogin"
import NewPetDialog from "@/components/NewPetDialog/NewPetDialog"
import OrangeButton from "@/components/OrangeButton/OrangeButton"
import PageHeaderText from "@/components/PageHeaderText/PageHeaderText"
import ProfileButton from "@/components/ProfileButton/ProfileButton"
import PetCard from "@/components/pages/home/PetCard"
import useUser from "@/hooks/use_user"
import { useState } from "react"
import useSWR from "swr"

export default function MyPets() {

    const { user, error, isLoading } = useUser()
    const [isOpened, setIsOpened] = useState<boolean>(false)

    const petsResponse = useSWR("fetchPetsForMyPets",
        async () => {
            const data = await fetchMyPets(user!.id)
            console.log(data)
            if (data) {
                return data
            }
            throw Error("could not fetch your pets")
        }
    )


    if (isLoading) {
        return (
            <LoadingMessage />
        )
    }

    if (error && !user) {
        return (
            <NeedsToLogin redirect="my_pets" />
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
                <PageHeaderText>Manage your friends.</PageHeaderText>
                {user!.role === "owner" ? <OrangeButton
                    className={styles.new_pet_button}
                    onClick={handleNewPetButton}>🐶 Click here to new pet up for adoption 😸</OrangeButton> : <></>}
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