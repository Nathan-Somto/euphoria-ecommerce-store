import type { Metadata } from 'next'
import '@/app/globals.css'
import Navbar from './components/navbar'
import Footer from './components/footer'
import { causten } from "@/constants/fonts"
import { currentSession } from '@/lib/next-auth'
import { cachedGetCategories } from '@/actions/categories.actions'
import { Toaster } from "react-hot-toast"
import { headers } from 'next/headers'
import { getCachedWishlistProductIds } from '@/actions/wishlist.actions'
import { WishlistProvider } from '@/providers/wishlist-provider'
import { SessionProvider } from 'next-auth/react'
export const metadata: Metadata = {
  title: 'Euphoria Store',
  description: '',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = headers();
  const currentPath = headersList.get('x-pathname');
  const { data: categories } = await cachedGetCategories();
  const session = await currentSession();
  let wishlistProductIds: Record<string, boolean> | undefined;
  if (session?.user) {
    const { data } = await getCachedWishlistProductIds();
    wishlistProductIds = data;
  }
  const routes = ['/style-guide'];
  const dontShowFooter = currentPath ? !routes.includes(currentPath) : true;
  return (
    <html lang="en">
      <body className={causten.className}>
        <Navbar session={session} categories={categories ?? []} />
        <SessionProvider session={session}>
          <WishlistProvider data={{
            wishlistProductIds: wishlistProductIds ?? {}
          }}>
            <main className='mt-20'>
              {children}
            </main>
          </WishlistProvider>
        </SessionProvider>
        {dontShowFooter && <Footer />}
        <Toaster position='bottom-right' />
      </body>
    </html>
  )
}
