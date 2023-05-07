import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({greeting: "trying to ifng the docs for the app router is kinda anoying"})
}

export async function POST(req: NextRequest) {
    
    NextResponse.json("aaa")
}