import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'
import Navbar from './components/navbar'
import Footer from './components/footer'
import { currentSession } from '@/lib/next-auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Euphoria Store',
  description: '',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await currentSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar session={session} />
        <main className='mt-20'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
