import styles from "./OrangeButton.module.css"

interface Props {
    children?: React.ReactNode,
    type?: "button" | "submit" | "reset"
}

export default function OrangeButton({ children, type }: Props) {
    return (
        <button className={styles.button} type={type}>{children}</button>
    )
}