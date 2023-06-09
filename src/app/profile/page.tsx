"use client"

import styles from "./styles.module.css"
import DefaultPageWrapper from "@/components/DefaultPageWrapper/DefaultPageWrapper"
import ProfileButton from "@/components/ProfileButton/ProfileButton"
import LoadingMessage from "@/components/LoadingMessage/LoadingMessage"
import Image from "next/image"
import caovo from "../../../public/assets/images/default_profile.jpg"
import DefaultFieldset from "@/components/DefaultFieldset/DefaultFieldset"
import OrangeButton from "@/components/OrangeButton/OrangeButton"
import useUser from "@/hooks/use_user"
import fetchProfileStuff from "@/actions/fetch_profile_stuff"
import useSWR from "swr"
import Link from "next/link"
import updateProfile from "@/actions/update_profile"

export default function Profile() {

    const { user, error, isLoading } = useUser()

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
        return (
            <>
                <h1>Needs to login</h1>
                <Link href={`/login?redirect=profile`}>here to get out</Link>
            </>
        ) //TODO: beautify and componetize this thing
    }

    const profileData = profileResponse.data
    const profileError = profileResponse.error
    const profileIsLoading = profileResponse.isLoading

    if (profileIsLoading || !profileData) {
        return (
            <LoadingMessage customMessage="fetching profile data..." />
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
            </DefaultPageWrapper>
        </>
    )
}