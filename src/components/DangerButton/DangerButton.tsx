import { MouseEventHandler } from "react"
import styles from "./DangerButton.module.css"

export default function DangerButton({ children, onClick }: { children: React.ReactNode, onClick?: MouseEventHandler<HTMLButtonElement> }) {
    return (
        <button className={styles.danger_button} onClick={onClick} >{children}</button>
    )
}