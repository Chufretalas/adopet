import styles from "./OrangeButton.module.css"

interface Props {
    children?: React.ReactNode
    type?: "button" | "submit" | "reset"
    className?: string
    onClick?: () => void
}

export default function OrangeButton({ children, type, className, onClick }: Props) {
    return (
        <button className={styles.button + " " + className} type={type} onClick={onClick}>{children}</button>
    )
}