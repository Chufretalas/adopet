"use client"

import styles from "./styles.module.css"
import PetCard from "@/components/PetCard/PetCard"
import ProfileButton from "@/components/ProfileButton/ProfileButton"
import PageHeaderText from "@/components/PageHeaderText/PageHeaderText"
import LoadingMessage from "@/components/LoadingMessage/LoadingMessage"
import useUser from "@/hooks/use_user"
import OrangeButton from "@/components/OrangeButton/OrangeButton"
import useSWR from "swr"
import fetchPetsForHome from "@/actions/fetch_pets_for_home"
import NeedsToLogin from "@/components/NeedsToLogin/NeedsToLogin"
import Link from "next/link"
import LoggedLayout from "@/components/layouts/LoggedLayout/LoggedLayout"

export default function Home() {

    const { user, error, isLoading } = useUser()

    const petsResponse = useSWR("fetchPetsForCards",
        async () => {
            const data = await fetchPetsForHome(user!.id)
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
            <NeedsToLogin redirect="home" />
        )
    }

    if (petsResponse.isLoading || !petsResponse.data) {
        return (
            <LoadingMessage loggedLayout={true} customMessage="waiting for the pets..."></LoadingMessage>
        )
    }


    return (
        <LoggedLayout>
            <ProfileButton />
            <div className={styles.main}>
                {user!.role === "owner" ? <Link href={"./my_pets"}><OrangeButton
                    className={styles.new_pet_button}>⚙ Manage my pets 🛠</OrangeButton></Link> : <></>}
                <PageHeaderText>Hello {user!.name} see some friends available for adoption.</PageHeaderText>
                <section className={styles.catalog}>
                    {petsResponse.data.map((pet, index) => <PetCard key={index} petData={pet} ownerMode={false} />)}
                </section>
            </div>
        </LoggedLayout>
    )
}