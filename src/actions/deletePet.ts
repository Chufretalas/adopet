"use server"

import { prisma } from "@/db"

/**
* @returns success
*/
export default async function deletePet(petId: number): Promise<boolean> {

    try {
        const res = await prisma.pets.delete({
            where: {
                id: petId
            }
        })
        return true

    } catch (e) {
        console.log(e)
        return false
    }

} 