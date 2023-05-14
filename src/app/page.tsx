import styles from "./page.module.css"
import Image from "next/image"
import logo from "../../public/assets/images/logo_blue.svg"
import illustration from "../../public/assets/images/illustratrion.svg"
import OrangeButton from "@/components/pages/OrangeButton/OrangeButton"
import Link from "next/link"

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.logo_greetings}>
        <Image src={logo} alt="adopet logo" />
        <h1>Welcome!</h1>
        <p>Adopting can change a life. How about finding your new best friend today?</p>
        <p>Come with us!</p>
      </div>
      <div className={styles.buttons_wrapper}>
        <Link href={"/login"}>
          <OrangeButton>Login</OrangeButton>
        </Link>
        <Link href={"/signup"}>
          <OrangeButton>Create an account</OrangeButton>
        </Link>
      </div>
      <Image src={illustration} alt="cat and dog illustration" className={styles.illustration} />
    </div>
  )
}
