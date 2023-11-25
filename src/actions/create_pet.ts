"use server"

import { prisma } from "@/db";
import { PetSize } from "@/interfaces/IPet";
import {toPrismaSize} from "@/util/pet_size_conversion";

export default async function createPet(
    ownerId: number,
    name: string,
    birthday: Date,
    city: string,
    state: string,
    size: PetSize,
    personality: string,
    photoUrl?: string) {

    const photoOptions = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMzQuG6SbfCTtBc2UqzaTvumyD_cEip51kupMitZ2kkiAGpehU2EYks6elpNy7D4XqY_U&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBhDHqqLuNFf6RjuOS2GTaTVbnXDifVkatkA&usqp=CAU"
    ]

    photoUrl = photoOptions[Math.floor(Math.random() * photoOptions.length)]

    try {
        const res = await prisma.pets.create({
            data: {
                owner_id: ownerId,
                name: name,
                birthday: birthday.getTime(), //TODO: if the date is in the future put today here
                city: city,
                state: state,
                available: true,
                size: toPrismaSize(size),
                photo_url: photoUrl,
                personality: personality
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