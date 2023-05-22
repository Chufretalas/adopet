"use client"

import { useState } from "react"
import styles from "./styles.module.css"
import logo from "../../../public/assets/images/logo.svg"
import hiddenIco from "../../../public/assets/icons/visibility_off.svg"
import visibleIco from "../../../public/assets/icons/visibility_on.svg"
import Image from "next/image"
import OrangeButton from "@/components/pages/OrangeButton/OrangeButton"
import { redirect } from "next/navigation"
import { signIn } from 'next-auth/react';

export default function LoginPage() {

    const [errorMsg, setErrorMsg] = useState("")
    const [hiddenPassword, setHiddenPassword] = useState(true)

    async function handleForm(fd: FormData) {
        const res = await signIn("credentials", {
            redirect: false,
            callbackUrl: "/home",
            email: fd.get("email") as string,
            password: fd.get("password") as string
        })
        console.log(res)
        setErrorMsg("")
        if (!res?.error) {
            redirect("/home")
        }
        setErrorMsg("Invalid credentials")
    }

    return (
        <div className={styles.main}>
            <div className={styles.header_wrapper}>
                <Image src={logo} alt="adopet logo" className={styles.logo} />
                <p className={styles.header_p}>Already have an account? So just log right in.</p>
            </div>
            <hr className={styles.hr} />
            <form action={handleForm} className={styles.form}>
                <fieldset className={styles.fieldset}>
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Your email here"
                        id="email" name="email" required />
                </fieldset>
                <fieldset className={styles.fieldset}>
                    <label htmlFor="password">Password</label>
                    <input type={hiddenPassword ? "password" : "text"}
                        placeholder="Your beautiful and secure password"
                        minLength={8}
                        id="password" name="password" required />
                </fieldset>
                <div className={styles.visibility_wrapper}>
                    <Image src={hiddenPassword ? hiddenIco : visibleIco}
                        alt="password visibility"
                        className={styles.visibility}
                        onClick={() => setHiddenPassword(!hiddenPassword)} />
                    <p>Show password</p>
                </div>
                <OrangeButton type="submit">Login</OrangeButton>
                <p className={styles.error_msg}>{errorMsg}</p>
            </form>
        </div>
    )
}