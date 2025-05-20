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
import { Copy, Edit2Icon, MoreHorizontal, ShoppingBagIcon } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { getAdminOrders } from "@/actions/orders.actions";
import CustomDialog from "@/components/custom-dialog";
import { convertToCurrency } from "@/utils/convertToCurrency";
import { formatter } from "@/utils/formatter";
import { DEFAULT_CURRENCY } from "@/constants";

type Status = $Enums.Status;
type StatusOptions = {
    label: Capitalize<Lowercase<Status>>
    value: Status,
    color: string
}[]

type Props = {
    id: string;
    currentStatus: Status;
    products: ServerActionReturnType<typeof getAdminOrders>['orders'][0]['products']
};

export default function CellAction({ id, currentStatus, products }: Props) {
    const [open, setOpen] = React.useState(false);
    const [localStatus, setLocalStatus] = React.useState<Status>(currentStatus);
    function handleCopyClick() {
        navigator.clipboard.writeText(id);
        toast.success("Product ID copied to clipboard");
    }
    function handleStatusChange(newStatus: Status) {
        setLocalStatus(newStatus);
        toast.success(`Status changed to ${newStatus[0] + newStatus.toLowerCase().slice(1)}`);
    }
    function handleOpen() {
        setOpen(!open);
    }
    const statusOptions: StatusOptions = [
        { label: 'Pending', value: 'PENDING', color: 'text-yellow-500' },
        { label: 'Delivered', value: 'DELIVERED', color: 'text-green-500' },
        { label: 'Failed', value: 'FAILED', color: 'text-red-500' },
        { label: 'Paid', value: 'PAID', color: 'text-blue-500' }
    ];

    return (
        <>
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
                    <DropdownMenuItem>
                        <Button variant={'ghost'} onClick={handleOpen}>
                            <ShoppingBagIcon className="h-4 w-4 mr-2" />
                            View Products
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>

                            <Button variant="ghost">
                                <Edit2Icon className="h-4 w-4 mr-2" />
                                Change Status
                            </Button>

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
            <CustomDialog open={open} setOpen={setOpen} withTrigger={false}>
                <div className="flex flex-col gap-4">
                    {products.map((product) => (
                        <div className="flex items-center gap-4">
                            <img src={product?.images ? product.images[0] : ''} alt={product.name} className="w-16 h-16 rounded-md object-cover" />
                            <div>
                                <p>{product.name}</p>
                                <p className="text-neutral-foreground">
                                    {`${convertToCurrency(product.price, DEFAULT_CURRENCY, '₦')}`}  x
                                    <span className="text-sm">
                                        {product.quantity}
                                    </span> </p>
                            </div>
                        </div>
                    ))}
                </div>

            </CustomDialog>
        </>
    );
}
