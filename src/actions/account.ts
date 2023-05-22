"use server"

import { prisma } from "@/db"
import { ILoginInfo, ISignupInfo } from "@/interfaces/forms"
import { comparePass, hashPass } from "@/util/pass_hash"

export async function createAccount(info: ISignupInfo): Promise<boolean> {
    const hashed = await hashPass(info.password)
    try {
        const res = await prisma.users.create({
            data: {
                name: info.name,
                email: info.email,
                role: info.user_role,
                password: hashed,
            }
        })
        console.log(res)
        if (res) {
            return true
        }
    } catch (error: any) {
        console.log(error)
    }
    return false
}