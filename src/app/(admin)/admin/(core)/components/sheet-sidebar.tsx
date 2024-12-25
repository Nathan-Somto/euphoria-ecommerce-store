'use client'

import { SheetTrigger,Sheet, SheetContent } from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import Sidebar from "./sidebar"

export default function sheetSidebar(){
  return (
   <div className="lg:hidden block h-[18px]">
    <Sheet >
    <SheetTrigger className="!p-0 max-h-fit">
    <MenuIcon className="hover:opacity-50" size={18}/>
    </SheetTrigger>
    <SheetContent side={'left'} className="w-[270px]">
    <Sidebar isMobile/>
    </SheetContent>
    </Sheet>
   </div>
  )
}
