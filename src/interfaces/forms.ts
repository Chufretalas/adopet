import { TUserRole } from "@/app/types/random_types"

export interface ISignupInfo {
    name:  string
    email: string
    user_role: TUserRole
    password: string
}

export interface ILoginInfo {
    email: string
    password: string
}