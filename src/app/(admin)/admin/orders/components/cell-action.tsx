'use client';
import { Button } from "@/components/ui/button";
import { $Enums } from 'prisma/prisma-client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Copy, Edit2Icon, MoreHorizontal } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

type Status = $Enums.Status;
type StatusOptions = {
    label: Capitalize<Lowercase<Status>>
    value: Status,
    color: string
}[]

type Props = {
    id: string;
    currentStatus: Status;
};

export default function CellAction({ id, currentStatus }: Props) {
    const [localStatus, setLocalStatus] = React.useState<Status>(currentStatus);
    function handleCopyClick() {
        navigator.clipboard.writeText(id);
        toast.success("Product ID copied to clipboard");
    }
    function handleStatusChange(newStatus: Status) {
        setLocalStatus(newStatus);
        toast.success(`Status changed to ${newStatus[0] + newStatus.toLowerCase().slice(1)}`);
    }

    const statusOptions: StatusOptions = [
        { label: 'Pending', value: 'PENDING', color: 'text-yellow-500' },
        { label: 'Delivered', value: 'DELIVERED', color: 'text-green-500' },
        { label: 'Cancelled', value: 'CANCELLED', color: 'text-red-500' },
        { label: 'Paid', value: 'PAID', color: 'text-blue-500' }
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>
                    <Button variant="ghost" onClick={handleCopyClick}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Order ID
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <>
                        <Button variant={'ghost'}>
                            <Edit2Icon className="h-4 w-4 mr-2" />
                            Change Status
                        </Button>
                        </>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuRadioGroup
                                value={localStatus}
                                onValueChange={(value: string) => handleStatusChange(value as Status)}
                            >
                                {statusOptions.map((status) => (
                                    <DropdownMenuRadioItem
                                        key={status.value}
                                        value={status.value}
                                        className={status.color}
                                    >
                                        {status.label}
                                    </DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
