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

    console.log(session.user?.email)

    //TODO: try SWR to fetch the user data

    function handleForm(e: FormData) {
        console.log(e)
    }

    return (
        <>
            <ProfileButton />
            <DefaultPageWrapper
                headertext="This profile is what is shown to the people you send messages to."
                innerClass={styles.main_wrapper}>
                <h1 className={styles.profile_title}>Profile</h1>
                <form action={handleForm} className={styles.form}>
                    <DefaultFieldset className={styles.img_part}>
                        <label htmlFor="photo">Photo</label>
                        <div className={styles.img_and_desc} onClick={() => alert("jk, I don't have a place to store images yet 😭")}>
                            <Image src={caovo} alt="profile picture"
                                className={styles.profile_img} />
                            <span>Click on the image to edit</span>
                        </div>
                    </DefaultFieldset>
                    <DefaultFieldset>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" placeholder="you name here..."/>
                    </DefaultFieldset>
                    <DefaultFieldset>
                        <label htmlFor="telephone">Telephone</label>
                        <input type="text" id="telephone" placeholder="you know, so people can contact you and all that..."/>
                    </DefaultFieldset>
                    <DefaultFieldset>
                        <label htmlFor="city">City</label>
                        <input type="text" id="city" placeholder="what city are you from?"/>
                    </DefaultFieldset>
                    <DefaultFieldset>
                        <label htmlFor="about">About</label>
                        <textarea id="about"  cols={4} className={styles.about_field} placeholder="write something about you..."/>
                    </DefaultFieldset>
                    <OrangeButton className={styles.save_button}>Save</OrangeButton>
                </form>
            </DefaultPageWrapper>
        </>
    )
}