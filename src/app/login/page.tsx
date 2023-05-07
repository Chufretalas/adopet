import styles from "./styles.module.css"


async function makeLogin(fd: FormData) {
    "use server"
    
}

export default function LoginPage() {

    return (
        <form action={makeLogin}>
            <input type="text" name="something" required />
            <button type="submit">aquiiiiiiii</button>
        </form>
    )
}