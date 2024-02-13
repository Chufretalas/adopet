"use server"

import { prisma } from "@/db"
import { Prisma } from "@prisma/client"

interface IMessagesPreview {
    otherId: number,
    OtherName: string,
    unreadMessages: number
}

interface IMessagesPreviewDBResponse {
    sender_id: number,
    sender_name: string,
    receiver_id: number,
    receiver_name: string,
    read: boolean
}

export default async function fetchMessagesForMessagesPage(userId: number): Promise<IMessagesPreview[]> {
    try {
        const messages: IMessagesPreviewDBResponse[] = await prisma.$queryRaw(
            Prisma.sql`WITH USER_RECEIVER (id, receiver_id, receiver_name) AS(
                SELECT
                    messages.id,
                    messages.receiver_id,
                    users.name AS receiver_name
                FROM
                    messages
                    JOIN users ON messages.receiver_id = users.id
                WHERE
                    messages.sender_id = ${userId}
                    OR messages.receiver_id = ${userId}
            )
            SELECT
                messages.sender_id,
                users.name AS sender_name,
                USER_RECEIVER.receiver_id,
                USER_RECEIVER.receiver_name,
                messages.read
            FROM
                messages
                JOIN users ON messages.sender_id = users.id
                JOIN USER_RECEIVER ON messages.id = USER_RECEIVER.id
            WHERE
                messages.sender_id = ${userId}
                OR messages.receiver_id = ${userId};`
        )
        if (messages) {
            const uniqueIds: number[] = []
            const uniqueUsers: (number | string)[][] = []
            messages.forEach(msg => {
                if (!uniqueIds.includes(msg.sender_id) && msg.sender_id !== userId) {
                    uniqueIds.push(msg.sender_id)
                    uniqueUsers.push([msg.sender_id, msg.sender_name])
                } else if (!uniqueIds.includes(msg.receiver_id) && msg.receiver_id !== userId) {
                    uniqueIds.push(msg.receiver_id)
                    uniqueUsers.push([msg.receiver_id, msg.receiver_name])
                }
            })

            const finalData: IMessagesPreview[] = []
            uniqueUsers.forEach(user => {
                const conversationMessages = messages.filter(msg => msg.receiver_id === user[0] || msg.sender_id === user[0])
                finalData.push({
                    otherId: user[0] as number,
                    OtherName: user[1] as string,
                    unreadMessages: conversationMessages.filter(msg => !msg.read && msg.sender_id !== userId).length
                })
            })
            return finalData
        }
    } catch (e) {
        console.log("something went wrong when fetching the messages preview: ", e)
    }
    return []
} 