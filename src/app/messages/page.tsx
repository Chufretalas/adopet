"use client"

import fetchMessagesForMessagesPage from "@/actions/fetch_messages_for_messages_page"
import DefaultPageWrapper from "@/components/DefaultPageWrapper/DefaultPageWrapper"
import LoadingMessage from "@/components/LoadingMessage/LoadingMessage"
import NeedsToLogin from "@/components/NeedsToLogin/NeedsToLogin"
import useUser from "@/hooks/use_user"
import Link from "next/link"
import useSWR from "swr"
import styles from "./styles.module.css"
import LoggedLayout from "@/components/layouts/LoggedLayout/LoggedLayout"

//TODO: make messages markeable as read and only show how many unread messages
export default function Messages() {
    const { user, error, isLoading } = useUser()

    const dataResponse = useSWR("fetchMessagesPreviews",
        async () => {
            const data = await fetchMessagesForMessagesPage(user!.id)
            if (data) {
                return data
            }
            throw Error("could not fetch available pets")
        }
    )

    if (isLoading) {
        return (
            <LoadingMessage customMessage="checking login..." />
        )
    }

    if (error && !user) {
        return <NeedsToLogin redirect="messages" />
    }

    if (dataResponse.isLoading || !dataResponse.data) {
        return (
            <LoggedLayout>
                <DefaultPageWrapper headertext="Your messages" innerClass={styles.pageWrapperInner}>
                    <LoadingMessage noLayout={true} customMessage="loading messages..."></LoadingMessage>
                </DefaultPageWrapper>
            </LoggedLayout>

        )
    }

    return (
        <LoggedLayout>
            <DefaultPageWrapper headertext="Your messages" innerClass={styles.pageWrapperInner}>
                <ul className={styles.messagePreviewWrapper}>
                    {
                        dataResponse.data.length === 0
                            ? <span key={1}>You never messaged anyone</span>
                            : dataResponse.data.map((msg, index) => (
                                <li className={styles.messagePreviewCard} key={index}>
                                    <Link href={`messages/${msg.otherId}`} key={index}>
                                        <span>{msg.OtherName}</span>
                                        <span>Messages: {msg.messagesNumber}</span>
                                        {
                                            msg.hasUnread ? <span className={styles.unread_marker}>🔴</span> : <></>
                                        }
                                    </Link>
                                </li>
                            ))
                    }
                </ul>
            </DefaultPageWrapper>
        </LoggedLayout>
    )
}