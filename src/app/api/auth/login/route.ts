import jsonResponse from "@/util/json_response";
import { NextApiRequest, NextApiResponse } from "next";


export async function POST(req: Request, res: Response) {
    try {
        const data = await req.json()
        if (data.email && data.password) {
            return jsonResponse(200, data)
        } else {
            return jsonResponse(400, { message: "inválid request body, please send json with 'email' and 'password' fields" })
        }
    } catch (e) {
        console.error(e)
        return jsonResponse(400, { message: "inválid request body, please send json with 'email' and 'password' fields" })
    }
}