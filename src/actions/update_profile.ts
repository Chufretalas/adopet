"use server"

import { prisma } from "@/db";
import IProfilePageData from "@/interfaces/IProfilePageData";

export default async function updateProfile(data: IProfilePageData): Promise<boolean> {
    const old_user = await prisma.users.findFirst({ where: { id: data.user_id } })
    const old_profile = await prisma.profiles.findFirst({ where: { user_id: data.user_id } })
    if (old_user && old_profile) {
        const profileUpRes = await prisma.profiles.update({
            data: {
                photo_url: data.photoUrl,
                phone_number: data.phoneNumber,
                city: data.city,
                about: data.about
            },
            where: { user_id: data.user_id }
        })
        const userUpRes = await prisma.users.update({
            data: {
                name: data.name === undefined || data.name === "" ? old_user.name : data.name
            },
            where: { id: data.user_id }
        })
        if (userUpRes && profileUpRes) {
            return true
        }
    }
    return false
}