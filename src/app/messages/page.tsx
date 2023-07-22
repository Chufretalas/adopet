"use client"

import fetchMessagesForMessagesPage from "@/actions/fetch_messages_for_messages_page"
import DefaultPageWrapper from "@/components/DefaultPageWrapper/DefaultPageWrapper"
import LoadingMessage from "@/components/LoadingMessage/LoadingMessage"
import NeedsToLogin from "@/components/NeedsToLogin/NeedsToLogin"
import ProfileButton from "@/components/ProfileButton/ProfileButton"
import useUser from "@/hooks/use_user"
import Link from "next/link"
import useSWR from "swr"
import styles from "./styles.module.css"

//TODO: make messages markeable as read and only show how many unread messages
export default function Messages() {
    const { user, error, isLoading } = useUser()

    const dataResponse = useSWR("fetchPetsForCards",
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
        return <NeedsToLogin redirect="profile" />
    }

    if (dataResponse.isLoading || !dataResponse.data) {
        return (
            <DefaultPageWrapper headertext="Your messages" innerClass={styles.pageWrapperInner}>
                <LoadingMessage customMessage="loading messages..."></LoadingMessage>
            </DefaultPageWrapper>

        )
    }

    return (
        <>
            <ProfileButton />
            <DefaultPageWrapper headertext="Your messages" innerClass={styles.pageWrapperInner}>
                <ul className={styles.messagePreviewWrapper}>
                    {
                        dataResponse.data.length === 0
                            ? <span>You never messaged anyone</span>
                            : dataResponse.data.map((msg, index) => (
                                <li className={styles.messagePreviewCard}>
                                    <Link href={`message?other=${msg.otherId}`} key={index}>
                                        <span>{msg.OtherName}</span>
                                        <span>Messages: {msg.messagesNumber}</span>
                                    </Link>
                                </li>
                            ))
                    }
                </ul>
            </DefaultPageWrapper>
        </>
    )
}