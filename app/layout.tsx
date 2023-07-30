import 'bootstrap/scss/bootstrap.scss'
import 'font-awesome/css/font-awesome.min.css'
import './globals.css'

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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
