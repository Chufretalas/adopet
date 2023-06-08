"use server"

import { prisma } from "@/db"
import IProfilePageData from "@/interfaces/IProfilePageData"

export default async function fetchProfileStuff(userId: number): Promise<IProfilePageData | null> {
    try {
        const user = await prisma.users.findFirst({ where: { id: userId } })
        const profile = await prisma.profiles.findFirst({ where: { user_id: userId } })
        console.log(user)
        console.log(profile)
        if (user && profile) {
            return {
                user_id: user.id,
                profile_id: profile.id,
                name: user.name,
                city: profile.city,
                phoneNumber: profile.phone_number,
                about: profile.about,
                photoUrl: profile.photo_url
            }
        }
    } catch (e) {
        console.log("error while fetching user and profile ", e)
    }
    return null
}