import { useEffect, useRef } from "react"
import styles from "./DefaultDialog.module.css"

export default function DefaultDialog({ children, isOpened, onClose, message = "" }
    : { children: React.ReactNode, isOpened: boolean, onClose: () => void, message?: string }) {

    const ref = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        if (isOpened) {
            ref.current?.showModal()
        } else {
            ref.current?.close()
        }
    }, [isOpened])

    return (
        <dialog ref={ref} className={styles.dialog}>
            <div className={styles.dialog_header}>
                <button onClick={() => {
                    onClose()
                    ref.current?.close()
                }}
                    className={styles.close_button}>✖️</button>
                <span>{message}</span>
            </div>
            {children}
        </dialog>
    )
}