import styles from "./OrangeButton.module.css"

interface Props {
    children?: React.ReactNode
    type?: "button" | "submit" | "reset"
    className?: string
}

export default function OrangeButton({ children, type, className }: Props) {
    return (
        <button className={styles.button + " " + className} type={type}>{children}</button>
    )
}