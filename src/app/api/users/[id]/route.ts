import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";


export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(authOptions)
    console.log({ session })
    return NextResponse.json({ "oi": 1 })
}