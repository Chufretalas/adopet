"use server"

import { prisma } from "@/db";
import { PetSize } from "@/interfaces/IPet";
import getPrismaPetSize from "@/util/getPrismaPetSize";
import { pet_size } from "@prisma/client";

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
                birthday: birthday.getTime(),
                city: city,
                state: state,
                available: true,
                size: getPrismaPetSize(size), //TODO: I seen to have two implementations of the pet_size type, maybe a should only use the prisma one
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