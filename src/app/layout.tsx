import "./reset.css"
import './globals.css'
import localFont from 'next/font/local'
import styles from "./layout.module.css"

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
        {children}
      </body>
    </html>
  )
}
