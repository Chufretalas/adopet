"use client"

import { useSession } from "next-auth/react"
import styles from "./styles.module.css"
import { redirect } from "next/navigation"
import DefaultPageWrapper from "@/components/DefaultPageWrapper/DefaultPageWrapper"
import ProfileButton from "@/components/ProfileButton/ProfileButton"
import LoadingMessage from "@/components/LoadingMessage/LoadingMessage"
import Image from "next/image"
import caovo from "../../../public/assets/images/default_profile.jpg"
import DefaultFieldset from "@/components/DefaultFieldset/DefaultFieldset"
import OrangeButton from "@/components/OrangeButton/OrangeButton"

export default function Profile() {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/login?redirect=/home")
        },
    })

    if (status === "loading") {
        return (
            <LoadingMessage />
        )
    }

    function handleForm(e: FormData) {
        console.log(e)
    }

    return (
        <>
            <ProfileButton />
            <DefaultPageWrapper headertext="This profile is what is shown to the people you send messages to.">
                <h1>Profile</h1>
                <form action={handleForm}>
                    <DefaultFieldset className={styles.verde}>
                        <label htmlFor="photo">Photo</label>
                        <Image src={caovo} alt="profile picture"
                            onClick={() => alert("jk, I don't have a place to store images yet 😭")} width={200} height={200} />
                        <span>Click on the image to edit</span>
                    </DefaultFieldset>
                    <DefaultFieldset>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" />
                    </DefaultFieldset>
                    <DefaultFieldset>
                        <label htmlFor="name">Telephone</label>
                        <input type="text" id="name" />
                    </DefaultFieldset>
                    <DefaultFieldset>
                        <label htmlFor="name">City</label>
                        <input type="text" id="name" />
                    </DefaultFieldset>
                    <DefaultFieldset>
                        <label htmlFor="name">About</label>
                        <input type="text" id="name" />
                    </DefaultFieldset>
                    <OrangeButton>Save</OrangeButton>
                </form>
            </DefaultPageWrapper>
        </>
    )
}