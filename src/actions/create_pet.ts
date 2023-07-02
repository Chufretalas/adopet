"use server"

import { PetSize } from "@/interfaces/IPet";

export default async function createPet(
    owner_id: number,
    name: string,
    birthday: Date,
    city: string,
    state: string,
    size: PetSize,
    personality: string,
    photoUrl?: string) {
        console.log(owner_id)
        console.log(name)
        console.log(birthday.getTime())
        console.log(city)
        console.log(state)
        console.log(size)
        console.log(personality)
        console.log(photoUrl)
}