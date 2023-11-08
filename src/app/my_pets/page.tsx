"use client"

import styles from "./styles.module.css"
import fetchMyPets from "@/actions/fetch_my_pets"
import LoadingMessage from "@/components/LoadingMessage/LoadingMessage"
import NeedsToLogin from "@/components/NeedsToLogin/NeedsToLogin"
import NewPetDialog from "@/components/pet_dialogs/NewPetDialog/NewPetDialog"
import OrangeButton from "@/components/OrangeButton/OrangeButton"
import PageHeaderText from "@/components/PageHeaderText/PageHeaderText"
import ProfileButton from "@/components/ProfileButton/ProfileButton"
import PetCard from "@/components/PetCard/PetCard"
import useUser from "@/hooks/use_user"
import { useState } from "react"
import useSWR from "swr"
import { IPet, PetSize } from "@/interfaces/IPet"
import deletePet from "@/actions/delete_pet"
import SnackBar from "@/components/Snackbar/Snackbar"
import EditPetDialog from "@/components/pet_dialogs/EditPetDialog/EditPetDialog"
import { PetFormData } from "@/components/pet_dialogs/PetForm/PetForm"

export default function MyPets() {

    const { user, error, isLoading } = useUser()
    const [isOpenedNew, setIsOpenedNew] = useState<boolean>(false)
    const [isOpenedEdit, setIsOpenedEdit] = useState<boolean>(false)
    const [editPetId, setEditPetId] = useState<number>(-1)
    const [editPetFormData, setEditPetFormData] = useState<PetFormData>({ name: "", birthday: new Date(), city: "", state: "", personality: "", size: PetSize.Sm })
    const [snackbar, setSnackbar] = useState<{ message: string, visible: boolean }>({ message: "aaaaa", visible: false })

    const petsResponse = useSWR("fetchPetsForMyPets",
        async () => {
            const data = await fetchMyPets(user!.id)
            if (data) {
                return data
            }
            throw Error("could not fetch your pets")
        }
    )


    if (isLoading) {
        return (
            <LoadingMessage />
        )
    }

    if (error && !user) {
        return (
            <NeedsToLogin redirect="my_pets" />
        )
    }

    if (petsResponse.isLoading || !petsResponse.data) {
        return (
            <LoadingMessage customMessage="waiting for the pets..."></LoadingMessage>
        )
    }

    async function handleEdit(petData: IPet) {
        setEditPetId(petData.id)
        setEditPetFormData({
            name: petData.name,
            birthday: new Date(Number(petData.birthday)),
            city: petData.city,
            state: petData.state,
            size: petData.size,
            personality: petData.personality ?? ""
        })
        setIsOpenedEdit(true)
    }

    async function handleDelete(petData: IPet) {
        if (confirm(`Are you sure you want to remove ${petData.name}? This action can not be undone.`)) {
            const deleted = await deletePet(petData.id)

            if (deleted) {
                petsResponse.mutate()
                setSnackbar({ message: `${petData.name} removed successfully.`, visible: true })
                return
            }

            setSnackbar({ message: `Something went wrong. Try again or come back later later.`, visible: true })
        }
    }

    return (
        <>
            <ProfileButton />
            <div className={styles.main}>
                <PageHeaderText>Manage your friends.</PageHeaderText>
                {user!.role === "owner"
                    ? <OrangeButton
                        className={styles.new_pet_button}
                        onClick={() => setIsOpenedNew(true)}>🐶 Click here to new pet up for adoption 😸</OrangeButton>
                    : <></>}
                <section className={styles.catalog}>
                    {petsResponse.data.map((pet, index) => <PetCard key={index}
                        petData={pet} ownerMode={true}
                        handleEdit={handleEdit} handleDelete={handleDelete} />)}
                </section>
            </div>
            <SnackBar visible={snackbar.visible} onNotVisible={() => setSnackbar({ message: "", visible: false })}>
                {snackbar.message}
            </SnackBar>
            <NewPetDialog
                isOpened={isOpenedNew}
                onClose={() => {
                    setIsOpenedNew(false)
                    petsResponse.mutate()
                }}
                userId={user!.id} />

            <EditPetDialog isOpened={isOpenedEdit}
                onClose={() => {
                    setIsOpenedEdit(false)
                    petsResponse.mutate()
                }}
                petId={editPetId}
                editPetFormData={editPetFormData}
                setEditPetFormData={setEditPetFormData} />
        </>
    )
}