'use client'
import { Button } from "@/components/ui/button";
import UserButton from "@/components/user-button";
import { BellIcon, SettingsIcon } from "lucide-react";
import React from "react";
import SheetSidebar from "./sheet-sidebar";
import NotificationBadge from "@/components/notification-badge";
import {useRouter} from 'next/navigation'
export default function header() {
  const router = useRouter()
  return (
    <header className="fixed justify-between top-0 left-0 right-0 bg-white shadow-md lg:ml-[270px] lg:w-[calc(100vw-270px)] w-full h-16 z-[5] flex px-5 items-center mr-auto">
      <div className="flex items-center gap-2.5">
        <SheetSidebar />
        <h1 className="text-xl text-black/90 font-semibold">Dashboard</h1>
      </div>
      <div className="flex items-center text-black/80 text-sm gap-3.5">
        <Button
          variant={"ghost"}
          className="text-black/70 relative !p-0 hover:scale-125 size-9"
          size="icon"
        >
          <NotificationBadge
            value={40}
          />
          <BellIcon size={20} />
        </Button>
        <Button
          variant={"ghost"}
          className="size-9 !p-0 hover:scale-125 text-black/70"
          size="icon"
          onClick={() => router.push('/admin/settings')}
        >
          <SettingsIcon size={20} />
        </Button>
        <UserButton
          username="John Doe"
          id="123"
          profilePhoto="https://randomuser.me/api/portraits"
        />
      </div>
    </header>
  );
}
