import NotLoggedLayout from "../layouts/Layout/NotLoggedLayout"
import LoggedLayout from "../layouts/LoggedLayout/LoggedLayout"
import styles from "./LoadingMessage.module.css"

export default function LoadingMessage({ customMessage, loggedLayout = false, noLayout = false }: { customMessage?: string, loggedLayout?: boolean, noLayout?: boolean }) {

    if (noLayout) {
        return <h1 className={styles.loading}>{customMessage ?? "Wait just a second..."}</h1>
    }

    return (
        <>
            {loggedLayout === true
                ? <LoggedLayout>
                    <h1 className={styles.loading}>{customMessage ?? "Wait just a second..."}</h1>
                </LoggedLayout>
                : <NotLoggedLayout>
                    <h1 className={styles.loading}>{customMessage ?? "Wait just a second..."}</h1>
                </NotLoggedLayout>}

        </>
    )
}