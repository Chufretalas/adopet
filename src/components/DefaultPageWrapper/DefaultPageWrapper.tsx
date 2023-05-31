import PageHeaderText from "../PageHeaderText/PageHeaderText"
import styles from "./DefaultPageWrapper.module.css"

export default function DefaultPageWrapper({children, headertext, className}: {children: React.ReactNode, headertext: string, className?: string}) {
    return (
        <div className={styles.main + " " + className}>
            <PageHeaderText>{headertext}</PageHeaderText>
            <div className={styles.content_wrapper}>
                {children}
            </div>
        </div>
    )
}