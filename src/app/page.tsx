import styles from "./page.module.css"
import Image from "next/image"
import logo from "../../public/assets/images/logo.svg"
import illustration from "../../public/assets/images/illustratrion.svg"
import OrangeButton from "@/components/pages/OrangeButton/OrangeButton"

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.logo_greetings}>
        <Image src={logo} alt="adopet logo" />
        <h1>Welcome!</h1>
        <p>Adopting can change a life. How about finding your new best friend today?</p>
        <p>Come with us!</p>
      </div>
      <div className={styles.buttons_wrapper}>
        <OrangeButton>Login</OrangeButton>
        <OrangeButton>Create an account</OrangeButton>
      </div>
      <Image src={illustration} alt="cat and dog illustration" className={styles.illustration}/>
    </main>
  )
}
