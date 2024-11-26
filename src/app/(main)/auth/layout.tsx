import Navbar from "../(root)/components/navbar"
import AuthAsideImage from "./components/auth-aside-image"
import { causten } from "@/constants/fonts"
import '@/app/globals.css'
import { Toaster } from "react-hot-toast"
export const metadata = {
  title: 'Euphoria (join the family by registering)',
  description: 'Join the Euphoria family by registering an account',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const authImages = {
    '/auth/login': {
      image: '/login.png',
      alt: 'Login Image'
    },
    '/auth/register': {
      image: '/verify-email.png',
      alt: 'Register Image'
    },
    '/auth/reset-password': {
      image: '/reset-password.png',
      alt: 'Reset Password Image'
    },
    '/auth/new-password': {
      image: '/new-password.png',
      alt: 'New Password Image'
    },
    '/auth/verify-email': {
      image: '/verify-email.png',
      alt: 'Verify Email Image'
    },
    '/auth/check-email': {
      image: '/check-email.png',
      alt: 'Check Email'
    }

  }
  return (
    <html lang="en">
      <body className={causten.className}>
        {/* Should always be null in this page */}
        <Navbar session={null} categories={[]} />
        <main className="flex flex-col h-fit lg:min-h-[calc(100vh-(20*0.25rem))] lg:flex-row mt-[calc(20*0.25rem)]">
          <AuthAsideImage images={authImages} />
          {children}
        </main>
        <Toaster
          position="bottom-right"
        />
      </body>
    </html>
  )
}
