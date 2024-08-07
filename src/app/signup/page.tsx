"use client"

import Image from "next/image"
import styles from "./styles.module.css"
import logo from "../../../public/assets/images/logo.svg"
import hiddenIco from "../../../public/assets/icons/visibility_off.svg"
import visibleIco from "../../../public/assets/icons/visibility_on.svg"
import { ChangeEvent, useEffect, useState } from "react"
import OrangeButton from "@/components/OrangeButton/OrangeButton"
import { TUserRole } from "../../types/random_types"
import DefaultFieldset from "@/components/DefaultFieldset/DefaultFieldset"
import { createAccount } from "@/actions/create_account"
import login from "@/actions/login"
import NotLoggedLayout from "@/components/layouts/Layout/NotLoggedLayout"
import { useRouter } from "next/navigation"

export default function SignupPage() {

    const router = useRouter()

    const [isCreatingAccount, setIsCreatingAccount] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [hiddenPassword, setHiddenPassword] = useState(true)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [userRole, setUserRole] = useState<TUserRole>("owner")

    useEffect(() => {

        if (isCreatingAccount) {

            const doTheStuff = async () => {
                let errorMsg = await createAccount({
                    name: name,
                    email: email,
                    user_role: userRole,
                    password: password
                })
                if (errorMsg === "") {
                    const { token, error } = await login({ email: email, password: password })
                    if (error === null) {
                        window.localStorage.setItem("token", token)
                        router.push("/home")
                    } else {
                        errorMsg = "User created, but failed to login automatically"
                    }
                }
                setErrorMsg(errorMsg)
            }

            doTheStuff().finally(() => setIsCreatingAccount(false))
        }

    }, [isCreatingAccount])

    async function handleForm(fd: FormData) {
        if (password !== confirmPassword) {
            setErrorMsg("Both password fields must be equal")
            return
        }
        setErrorMsg("")
        setIsCreatingAccount(true)
    }

    function onChangeRadios(e: ChangeEvent<HTMLInputElement>) {
        setUserRole(e.target.value as TUserRole)
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
                        <input type="text" placeholder="Your full name here" name="name" id="name"
                            value={name} onChange={e => setName(e.target.value)} required />
                    </DefaultFieldset>
                    <DefaultFieldset>
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Your email here" name="email" id="email"
                            value={email} onChange={e => setEmail(e.target.value)} required />
                    </DefaultFieldset>
                    <DefaultFieldset>
                        <label htmlFor="password">Password</label>
                        <input type={hiddenPassword ? "password" : "text"}
                            placeholder="Please write a great password, please"
                            minLength={8}
                            name="password" id="password"
                            value={password} onChange={e => setPassword(e.target.value)} required
                        />
                    </DefaultFieldset>
                    <DefaultFieldset>
                        <label htmlFor="confirm_pass">Confirm your password</label>
                        <input type={hiddenPassword ? "password" : "text"}
                            placeholder="Repeat your password"
                            minLength={8}
                            name="confirm_password" id="confirm_password"
                            value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                    </DefaultFieldset>
                    <DefaultFieldset>
                        <span className={styles.radios_title}>Do you...</span>
                        <div className={styles.radios_wrapper}>
                            <div className={styles.radio_field}>
                                <input type="radio" name="user_role" id="adopter" value="adopter"
                                    checked={userRole === "adopter"} onChange={onChangeRadios} required />
                                <label htmlFor="adopter">want to adopt</label>
                            </div>
                            <div className={styles.radio_field}>
                                <input type="radio" name="user_role" id="owner" value="owner"
                                    checked={userRole === "owner"} onChange={onChangeRadios} required />
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
                    <OrangeButton type="submit" className={styles.button} disabled={isCreatingAccount}>Register</OrangeButton>
                    {isCreatingAccount ? <p className={styles.creating_user_msg}>Creating user...</p> : <p className={styles.error_msg}>{errorMsg}</p>}
                </form>
            </div>
        </NotLoggedLayout>
    )
}