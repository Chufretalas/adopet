import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import * as dotenv from 'dotenv'
import { prisma } from "@/db";
import { comparePass } from "@/util/pass_hash";
import type { NextAuthOptions } from "next-auth";

dotenv.config()

const handler = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "cool.mail@gmail.com" },
                password: { label: "Password", type: "password", minLength: 8 },
            },
            async authorize(credentials, req) {
                try {
                    const user = await prisma.users.findFirst({
                        where: {
                            email: credentials?.email
                        }
                    })

                    if (user) {
                        const validPass = await comparePass(credentials!.password, user.password)
                        if (validPass) {
                            return { id: user.id.toString(), name: user.name, email: user.email, role: user.role }
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
                return null
            },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    },
})

const authOptions: NextAuthOptions = NextAuth(handler)

export { handler as GET, handler as POST, authOptions }