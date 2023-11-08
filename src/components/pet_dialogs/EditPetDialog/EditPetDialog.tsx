import editPet from "@/actions/edit_pet"
import DefaultDialog from "@/components/DefaultDialog/DefaultDialog"
import { IPet, PetSize } from "@/interfaces/IPet"
import { Dispatch, SetStateAction, useRef } from "react"
import PetForm, { PetFormData } from "../PetForm/PetForm"

export default function EditPetDialog({ isOpened, onClose, petId, editPetFormData, setEditPetFormData }
    : { isOpened: boolean, onClose: () => void, petId: number, editPetFormData: PetFormData, setEditPetFormData: Dispatch<SetStateAction<PetFormData>> }) {

    const form = useRef<HTMLFormElement>(null)

    async function handleForm(fd: FormData) {
        const name = fd.get("name") as string
        const birthday = new Date(fd.get("birthday") as string)
        const state = fd.get("state") as string
        const city = fd.get("city") as string
        const size = fd.get("pet_size") as PetSize
        const personality = fd.get("personality") as string
        const res = await editPet(petId, name, birthday, city, state, size, personality)
        if (res) {
            form.current?.reset()
            onClose()
            return
        }
        // TODO: validade the form data, such as the birthday that cannot be in the future
    }

    return (
        <DefaultDialog isOpened={isOpened} onClose={onClose} message={"Edit Pet"}>
            <PetForm handleForm={handleForm} formRef={form} petFormData={editPetFormData} setPetFormData={setEditPetFormData} />
        </DefaultDialog>
    )
}