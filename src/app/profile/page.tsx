"use client"

import styles from "./styles.module.css"
import DefaultPageWrapper from "@/components/DefaultPageWrapper/DefaultPageWrapper"
import LoadingMessage from "@/components/LoadingMessage/LoadingMessage"
import Image from "next/image"
import caovo from "../../../public/assets/images/default_profile.jpg"
import DefaultFieldset from "@/components/DefaultFieldset/DefaultFieldset"
import OrangeButton from "@/components/OrangeButton/OrangeButton"
import useUser from "@/hooks/use_user"
import fetchProfileStuff from "@/actions/fetch_profile_stuff"
import useSWR from "swr"
import updateProfile from "@/actions/update_profile"
import NeedsToLogin from "@/components/NeedsToLogin/NeedsToLogin"
import DangerButton from "@/components/DangerButton/DangerButton"
import { useState } from "react"
import ConfirmWithPassDialog from "@/components/ConfirmWithPassDialog/ConfirmWithPassDialog"
import deleteUser from "@/actions/delete_user"
import SnackBar from "@/components/Snackbar/Snackbar"
import LoggedLayout from "@/components/layouts/LoggedLayout/LoggedLayout"

//TODO: Make a public profile page accesible in the chat page
export default function Profile() {

    const { user, error, isLoading } = useUser()
    const [isOpened, setIsOpened] = useState<boolean>(false)
    const [snackbar, setSnackbar] = useState<{ message: string, visible: boolean }>({ message: "", visible: false })

    const profileResponse = useSWR("fetchProfileData",
        async () => {
            const data = await fetchProfileStuff(user!.id)
            if (data) {
                return data
            }
            throw Error("not authorized")
        }
    )

    if (isLoading) {
        return (
            <LoadingMessage customMessage="checking login..." />
        )
    }

    if (error && !user) {
        return <NeedsToLogin redirect="profile" />
    }

    const profileData = profileResponse.data
    const profileIsLoading = profileResponse.isLoading

    if (profileIsLoading || !profileData) {
        return (
            <LoadingMessage loggedLayout={true} customMessage="fetching profile data..." />
        )
    }

    async function handleForm(fd: FormData) {
        await updateProfile({
            user_id: user!.id,
            // photoUrl: e.get() as string,
            name: fd.get("name") as string,
            phoneNumber: fd.get("phone_number") as string,
            city: fd.get("city") as string,
            about: fd.get("about") as string
        }) //TODO: show a success message after updating the profile
        profileResponse.mutate()
    }

    return (
        <LoggedLayout>
            <DefaultPageWrapper
                headertext="This profile is what is shown to the people you send messages to."
                innerClass={styles.main_wrapper}
                outerClass={styles.main_outer}>
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
                        <input type="text" id="name" name="name"
                            defaultValue={profileData?.name ?? ""}
                            placeholder="you name here..." />
                    </DefaultFieldset>
                    <DefaultFieldset>
                        <label htmlFor="phone_number">Telephone</label>
                        <input type="text" id="phone_number" name="phone_number"
                            defaultValue={profileData?.phoneNumber ?? ""}
                            placeholder="you know, so people can contact you and all that..." />
                    </DefaultFieldset>
                    <DefaultFieldset>
                        <label htmlFor="city">City</label>
                        <input type="text" id="city" name="city"
                            defaultValue={profileData?.city ?? ""}
                            placeholder="what city are you from?" />
                    </DefaultFieldset>
                    <DefaultFieldset>
                        <label htmlFor="about">About</label>
                        <textarea id="about" name="about" cols={4}
                            defaultValue={profileData?.about ?? ""}
                            className={styles.about_field}
                            placeholder="write something about you..." />
                    </DefaultFieldset>
                    <OrangeButton className={styles.save_button} type="submit">Save</OrangeButton>
                </form>
                <DangerButton onClick={() => setIsOpened(true)}>🔥 Delete Account 🔥</DangerButton>
            </DefaultPageWrapper>
            <ConfirmWithPassDialog isOpened={isOpened} onClose={() => setIsOpened(false)} callBack={async () => {
                const deleted = await deleteUser(user!.id)
                if (deleted) {
                    window.localStorage.clear()
                    location.reload()
                } else {
                    setSnackbar({ message: "could not delete account, try again later", visible: true })
                }
            }}
                placeholder="There is no going back from this!" userId={user!.id} />
            <SnackBar visible={snackbar.visible} onNotVisible={() => setSnackbar({ message: "", visible: false })}>
                {snackbar.message}
            </SnackBar>
        </LoggedLayout>
    )
}