import { RefObject, useEffect, useRef } from "react"
import DefaultFieldset from "../DefaultFieldset/DefaultFieldset"
import OrangeButton from "../OrangeButton/OrangeButton"
import styles from "./NewPetDialog.module.css"

export default function NewPetDialog({ isOpened, onClose }: { isOpened: boolean, onClose: () => void }) {
    const ref = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        if (isOpened) {
            ref.current?.showModal()
        } else {
            ref.current?.close()
        }
    }, [isOpened])

    async function handleForm(fd: FormData) {
        console.log(fd.get("birthday"))
        console.log(fd.get("pet_size"))
        //TODO: validade the form data, such as the birthday that cannot be in the future
    }

    return (
        <dialog ref={ref} className={styles.dialog}>
            <button onClick={() => {
                onClose()
                ref.current?.close()
            }}
                className={styles.close_button}>✖️</button>
            <form action={handleForm} className={styles.form}>
                <DefaultFieldset>
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder="The name of the pet"
                        id="name" name="name" required maxLength={100} />
                </DefaultFieldset>
                <DefaultFieldset>
                    <label htmlFor="birthday">When was this pet born?</label>
                    <input type="date" id="birthday" name="birthday" required />
                </DefaultFieldset>
                <DefaultFieldset>
                    <label htmlFor="state">Current state</label>
                    <input type="text" placeholder="In wich state does this pet currently lives in"
                        id="state" name="state" required maxLength={50} />
                </DefaultFieldset>
                <DefaultFieldset>
                    <label htmlFor="city">Current city</label>
                    <input type="text" placeholder="In wich city does this pet currently lives in"
                        id="city" name="city" required maxLength={50} />
                </DefaultFieldset>
                <DefaultFieldset>
                    <span>How big is this pet?</span>
                    <div>
                        <PetSizeRadioSet id="small" value="small" defaultChecked={true} />
                        <PetSizeRadioSet id="medium/small" value="medium/small" />
                        <PetSizeRadioSet id="medium" value="medium" />
                        <PetSizeRadioSet id="medium/large" value="medium/large" />
                        <PetSizeRadioSet id="large" value="large" />
                        <PetSizeRadioSet id="very_big" value="very big" />
                    </div>
                </DefaultFieldset>
                {/* <DefaultFieldset> // TODO: pet img maybe sometime
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Your email here"
                        id="email" name="email" required />
                </DefaultFieldset> */}
                <DefaultFieldset>
                    <label htmlFor="personality">Personality</label>
                    <input type="personality" placeholder="Describe it in one or two words"
                        id="personality" name="personality" required maxLength={40} />
                </DefaultFieldset>
                <OrangeButton type="submit" className={styles.submit_button}>Confirm</OrangeButton>
            </form>

        </dialog>
    )
}

function PetSizeRadioSet({ id, value, defaultChecked }: { id: string, value: string, defaultChecked?: boolean }) {
    return (
        <div>
            <input type="radio" name="pet_size"
                id={id} value={value}
                defaultChecked={defaultChecked === undefined ? false : defaultChecked}
                required />
            <label htmlFor={id}>{value}</label>
        </div>
    )
}