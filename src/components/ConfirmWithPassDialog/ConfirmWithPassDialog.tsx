import { useState } from "react";
import DefaultDialog from "../DefaultDialog/DefaultDialog";
import DefaultFieldset from "../DefaultFieldset/DefaultFieldset";
import OrangeButton from "../OrangeButton/OrangeButton";

import styles from "./ConfirmWithPassDialog.module.css"
import confirmPassById from "@/actions/confirm_pass_by_id";


export default function ConfirmWithPassDialog({ isOpened, onClose, placeholder = "", userId, callBack }:
    { isOpened: boolean, onClose: () => void, placeholder?: string, userId: number, callBack: () => any }) {

    const [pass, setPass] = useState("")
    const [isWaiting, setIsWaiting] = useState(false)
    const [showError, setShowError] = useState(false)

    async function checkPass() {
        setIsWaiting(true)
        const passed = await confirmPassById(userId, pass)
        setIsWaiting(false)
        if (passed) {
            callBack()
            onClose()
        } else {
            setShowError(true)
        }
    }

    return (
        <DefaultDialog isOpened={isOpened} onClose={onClose} message="Please confirm your password to proceed">
            <div>
                <DefaultFieldset>
                    <label htmlFor="pass_input">Your password</label>
                    <input type="password" placeholder={placeholder} id="pass_input"
                        value={pass} onChange={(e) => {
                            setPass(e.currentTarget.value)
                            setShowError(false)
                        }} />
                    <OrangeButton className={styles.confirm_button} onClick={checkPass}>{isWaiting ? "checking..." : "Confirm 💣"}</OrangeButton>
                </DefaultFieldset>
                {showError ? <span className={styles.error_msg}>Invalid password</span> : <></>}
            </div>
        </DefaultDialog>
    )
}