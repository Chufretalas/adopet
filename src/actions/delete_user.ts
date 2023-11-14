"use server"

import { prisma } from "@/db"

export default async function deleteUser(userId: number): Promise<boolean> {
    try {
        const resp = await prisma.users.delete({
            where: {
                id: userId
            }
        })
        if (resp) {
            return true
        }
    } catch (e) {
        console.log(e)
    }
    return false
}