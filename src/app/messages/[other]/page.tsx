"use client"

import DefaultPageWrapper from "@/components/DefaultPageWrapper/DefaultPageWrapper"
import LoadingMessage from "@/components/LoadingMessage/LoadingMessage"
import NeedsToLogin from "@/components/NeedsToLogin/NeedsToLogin"
import useSWR from "swr"
import useUser from "@/hooks/use_user"
import styles from "./styles.module.css"
import fetchConversation from "@/actions/fetch_conversation"

export default function MessageOther({ params }: { params: { other: number } }) {

    const otherId = +params.other

    const { user, error, isLoading } = useUser()

    const dataResponse = useSWR("fetchConversation",
        async () => {
            const data = await fetchConversation(user!.id, otherId)
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
        return ( //TODO: fetch the other person's name
            <DefaultPageWrapper headertext={`Your messages with ${dataResponse.data?.otherName ?? "someone, I guess..."}`} innerClass={styles.pageWrapperInner}>
                <LoadingMessage customMessage="loading messages..."></LoadingMessage>
            </DefaultPageWrapper>

        )
    }

    return (
        <>
            Other: {dataResponse.data.otherName}
            {dataResponse.data.messages.map(msg => (<li>
                {msg.message} {msg.created?.getTime()}</li>))}
        </>
    )
}