import 'font-awesome/scss/font-awesome.scss'
import './styles.scss'

import { Open_Sans, Nunito_Sans } from 'next/font/google'

const open_sans = Open_Sans({ subsets: ['latin'], variable: '--font-open-sans', display: 'swap',})
const nunito = Nunito_Sans({ weight: ['200', '300', '400', '600', '700', '800', '900'], subsets: ['latin'], variable: '--font-nunito-sans', display: 'swap',})

export const metadata = {
  title: 'Zowber Portfolio',
  description: 'Recent work by Andy Bright',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${open_sans.variable} ${nunito.variable}`}>
      <body>{children}</body>
    </html>
  )
}
