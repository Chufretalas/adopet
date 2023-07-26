"use server"

import { prisma } from "@/db";
import { messages, users } from "@prisma/client";

export default async function fetchConversation(userId: number, otherId: number): Promise<{ messages: messages[], otherName: string }> {
    try {
        const allMessages = await prisma.messages.findMany({
            where: {
                sender_id: {
                    in: [userId, otherId]
                },
                receiver_id: {
                    in: [userId, otherId]
                }
            },
            orderBy: {
                created: "asc"
            }
        })
        let other = await prisma.users.findFirst({
            where: {
                id: otherId
            }
        })
        if (!other) {
            return { messages: allMessages, otherName: "" }
        }
        return { messages: allMessages, otherName: other.name }
    } catch (e) {
        console.log("something went worng wen fetching the conversation: ", e)
    }
    return { messages: [], otherName: "" }
}