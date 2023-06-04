import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db";

export async function GET(req: Request, res: Response) {
    const session = null //TODO: get this working again
    console.log(session)
    if (session) {
        const user = await prisma.users.findFirst({
            where: {
                id: 3
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone_number: true,
                role: true
            }
        })
        if (user) {
            const profile = await prisma.profiles.findFirst({where: {user_id: user.id}})
            return new Response(JSON.stringify({user, profile}), {
                status: 200
            })
        } else {
            return new Response(JSON.stringify({ message: "could not find logged user in the database" }), {
                status: 500
            })
        }
    }
    return new Response(JSON.stringify({ message: "please login" }), {
        status: 401
    })
}