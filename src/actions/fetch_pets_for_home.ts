"use server"

import { prisma } from "@/db"
import { IPet } from "@/interfaces/IPet"
import { fromPrismaSize } from "@/util/pet_size_conversion"

export default async function fetchPetsForHome(): Promise<IPet[]> {
    const res = await prisma.pets.findMany()
    if(res) {
        return res.map(e => ({
            id: e.id,
            owner_id: e.owner_id,
            birthday: e.birthday,
            city: e.city,
            state: e.state,
            name: e.name,
            personality: e.personality,
            created: e.created,
            available: e.available,
            photo_url: e.photo_url,
            size: fromPrismaSize(e.size)
        }))
    }
    return []
}