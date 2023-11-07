import styles from "./Snackbar.module.css"

export default function SnackBar({children, visible, onNotVisible}: {children: React.ReactNode, visible: boolean, onNotVisible: () => any}) {

    if (visible) {
        setTimeout(() => {
            visible = false
            onNotVisible()
        }, 5000)
    }

    return (
        <div className={styles.snackbar + " " + (visible ? styles.show : "")}>
            {children}
        </div>
    )
}