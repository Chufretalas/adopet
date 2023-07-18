import Link from "next/link"
import styles from "./ProfileButton.module.css"
import profileIco from "../../../public/assets/icons/profile_green.svg"
import logoutIco from "../../../public/assets/icons/logout_icon.svg"
import Image from "next/image"

//TODO: get an actual image for the profile. Might need to turn this into a client component, or send the img URL as a prop
export default function ProfileButton() {
    return (
        <div className={styles.main_div}>
            <Link href={"/profile"} className={styles.profile_link}>
                <Image src={profileIco} alt="acount profile icon" className={styles.image} />
            </Link>
            <button className={styles.logout_button} onClick={() => {
                window.localStorage.clear()
                console.log("token: " + localStorage.getItem("token"))
                location.reload()
            }}>
                <Image src={logoutIco} alt="logout icon" className={styles.logout_icon} />
            </button>
        </div>
    )
}