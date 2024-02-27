"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import sidebarData from "./data";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { cn } from "@/lib/utils";
export default function Sidebar({ isDesktop=true, isMobile=false }: SidebarProps) {
  const pathname = usePathname();
  return (
    <aside
      className={cn(
        "w-[270px]  h-full border hidden border-r p-4 border-r-slate-300 top-0 left-0 fixed bg-white",
        isDesktop && "lg:block hidden",
        isMobile && "block"
      )}
    >
      <div className="mb-8">
        <Image src={"/Logo.svg"} alt={"logo"} width={100} height={100} />
      </div>
      <ul className="">
        <div>
          {sidebarData.map((item, index) => {
            if (typeof item === "string") {
              return (
                <li
                  key={uuidv4()}
                  className={cn(
                    "font-light px-1.5 text-[14px] text-[#8B909A] my-5  uppercase",
                    index !== 0 && "mt-8 mb-5"
                  )}
                >
                  {item}
                </li>
              );
            }
            return (
              <li
                key={uuidv4()}
                className={cn(
                  "hover:bg-[#F3F4F8] hover:text-black/90 text-[#8B909A] font-semibold rounded-sm py-3.5 px-3",
                  pathname === item.href && "text-black/90"
                )}
              >
                <Link
                  href={item.href}
                  className="flex  capitalize items-center gap-2.5"
                >
                  <item.icon />
                  {item.text}
                </Link>
              </li>
            );
          })}
        </div>
        <div></div>
      </ul>
    </aside>
  );
}
