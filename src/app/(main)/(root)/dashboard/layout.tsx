import { PropsWithChildren } from "react";
import DashboardSidebar from "./components/dashboard-sidebar";
import { currentSession } from "@/lib/next-auth";

export default async function DashboardLayout({ children }: PropsWithChildren) {
    const session = await currentSession()
    return (
        <div className="max-w-screen-lg mx-auto h-full grid  lg:grid-cols-[250px_1fr]">
            <DashboardSidebar username={session?.user?.username ?? ''} />
            <div className="border border-destructive ml-10 lg:ml-0 w-[calc(100%-40px)]">
                {children}
            </div>
        </div>)
}