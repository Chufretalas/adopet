import styles from "./OrangeButton.module.css"

interface Props {
    children?: React.ReactNode
    type?: "button" | "submit" | "reset"
    className?: string
    onClick?: () => void
    disabled?: boolean
}

export default function OrangeButton({ children, type, className, onClick, disabled = false }: Props) {
    return (
        <button className={styles.button + " " + className} type={type} onClick={onClick} disabled={disabled}>{children}</button>
    )
}