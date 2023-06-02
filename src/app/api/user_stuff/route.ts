import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/db";

// Gets the logged in user info and profile
export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(authOptions)
    console.log(session)
    if (session) {
        const user = await prisma.users.findFirst({
            where: {// TODO: figure out how to put the id in the session data, so I can stop using the email 🫠
                email: session.user?.email as string
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