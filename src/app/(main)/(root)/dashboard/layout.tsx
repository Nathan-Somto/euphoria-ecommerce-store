import { PropsWithChildren } from "react";
import DashboardSidebar from "./components/dashboard-sidebar";
import { currentSession } from "@/lib/next-auth";
import { SessionProvider } from "next-auth/react";
import { checkIfBanned } from "@/utils/checkIfBanned";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: PropsWithChildren) {
    const session = await currentSession()
    if (session && checkIfBanned(session)) {
        redirect('/banned')
    }
    return (
        <SessionProvider>
            <div className="max-w-screen-lg grid lg:grid-cols-[250px_1fr] mx-auto h-full">
                <DashboardSidebar username={session?.user?.username ?? ''} />
                <div className="ml-10  w-[calc(100%-40px)]">
                    {children}
                </div>
            </div>
        </SessionProvider>
    )
}