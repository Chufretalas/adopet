"use server"

import { prisma } from "@/db"
import IJWTPayload from "@/interfaces/IJWTPayload"
import { ILoginInfo, ISignupInfo } from "@/interfaces/forms"
import { comparePass, hashPass } from "@/util/pass_hash"
import jwt, { JwtPayload } from "jsonwebtoken"

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
                const token = jwt.sign({ id: user.id, name: user.name, role: user.role }, process.env.JWT_PRIVATE as string, { expiresIn: "3h", algorithm: "ES512" })
                return { token, error: null }
            }
        }
        return { token: "", error: { message: "bad credentials" } }
    }
    return { token: "", error: { message: "email and/or password not provided" } }
}

export async function verifyJWT(token: string): Promise<IJWTPayload | null> {
    try {
        const result = jwt.verify(token, process.env.JWT_PUBLIC as string)
        if (result) {
            return result as IJWTPayload
        }
    } catch (e) {
        console.log("token validation erroed")
    }
    return null
}