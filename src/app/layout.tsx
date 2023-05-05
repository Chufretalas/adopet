import "./reset.css"
import './globals.css'
import { Josefin_Sans } from 'next/font/google'
import styles from "./layout.module.css"
import Image from "next/image"
import logo from "../../public/assets/images/logo.svg"
import homeIco from "../../public/assets/icons/home.svg"
import contactIco from "../../public/assets/icons/mail.svg"

const josefin = Josefin_Sans({ subsets: ['latin'], variable: "--font-josefin"})

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
      <body className={josefin.className}>
        <header className={styles.header}>
          <Image src={logo} alt="adopet logo" color="black" className={styles.header_logo} />
          <div className={styles.nav_buttons}>
            <Image src={homeIco} alt="Home icon" />
            <Image src={contactIco} alt="Contact icon" />
          </div>
        </header>
        {children}
        <footer className={styles.footer}>
          <div className={styles.footer_content}>
            2023 -Developed by Chufretalas
          </div>
        </footer>
      </body>
    </html>
  )
}
