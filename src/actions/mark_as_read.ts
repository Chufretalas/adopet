"use server"

import { prisma } from "@/db"

export default async function markAsRead(userId: number, otherId: number) {
    try {
        const resp = await prisma.messages.updateMany({
            data: {
                read: true
            },
            where: {
                AND: [
                    {
                        sender_id: otherId,
                    },
                    {
                        receiver_id: userId
                    }
                ]
            }
        })
        // console.log(resp)
    } catch (e: any) {
        console.log(e)
    }
}