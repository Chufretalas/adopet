import styles from "./PetCard.module.css"
import smsIco from "../../../public/assets/icons/sms.svg"
import Image from "next/image"
import Link from "next/link"
import { IPet } from "@/interfaces/IPet"
import OrangeButton from "../OrangeButton/OrangeButton"

/**
 * If ownerMode is true, handleEdit and handleDelete should be present
 */
export default function PetCard({ petData, ownerMode = false, handleEdit, handleDelete }
    : { petData: IPet, ownerMode: boolean, handleEdit?: (petData: IPet) => any, handleDelete?: (petData: IPet) => any }) {

    const age = Math.floor((Date.now() - Number(petData.birthday)) / (1000 * 60 * 60 * 24))

    return (
        <div className={styles.pet_card}>
            <img src={petData.photo_url ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBhDHqqLuNFf6RjuOS2GTaTVbnXDifVkatkA&usqp=CAU"}
                alt="pet photo"
                className={styles.card_img} />
            <div className={styles.card_info}>
                <h3 className={styles.card_name}>{petData.name}</h3>
                <div className={styles.card_basic_info}>
                    <span className={styles.card_plain_text}>Age: {age} days old</span>
                    <span className={styles.card_plain_text}>Size: {petData.size}</span>
                    <span className={styles.card_plain_text}>Personality: {petData.personality?.split(" ").join(" and ")}</span>
                </div>
                <address className={styles.card_address_sect}>
                    <span className={styles.card_place}>At: {petData.city} {`(${petData.state})`}</span>
                    {ownerMode && handleDelete && handleEdit
                        ? <div className={styles.owner_mode_buttons_wrapper}>
                            <OrangeButton className={styles.owner_mode_button} onClick={() => handleEdit(petData)}>Edit 📝</OrangeButton>
                            <OrangeButton className={styles.owner_mode_button} onClick={() => handleDelete(petData)}>Remove ✖</OrangeButton>
                        </div>
                        : <Link href={`/messages/${petData.owner_id}`} className={styles.card_contact_wrapper}>
                            <Image src={smsIco} alt="sms message icon" className={styles.card_contact_img} />
                            <span className={styles.card_contact_text}>Talk with the responsable</span>
                        </Link>
                    }
                </address>
            </div>
        </div>
    )
}