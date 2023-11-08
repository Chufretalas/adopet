"use server"

import { prisma } from "@/db";
import { PetSize } from "@/interfaces/IPet";
import { toPrismaSize } from "@/util/pet_size_conversion";

export default async function editPet(
    pet_id: number,
    name: string,
    birthday: Date,
    city: string,
    state: string,
    size: PetSize,
    personality: string,
    photoUrl?: string) {

    try {
        const res = await prisma.pets.update({
            data: {
                name: name,
                birthday: birthday.getTime(),
                city: city,
                state: state,
                available: true,
                size: toPrismaSize(size),
                photo_url: photoUrl,
                personality: personality
            },
            where: {
                id: pet_id
            }
        })

        if (res) {
            return res
        }

        return null

    } catch (e) {
        console.log(e)
        return null
    }
}