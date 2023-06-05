import "./reset.css"
import './globals.css'
import localFont from 'next/font/local'
import styles from "./layout.module.css"
import Image from "next/image"
import logo from "../../public/assets/images/logo.svg"
import homeIco from "../../public/assets/icons/home.svg"
import contactIco from "../../public/assets/icons/mail.svg"
import Link from "next/link"

const josefin = localFont({
  src: [
    { path: "../fonts/josefin_sans/JosefinSans-VariableFont_wght.ttf", style: "normal" },
    { path: "../fonts/josefin_sans/JosefinSans-Italic-VariableFont_wght.ttf", style: "italic" }
  ]
})

export const metadata = {
  title: 'Adopet',
  description: 'Mock adopting plataform for pets',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (

    <html lang="en">
      <body className={`${josefin.className} ${styles.white_bg}`}>
        <header className={styles.header}>
          <Link href={"/"}>
            <Image src={logo} alt="adopet logo" color="black" className={styles.header_logo} />
          </Link>
          <div className={styles.nav_buttons}>
            <Link href={"/home"}>
              <Image src={homeIco} alt="Home icon" />
            </Link>
            <Image src={contactIco} alt="Contact icon" />
          </div>
        </header>
        <main className={styles.main}>
          {children}
        </main>
        <footer className={styles.footer}>
          <div className={styles.footer_content}>
            2023 -Developed by Chufretalas
          </div>
        </footer>
      </body>
    </html>
  )
}
