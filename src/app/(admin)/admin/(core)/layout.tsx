import { Metadata } from "next";
import React from "react";
import { Open_Sans } from "next/font/google";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import "@/app/globals.css";
import { Toaster } from "react-hot-toast";
export const metadata: Metadata = {
  title: "Euphoria Admin Dashboard",
  description: "Admin Dashboard for Euphoria Store",
};
const open_sans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${open_sans.className}`}>
        <Sidebar isDesktop />
        <Header />
        <main className="lg:ml-[270px] min-h-screen w-full px-4 lg:w-[calc(100%-270px)] mr-auto mt-[68px] bg-[#F3F4F8]">
          {children}
        </main>
        <Toaster
          position="bottom-right"
        />
      </body>
    </html>
  );
}
