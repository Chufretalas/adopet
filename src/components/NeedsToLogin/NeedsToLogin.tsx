import Link from "next/link";
import styles from "./NeedsToLogin.module.css"
import OrangeButton from "../OrangeButton/OrangeButton";
import NotLoggedLayout from "../layouts/Layout/NotLoggedLayout";

export default function NeedsToLogin({ redirect }: { redirect: string }) {
    return (
        <NotLoggedLayout>
            <div className={styles.main_div}>
                <h1 className={styles.main_message}>You need to login to access this page 🤧</h1>
                <Link href={`/login?redirect=${redirect}`}>
                    <OrangeButton>Click here to do that</OrangeButton>
                </Link>
            </div>
        </NotLoggedLayout>
    )
}