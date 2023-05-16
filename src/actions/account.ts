"use server"

import { ILoginInfo, ISignupInfo } from "@/interfaces/forms"
import { Dispatch, SetStateAction } from "react"

export async function createAccount(info: ISignupInfo) {
    console.log("criando conta", info)
}

export async function login(info: ILoginInfo) {
    console.log("logando", info)
}