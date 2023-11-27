
import styles from "./NotLoggedLayout.module.css"
import Image from "next/image"
import logo from "../../../../public/assets/images/logo.svg"
import Link from "next/link"

export default function NotLoggedLayout({
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
