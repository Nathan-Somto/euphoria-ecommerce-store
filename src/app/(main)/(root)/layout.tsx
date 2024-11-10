import type { Metadata } from 'next'
import '@/app/globals.css'
import Navbar from './components/navbar'
import Footer from './components/footer'
import { causten } from "@/constants/fonts"
import { currentSession } from '@/lib/next-auth'
import { cachedGetCategories } from '@/actions/categories.actions'
import { Toaster } from "react-hot-toast"

export const metadata: Metadata = {
  title: 'Euphoria Store',
  description: '',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: categories } = await cachedGetCategories();
  const session = await currentSession();
  return (
    <html lang="en">
      <body className={causten.className}>
        <Navbar session={session} categories={categories} />
        <main className='mt-20'>
          {children}
        </main>
        <Footer />
        <Toaster position='bottom-right'/>
      </body>
    </html>
  )
}
