import { Metadata } from "next";
import React from "react";
import { Open_Sans } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "react-hot-toast";
export const metadata: Metadata = {
    title: "Sign in to Euphoria Admin Dashboard",
    description: "Sign in to manage the Euphoria Store",
};
const open_sans = Open_Sans({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
});
export default function AdminSignInLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${open_sans.className}`}>
                <main className="w-full min-h-screen px-4  bg-background">
                    {children}
                </main>
                <Toaster
                    position="bottom-right"
                />
            </body>
        </html>
    );
}
