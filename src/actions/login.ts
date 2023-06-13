"use server"

import { prisma } from "@/db"
import { ILoginInfo } from "@/interfaces/forms"
import { comparePass } from "@/util/pass_hash"
import jwt from "jsonwebtoken"

interface ILoginResponse {
    token: string
    error: {
        message: "bad credentials" | "email and/or password not provided"
    } | null
}

export default async function login(info: ILoginInfo): Promise<ILoginResponse> {
    "use server"

    if (info.email && info.password) {
        const user = await prisma.users.findFirst({ where: { email: info.email } })
        if (user) {
            const passed = await comparePass(info.password.toString(), user.password)
            if (passed) {
                const token = jwt.sign({ id: user.id, name: user.name, role: user.role }, process.env.JWT_PRIVATE as string, { expiresIn: "3h", algorithm: "ES512" })
                return { token, error: null }
            }
        }
        return { token: "", error: { message: "bad credentials" } }
    }
    return { token: "", error: { message: "email and/or password not provided" } }
}