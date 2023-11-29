
import styles from "./LoggedLayout.module.css"
import Image from "next/image"
import logo from "../../../../public/assets/images/logo.svg"
import homeIco from "../../../../public/assets/icons/home.svg"
import contactIco from "../../../../public/assets/icons/mail.svg"
import profileIco from "../../../../public/assets/icons/profile.svg"
import logoutIco from "../../../../public/assets/icons/logout_icon.svg"
import Link from "next/link"

export default function LoggedLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <>
      <header className={styles.header}>
        <Link href={"/"} className={styles.header_logo}>
          <Image src={logo} alt="adopet logo" color="black" priority />
        </Link>
        <div className={styles.nav_buttons}>
          <Link href={"/home"}>
            <Image src={homeIco} alt="Home icon" />
          </Link>
          <Link href={"/messages"}>
            <Image src={contactIco} alt="Contact icon" />
          </Link>
          <Link href={"/profile"}>
            <Image src={profileIco} alt="acount profile icon" />
          </Link>
          <button className={styles.logout_button} onClick={() => {
            window.localStorage.clear()
            location.reload()
          }}>
            <Image src={logoutIco} alt="logout icon" />
          </button>
        </div>
      </header>
      <main className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>
        <div className={styles.footer_content}>
          <Link href="https://github.com/Chufretalas/adopet" target="blank">
            2023 -Developed by Chufretalas
          </Link>
        </div>
      </footer>
    </>
  )
}
