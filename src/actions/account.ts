"use server"

import { prisma } from "@/db"
import { ILoginInfo, ISignupInfo } from "@/interfaces/forms"
import { comparePass, hashPass } from "@/util/pass_hash"
import jwt from "jsonwebtoken"

//TODO: create a blank profile for the user
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

interface ILoginResponse {
    token: string
    error: {
        message: "bad credentials" | "email and/or password not provided"
    } | null
}

export async function login(info: ILoginInfo): Promise<ILoginResponse> {
    "use server"

    if (info.email && info.password) {
        const user = await prisma.users.findFirst({ where: { email: info.email } })
        if (user) {
            const passed = await comparePass(info.password.toString(), user.password)
            if (passed) {
                const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_KEY as string, { expiresIn: "3h" })
                return { token, error: null }
            }
        }
        return { token: "", error: { message: "bad credentials" } }
    }
    return { token: "", error: { message: "email and/or password not provided" } }
}

//TODO: validade jwt action