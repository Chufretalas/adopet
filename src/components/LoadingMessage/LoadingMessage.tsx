import styles from "./LoadingMessage.module.css"

export default function LoadingMessage({ customMessage }: { customMessage?: string }) {
    return (
        <h1 className={styles.loading}>{customMessage ?? "Wait just a second..."}</h1>
    )
}