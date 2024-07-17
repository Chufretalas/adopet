"use server"

import { prisma } from "@/db"
import { ISignupInfo } from "@/interfaces/forms"
import { hashPass } from "@/util/pass_hash"
import { Prisma } from "@prisma/client"

export async function createAccount(info: ISignupInfo): Promise<string> {

    // await new Promise(resolve => setTimeout(resolve, 3000))

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
                return ""
            }
        }
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return 'This email is already in use'
            }
        }
        return "An unknown error has ocurred"
    }
    return ""
}

