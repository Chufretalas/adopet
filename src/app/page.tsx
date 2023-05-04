import styles from "./page.module.css"
import Image from "next/image"
import logo from "../../public/assets/images/logo.svg"

export default function Home() {
  return (
    <main className={styles.main}>
      <Image src={logo} alt="adopet logo" />
      <h1>Welcome!</h1>
      <p>Adopting can change a life. How about finding your new best friend today. Come with us!</p>
      <button>Login</button>
      <button>Create an account</button>
    </main>
  )
}
