import Link from "next/link"
import styles from "./ProfileButton.module.css"
import profileIco from "../../../public/assets/icons/profile_green.svg"
import Image from "next/image"

//TODO: get an actual image for the profile. Might need to turn this into a client component, or send the img URL as a prop
export default function ProfileButton() {
    return (
        <Link href={"/profile"} className={styles.main}>
            <Image src={profileIco} alt="acount profile icon" className={styles.image}/>
        </Link>
    )
}