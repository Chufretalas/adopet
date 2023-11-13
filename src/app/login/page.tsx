"use client"

import { useEffect, useState } from "react"
import styles from "./styles.module.css"
import logo from "../../../public/assets/images/logo.svg"
import hiddenIco from "../../../public/assets/icons/visibility_off.svg"
import visibleIco from "../../../public/assets/icons/visibility_on.svg"
import Image from "next/image"
import OrangeButton from "@/components/OrangeButton/OrangeButton"
import { useSearchParams, useRouter, redirect } from "next/navigation"
import DefaultFieldset from "@/components/DefaultFieldset/DefaultFieldset"
import login from "@/actions/login"
import useUser from "@/hooks/use_user"

//TODO: find a way to take the person to /home if he is logged in, maybe with a url param, saying he was sent there because he wasnt logged in so theres no need to check
export default function LoginPage() {

    const { user, error, isLoading } = useUser()

    const sParams = useSearchParams()

    const router = useRouter()

    useEffect(() => {
        if (user && !error && !isLoading) {
            router.push("/home")
        }
    }, [user, error, isLoading])

    const [errorMsg, setErrorMsg] = useState("")

    const needsLogin = sParams.has("redirect")

    const [hiddenPassword, setHiddenPassword] = useState(true)

    async function handleForm(fd: FormData) {
        const { token, error } = await login({ email: fd.get("email") as string, password: fd.get("password") as string })
        setErrorMsg("")
        if (error === null) {
            localStorage.setItem("token", token)
            if (sParams.has("redirect")) {
                return router.push(sParams.get("redirect")!)
            }
            router.push("/home")
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
                <DefaultFieldset>
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Your email here"
                        id="email" name="email" required />
                </DefaultFieldset>
                <DefaultFieldset>
                    <label htmlFor="password">Password</label>
                    <input type={hiddenPassword ? "password" : "text"}
                        placeholder="Your beautiful and secure password"
                        minLength={8}
                        id="password" name="password" required />
                </DefaultFieldset>
                <div className={styles.visibility_wrapper}>
                    <Image src={hiddenPassword ? hiddenIco : visibleIco}
                        alt="password visibility"
                        className={styles.visibility}
                        onClick={() => setHiddenPassword(!hiddenPassword)} />
                    <p>Show password</p>
                </div>
                <OrangeButton type="submit" className={styles.button}>Login</OrangeButton>
                <p className={styles.error_msg}>{errorMsg}</p>
                {needsLogin ? (<p className={styles.error_msg}>You need to login to access that page</p>) : (<></>)}
            </form>
        </div>
    )
}