"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { redirect } from "next/navigation"
import styles from "./styles.module.css"
import smsIco from "../../../public/assets/icons/sms.svg"
import Image from "next/image"

export default function DashBoard() {

    const { data: session } = useSession()

    if (!session) {
        redirect("/")
    }

    console.log(session)
    //TODO:make the styles for all of this and extract the card component
    return (
        <div className={styles.main}> 
            <h2 className={styles.catalog_title}>Hello! See some friends available for adoption.</h2>
            <section className={styles.catalog}>
                <div className={styles.pet_card}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMzQuG6SbfCTtBc2UqzaTvumyD_cEip51kupMitZ2kkiAGpehU2EYks6elpNy7D4XqY_U&usqp=CAU"
                        alt="placeholder dog"
                        className={styles.card_img} />
                    <div className={styles.card_info}>
                        <h3 className={styles.card_name}>Dog name</h3>
                        <div className={styles.card_basic_info}>
                            <span className={styles.card_plain_text}>age</span>
                            <span className={styles.card_plain_text}>size</span>
                            <span className={styles.card_plain_text}>personality</span>
                        </div>
                        <address className={styles.card_address_sect}>
                            <span className={styles.card_place}>Place</span>
                            <div className={styles.card_contact_wrapper}>
                                <Image src={smsIco} alt="sms message icon" className={styles.card_contact_img} />
                                <span className={styles.card_contact_text}>Talk with the responsable</span>
                            </div>
                        </address>
                    </div>
                </div>
            </section>
            <button onClick={() => signOut()}>signout</button>
        </div>
    )
}