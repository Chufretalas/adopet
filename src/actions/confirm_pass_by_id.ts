"use server"

import { prisma } from "@/db"
import { comparePass } from "@/util/pass_hash"

export default async function confirmPassById(userId: number, pass: string): Promise<boolean> {
    try {
        const user = await prisma.users.findFirst({
            where: {
                id: userId
            }
        })
        if (user) {
            const passed = await comparePass(pass, user.password)
            return passed
        }
    } catch (e) {
        console.log(e)
    }
    return false
}