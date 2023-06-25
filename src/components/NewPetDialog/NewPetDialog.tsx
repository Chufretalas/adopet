import { RefObject, useEffect, useRef } from "react"
import DefaultFieldset from "../DefaultFieldset/DefaultFieldset"
import OrangeButton from "../OrangeButton/OrangeButton"

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
        //TODO: validade the form data, such as the birthday that cannot be in the future
    }

    return (
        <dialog ref={ref}>
            <button onClick={() => {
                onClose()
                ref.current?.close()
            }}>✖️</button>
            <form action={handleForm}>
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
                        <div>
                            <input type="radio" name="pet_size" id="small" value="small" defaultChecked={true} required />
                            <label htmlFor="small">small</label>
                        </div>
                        <div>
                            <input type="radio" name="pet_size" id="medium/small" value="medium/small" required />
                            <label htmlFor="medium/small">medium/small</label>
                        </div>
                        <div>
                            <input type="radio" name="pet_size" id="medium" value="medium" required />
                            <label htmlFor="medium">medium</label>
                        </div>
                        <div>
                            <input type="radio" name="pet_size" id="medium/large" value="medium/large" required />
                            <label htmlFor="medium/large">medium/large</label>
                        </div>
                        <div>
                            <input type="radio" name="pet_size" id="large" value="large" required />
                            <label htmlFor="large">large</label>
                        </div>
                        <div>
                            <input type="radio" name="pet_size" id="very_big" value="very big" required />
                            <label htmlFor="very_big">very big</label>
                        </div>
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
                <OrangeButton type="submit">Confirm</OrangeButton>
            </form>

        </dialog>
    )
}