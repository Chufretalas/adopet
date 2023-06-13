"use server"

import { prisma } from "@/db"
import { ISignupInfo } from "@/interfaces/forms"
import { hashPass } from "@/util/pass_hash"

//TODO: create a blank profile for the user
export async function createAccount(info: ISignupInfo): Promise<boolean> {
    const hashed = await hashPass(info.password)
    try {
        const resUser = await prisma.users.create({
            data: {
                name: info.name,
                email: info.email,
                role: info.user_role,
                password: hashed,
            }
        })
        if (resUser) {
            const resProfile = await prisma.profiles.create({
                data: {
                    user_id: resUser.id,
                }
            })
            if (resProfile) {
                return true
            }
        }
    } catch (error: any) {
        console.log(error)
    }
    return false
}

