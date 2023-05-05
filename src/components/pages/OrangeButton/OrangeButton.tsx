import styles from "./OrangeButton.module.css"

export default function OrangeButton({ children }: { children: React.ReactNode }) {
    return (
        <button className={styles.button}>{children}</button>
    )
}