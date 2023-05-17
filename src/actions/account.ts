"use server"

import { prisma } from "@/db"
import { ILoginInfo, ISignupInfo } from "@/interfaces/forms"
import { Dispatch, SetStateAction } from "react"

export async function createAccount(info: ISignupInfo): Promise<boolean> {
    console.log("criando conta", info)
    try {
        const res = await prisma.users.create({
            data: {
                name: info.name,
                email: info.email,
                role: info.user_role,
                password: info.password,
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

export async function login(info: ILoginInfo) {
    console.log("logando", info)
}