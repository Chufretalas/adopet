import styles from "./DefaultFieldset.module.css"

export default function DefaultFieldset({children, className}: {children: React.ReactNode, className?: string}) {
    return (
        <fieldset className={styles.fieldset + " " + className}>
            {children}
        </fieldset>
    )
}