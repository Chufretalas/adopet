import styles from "./PageHeaderText.module.css"

export default function PageHeaderText({ children }: { children: React.ReactNode }) {
    return (
        <h2 className={styles.text}>{children}</h2>
    )
}