"use client"

import DefaultPageWrapper from "@/components/DefaultPageWrapper/DefaultPageWrapper"
import LoadingMessage from "@/components/LoadingMessage/LoadingMessage"
import NeedsToLogin from "@/components/NeedsToLogin/NeedsToLogin"
import useSWR from "swr"
import useUser from "@/hooks/use_user"
import styles from "./styles.module.css"
import fetchConversation from "@/actions/fetch_conversation"
import { redirect } from "next/navigation"
import { useRef } from "react"
import Image from "next/image"
import sendIco from "../../../../public/assets/icons/send.svg"
import sendMessage from "@/actions/send_message"
import ProfileButton from "@/components/ProfileButton/ProfileButton"

export default function MessageOther({ params }: { params: { other: number } }) {

    const otherId = +params.other

    const newMessage = useRef<HTMLTextAreaElement>(null)

    if (!Number.isInteger(otherId)) {
        redirect("/messages")
    }

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
        return <NeedsToLogin redirect={`messages/${otherId}`} />
    }

    if (dataResponse.isLoading || !dataResponse.data) {
        return (
            <DefaultPageWrapper headertext={`Your messages with ${dataResponse.data?.otherName ?? "someone, I guess..."}`} innerClass={styles.pageWrapperInner}>
                <LoadingMessage customMessage="loading messages..."></LoadingMessage>
            </DefaultPageWrapper>

        )
    }

    async function handleForm() {
        const message = newMessage.current!.value.trim()
        if (message) {
            const success = await sendMessage(user!.id, otherId, message)
            if (success) {
                newMessage.current!.value = ""
                dataResponse.mutate()
            }
        }
    }

    return (
        <>
            <ProfileButton />
            <DefaultPageWrapper headertext={`Your messages with ${dataResponse.data?.otherName ?? "someone, I guess..."}`}
                innerClass={styles.pageWrapperInner}>
                <div className={styles.chatbox}>
                    {dataResponse.data.messages.map(msg => {
                        if (msg.sender_id === otherId) {
                            return (
                                <div className={styles.other_msg} key={msg.id}>

                                    <span className={styles.other_content}>{msg.message}</span>
                                    <span className={styles.other_date}>
                                        Sent: {msg.created?.toLocaleString("en-US", {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                        })}
                                    </span>
                                </div>
                            )
                        }
                        return (
                            <div className={styles.your_msg} key={msg.id}>
                                <span className={styles.your_content}>{msg.message}</span>
                                <span className={styles.your_date}>
                                    Sent: {msg.created?.toLocaleString("en-US", {
                                        dateStyle: "medium",
                                        timeStyle: "short",
                                    })}
                                </span>
                            </div>
                        )
                    })}
                </div>
                <form action={handleForm} className={styles.form}>
                    <textarea name="new_message" id="new_message"
                        cols={30} rows={2}
                        className={styles.form_textarea}
                        ref={newMessage}
                        placeholder="write a nice message..." />
                    <button type="submit" className={styles.form_button}>
                        <Image src={sendIco} alt="send icon" className={styles.sendIco} />
                    </button>
                </form>
            </DefaultPageWrapper>
        </>
    )
}