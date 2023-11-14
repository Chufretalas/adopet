"use server"

import IJWTPayload from "@/interfaces/IJWTPayload"
import jwt from "jsonwebtoken"

export default async function verifyJWT(token: string): Promise<IJWTPayload | null> {
    try {
        const result = jwt.verify(token, process.env.JWT_KEY as string)
        if (result) {
            return result as IJWTPayload
        }
    } catch (e: any) {
        console.log("invalid token: ", e.message)
    }
    return null
}