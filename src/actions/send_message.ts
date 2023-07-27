"use server"

import { prisma } from "@/db"

export default async function sendMessage(senderId: number, receiverId: number, message: string): Promise<boolean> {
    try {
        const res = await prisma.messages.create({
            data: {
                sender_id: senderId,
                receiver_id: receiverId,
                message: message
            }
        })
        if (res) {
            return true
        }
    } catch (e) {
        console.log("message was not sent: ", e)
    }
    return false
}