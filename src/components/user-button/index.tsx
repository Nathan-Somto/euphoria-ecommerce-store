"use client"
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { LogOutIcon, UserIcon } from "lucide-react";
import { useRouter } from 'next/navigation'
export default function UserButton({
  username,
  profilePhoto,
  id,
}: userButtonProps) {
  const router = useRouter();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={profilePhoto} alt={`${username} profile image`} />
            <AvatarFallback>
              {username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <DropdownMenuContent className="mr-2 mt-2.5 py-1.5 w-[170px] space-y-2 px-3 ">
            <DropdownMenuItem className="gap-2 px-2 cursor-pointer" onClick={() => router.push(`/dashboard/${username}`)}>
              <UserIcon size={16} />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer px-2 hover:!text-red-400 text-red-400">
              <LogOutIcon className="" size={16} />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuTrigger>
      </DropdownMenu>
    </div>
  );
}
