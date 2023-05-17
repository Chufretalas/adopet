import bcrypt from "bcrypt"

export async function hashPass(plainPass: string) {
    return await bcrypt.hash(plainPass, 8)
}

export async function comparePass(plainPass: string, hashed: string) {
    return await bcrypt.compare(plainPass, hashed)
}