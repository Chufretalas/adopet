import styles from "./page.module.css"
import Image from "next/image"
import logo from "../../public/assets/images/logo_blue.svg"
import illustration from "../../public/assets/images/illustratrion.svg"
import OrangeButton from "@/components/OrangeButton/OrangeButton"
import Link from "next/link"
import NotLoggedLayout from "@/components/layouts/Layout/NotLoggedLayout"

export default function Home() {
  return (
    <NotLoggedLayout>
      <div className={styles.main}>
        <span className={styles.disclaimer}>Disclaimer! This site is just a portfolio project, it's not meant to be used as way to find pets to adopt or anything that relates to the apparent usage of this site.</span>
        <div className={styles.logo_greetings} >
          <Image src={logo} alt="adopet logo" className={styles.big_logo} />
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
    </NotLoggedLayout>
  )
}
