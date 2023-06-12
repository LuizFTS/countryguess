import { ChronometerContextProvider } from '@/context/ChronometerContext'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <ChronometerContextProvider>
      <html lang="en">
        <body className={`${inter.className} bg-cyan-200`}>{children}</body>
      </html>
    </ChronometerContextProvider>
  )
}
