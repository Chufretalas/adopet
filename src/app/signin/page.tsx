"use client"

import Image from "next/image"
import styles from "./styles.module.css"
import logo from "../../../public/assets/images/logo.svg"
import hiddenIco from "../../../public/assets/icons/visibility_off.svg"
import visibleIco from "../../../public/assets/icons/visibility_on.svg"
import { useState } from "react"
import { createAccount } from "@/actions/account"

export default function SigninPage() {

    const [errorMsg, setErrorMsg] = useState("")
    const [hiddenPassword, setHiddenPassword] = useState(true)

    async function handleForm(fd: FormData) {
        console.log(fd)
        createAccount(fd)
    }

    return (
        <main>
            <Image src={logo} alt="adopet logo" color="blue" />
            <p>Don't have an account?</p>
            <p>So, before finding a new friend, we need some info about you.</p>
            <form action={handleForm}>
                <fieldset>
                    <label htmlFor="">Name</label>
                    <input type="text" placeholder="Your full name here" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder="Your email here" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="">Password</label>
                    <input type={hiddenPassword ? "password" : "text"}
                        placeholder="Please write a great password, please"
                        minLength={8} required />
                </fieldset>
                <fieldset>
                    <label htmlFor="">Confirm your password</label>
                    <input type={hiddenPassword ? "password" : "text"}
                        placeholder="Repeat your password"
                        minLength={8} required />
                </fieldset>
                <Image src={hiddenPassword ? hiddenIco : visibleIco}
                    alt="password visibility"
                    onClick={() => setHiddenPassword(!hiddenPassword)} />
                <button type="submit">Register</button>
                <p>{errorMsg}</p>
            </form>
        </main>
    )
}