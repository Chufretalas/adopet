"use client"

import Image from "next/image"
import styles from "./styles.module.css"
import logo from "../../../public/assets/images/logo.svg"
import hiddenIco from "../../../public/assets/icons/visibility_off.svg"
import visibleIco from "../../../public/assets/icons/visibility_on.svg"
import { useState } from "react"
import OrangeButton from "@/components/OrangeButton/OrangeButton"
import { TUserRole } from "../../types/random_types"
import { redirect } from 'next/navigation'
import DefaultFieldset from "@/components/DefaultFieldset/DefaultFieldset"
import { createAccount } from "@/actions/create_account"
import login from "@/actions/login"
import NotLoggedLayout from "@/components/layouts/Layout/NotLoggedLayout"

export default function SignupPage() {

    const [errorMsg, setErrorMsg] = useState("")
    const [hiddenPassword, setHiddenPassword] = useState(true)

    async function handleForm(fd: FormData) {
        const pass = fd.get("password") as string
        const confirmPass = fd.get("confirm_password") as string
        if (confirmPass !== pass) {
            setErrorMsg("Both password fields must be equal")
            return
        }

        setErrorMsg("")
        const sucess = await createAccount({
            name: fd.get("name") as string,
            email: fd.get("email") as string,
            user_role: fd.get("user_role") as TUserRole,
            password: pass
        })
        console.log(sucess)
        if (sucess) {
            const { token, error } = await login({ email: fd.get("email") as string, password: fd.get("password") as string })
            if (error === null) {
                window.localStorage.setItem("token", token)
            }
            redirect("/home")
        }
    }

    return (
        <NotLoggedLayout>
            <div className={styles.main}>
                <div className={styles.header_wrapper}>
                    <Image src={logo} alt="adopet logo" className={styles.logo} />
                    <p className={styles.header_p}>Don't have an account?</p>
                    <p className={styles.header_p}>So, before finding a new friend, we need some info about you.</p>
                </div>
                <hr className={styles.hr} />
                <form action={handleForm} className={styles.form}>
                    <DefaultFieldset>
                        <label htmlFor="name">Name</label>
                        <input type="text" placeholder="Your full name here" name="name" id="name" required />
                    </DefaultFieldset>
                    <DefaultFieldset>
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Your email here" name="email" id="email" required />
                    </DefaultFieldset>
                    <DefaultFieldset>
                        <label htmlFor="password">Password</label>
                        <input type={hiddenPassword ? "password" : "text"}
                            placeholder="Please write a great password, please"
                            minLength={8}
                            name="password" id="password"
                            required
                        />
                    </DefaultFieldset>
                    <DefaultFieldset>
                        <label htmlFor="confirm_pass">Confirm your password</label>
                        <input type={hiddenPassword ? "password" : "text"}
                            placeholder="Repeat your password"
                            minLength={8}
                            name="confirm_password" id="confirm_password"
                            required />
                    </DefaultFieldset>
                    <DefaultFieldset>
                        <span className={styles.radios_title}>Do you...</span>
                        <div className={styles.radios_wrapper}>
                            <div className={styles.radio_field}>
                                <input type="radio" name="user_role" id="adopter" value="adopter" defaultChecked={true} required />
                                <label htmlFor="adopter">want to adopt</label>
                            </div>
                            <div className={styles.radio_field}>
                                <input type="radio" name="user_role" id="owner" value="owner" required />
                                <label htmlFor="owner">have pets to put for adoption</label>
                            </div>
                        </div>
                    </DefaultFieldset>
                    <div className={styles.visibility_wrapper}>
                        <Image src={hiddenPassword ? hiddenIco : visibleIco}
                            alt="password visibility"
                            className={styles.visibility}
                            onClick={() => setHiddenPassword(!hiddenPassword)} />
                        <p>Show password</p>
                    </div>
                    <OrangeButton type="submit" className={styles.button}>Register</OrangeButton>
                    <p className={styles.error_msg}>{errorMsg}</p>
                </form>
            </div>
        </NotLoggedLayout>
    )
}