"use client"

import styles from "./styles.module.css"
import PetCard from "@/components/pages/home/PetCard"
import { mockPet1, mockPet2 } from "@/util/mock_values"
import ProfileButton from "@/components/ProfileButton/ProfileButton"
import PageHeaderText from "@/components/PageHeaderText/PageHeaderText"
import LoadingMessage from "@/components/LoadingMessage/LoadingMessage"

export default function DashBoard() {

    const status: any = null

    const userName = "PlaceholderName"

    if (status === "loading") {
        return (
            <LoadingMessage />
        )
    }

    return (
        <>
            <ProfileButton />
            <div className={styles.main}>
                <PageHeaderText>Hello {userName}! See some friends available for adoption.</PageHeaderText>
                <section className={styles.catalog}>
                    {[mockPet1, mockPet2, mockPet1].map((pet, index) => <PetCard key={index} petData={pet} />)}
                </section>
            </div>
        </>
    )
}