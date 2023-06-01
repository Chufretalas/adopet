import PageHeaderText from "../PageHeaderText/PageHeaderText"
import styles from "./DefaultPageWrapper.module.css"

export default function DefaultPageWrapper({ children, headertext, outerClass, innerClass }:
    { children: React.ReactNode, headertext: string, outerClass?: string, innerClass?: string }) {
    return (
        <div className={styles.main + " " + outerClass}>
            <PageHeaderText>{headertext}</PageHeaderText>
            <div className={styles.content_wrapper + " " + innerClass}>
                {children}
            </div>
        </div>
    )
}