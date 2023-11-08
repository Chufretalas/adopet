import { useRef, useState } from "react"
import { PetSize } from "@/interfaces/IPet"
import createPet from "@/actions/create_pet"
import PetForm, { PetFormData } from "../PetForm/PetForm"
import DefaultDialog from "@/components/DefaultDialog/DefaultDialog"

export default function NewPetDialog({ isOpened, onClose, userId }: { isOpened: boolean, onClose: () => void, userId: number }) {

    const form = useRef<HTMLFormElement>(null)
    const [petFormData, setPetFormData] = useState<PetFormData>({ name: "", birthday: new Date(), city: "", state: "", personality: "", size: PetSize.Sm })


    async function handleForm(fd: FormData) {
        const name = fd.get("name") as string
        const birthday = new Date(fd.get("birthday") as string)
        const state = fd.get("state") as string
        const city = fd.get("city") as string
        const size = fd.get("pet_size") as PetSize
        const personality = fd.get("personality") as string
        const res = await createPet(userId, name, birthday, city, state, size, personality)
        if (res) {
            form.current?.reset()
            onClose()
            return
        }
        //TODO: validade the form data, such as the birthday that cannot be in the future
    }

    return (
        <DefaultDialog isOpened={isOpened} onClose={onClose} message={"New Pet"}>
            <PetForm handleForm={handleForm} formRef={form} petFormData={petFormData} setPetFormData={setPetFormData} />
        </DefaultDialog>
    )
}

