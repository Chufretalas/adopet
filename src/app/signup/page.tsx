"use client"

import Image from "next/image"
import styles from "./styles.module.css"
import logo from "../../../public/assets/images/logo.svg"
import hiddenIco from "../../../public/assets/icons/visibility_off.svg"
import visibleIco from "../../../public/assets/icons/visibility_on.svg"
import { useState } from "react"
import { createAccount } from "@/actions/account"
import OrangeButton from "@/components/pages/OrangeButton/OrangeButton"

export default function SignupPage() {

    const [errorMsg, setErrorMsg] = useState("")
    const [hiddenPassword, setHiddenPassword] = useState(true)

    async function handleForm(fd: FormData) {
        // TODO: hash password before sending to server
        const pass = fd.get("password") as string
        const confirmPass = fd.get("confirm_password") as string
        if (confirmPass !== pass) {
            setErrorMsg("Both password fields must be equal")
        } else {
            setErrorMsg("")
            createAccount({
                name: fd.get("name") as string,
                email: fd.get("email") as string,
                password: pass,
                confirmPassword: confirmPass,
            })
        }
    }

    return (
        <div className={styles.main}>
            <div className={styles.header_wrapper}>
                <Image src={logo} alt="adopet logo" className={styles.logo} />
                <p className={styles.header_p}>Don't have an account?</p>
                <p className={styles.header_p}>So, before finding a new friend, we need some info about you.</p>
            </div>
            <hr className={styles.hr} />
            <form action={handleForm} className={styles.form}>
                <fieldset className={styles.fieldset}>
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder="Your full name here" name="name" id="name" required />
                </fieldset>
                <fieldset className={styles.fieldset}>
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Your email here" name="email" id="email" required />
                </fieldset>
                <fieldset className={styles.fieldset}>
                    <label htmlFor="password">Password</label>
                    <input type={hiddenPassword ? "password" : "text"}
                        placeholder="Please write a great password, please"
                        minLength={8}
                        name="password" id="password"
                        required
                    />
                </fieldset>
                <fieldset className={styles.fieldset}>
                    <label htmlFor="confirm_pass">Confirm your password</label>
                    <input type={hiddenPassword ? "password" : "text"}
                        placeholder="Repeat your password"
                        minLength={8}
                        name="confirm_password" id="confirm_password"
                        required />
                </fieldset>
                <div className={styles.visibility_wrapper}>
                    <Image src={hiddenPassword ? hiddenIco : visibleIco}
                        alt="password visibility"
                        className={styles.visibility}
                        onClick={() => setHiddenPassword(!hiddenPassword)} />
                    <p>Show password</p>
                </div>
                <OrangeButton type="submit">Register</OrangeButton>
                <p className={styles.error_msg}>{errorMsg}</p>
            </form>
        </div>
    )
}