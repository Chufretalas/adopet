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
        console.log(fd)
        createAccount(fd)
    }

    return (
        <div className={styles.main}>
            <div className={styles.header_wrapper}>
                <Image src={logo} alt="adopet logo" color="blue" className={styles.logo} />
                <p className={styles.header_p}>Don't have an account?</p>
                <p className={styles.header_p}>So, before finding a new friend, we need some info about you.</p>
            </div>
            <hr className={styles.hr}/>
            <form action={handleForm} className={styles.form}>
                <fieldset className={styles.fieldset}>
                    <label htmlFor="">Name</label>
                    <input type="text" placeholder="Your full name here" required />
                </fieldset>
                <fieldset className={styles.fieldset}>
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder="Your email here" required />
                </fieldset>
                <fieldset className={styles.fieldset}>
                    <label htmlFor="">Password</label>
                    <input type={hiddenPassword ? "password" : "text"}
                        placeholder="Please write a great password, please"
                        minLength={8} required />
                </fieldset>
                <fieldset className={styles.fieldset}>
                    <label htmlFor="">Confirm your password</label>
                    <input type={hiddenPassword ? "password" : "text"}
                        placeholder="Repeat your password"
                        minLength={8} required />
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