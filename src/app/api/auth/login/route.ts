import jsonResponse from "@/util/json_response";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { prisma } from "@/db";
import bcrypt from "bcrypt"
import { comparePass } from "@/util/pass_hash";
import { login } from "@/actions/account";

dotenv.config()

export async function POST(req: Request, res: Response) {
    try {
        const data = await req.json()
        if (data.email && data.password) {
            const { token, error } = await login(data)
            if (error === null) {
                return jsonResponse(200, { token: token })
            }
            return jsonResponse(401, { message: "bad credentials" })
        } else {
            return jsonResponse(400, { message: "inválid request body, please send json with 'email' and 'password' fields" })
        }
    } catch (e) {
        console.error(e)
        return jsonResponse(400, { message: "inválid request body, please send json with 'email' and 'password' fields" })
    }
}