import 'font-awesome/scss/font-awesome.scss'
import './styles.scss'

import { Open_Sans, Nunito_Sans } from 'next/font/google'

import GoogleAnalytics from './GoogleAnalytics'

const open_sans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
})

export const metadata = {
  title: 'Andy Bright - Portfolio',
  description: 'Product and UX Design Lead',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='en'
      className={`${open_sans.variable}`}
    >
      {process.env.GA_TRACKING_ID && (
        <GoogleAnalytics GA_TRACKING_ID={process.env.GA_TRACKING_ID} />
      )}
      <body>{children}</body>
    </html>
  )
}
