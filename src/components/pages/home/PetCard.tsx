import styles from "./PetCard.module.css"
import smsIco from "../../../../public/assets/icons/sms.svg"
import Image from "next/image"
import Link from "next/link"
import { IPet } from "@/interfaces/IPet"

export default function PetCard({ petData }: { petData: IPet }) {
    return (
        <div className={styles.pet_card}>
            <img src={petData.photo_url ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBhDHqqLuNFf6RjuOS2GTaTVbnXDifVkatkA&usqp=CAU"}
                alt="pet photo"
                className={styles.card_img} />
            <div className={styles.card_info}>
                <h3 className={styles.card_name}>{petData.name}</h3>
                <div className={styles.card_basic_info}>
                    <span className={styles.card_plain_text}>Age: {petData.days_old} days old</span>
                    <span className={styles.card_plain_text}>Size: {petData.size}</span>
                    <span className={styles.card_plain_text}>Personality: {petData.personality.split(" ").join(" and ")}</span>
                </div>
                <address className={styles.card_address_sect}>
                    <span className={styles.card_place}>At: {petData.city} {`(${petData.state})`}</span>
                    <Link href={`/message?other=${petData.owner_id}&pet=${petData.id}`} className={styles.card_contact_wrapper}>
                        <Image src={smsIco} alt="sms message icon" className={styles.card_contact_img} />
                        <span className={styles.card_contact_text}>Talk with the responsable</span>
                    </Link>
                </address>
            </div>
        </div>
    )
}