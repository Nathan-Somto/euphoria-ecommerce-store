'use client'
import { getWishlistProducts, toggleWishlist } from '@/actions/wishlist.actions';
import DeleteDialog from '@/components/delete-dialog';
import { Button } from '@/components/ui/button';
import useCart from '@/hooks/use-cart';
import { HeartIcon, ShoppingCartIcon, X, XIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import WishlistItem from './wishlist-item';
import toast from 'react-hot-toast';
import { errorLogger } from '@/utils/errorLogger';
type WishlistProps = {
    data: ServerActionReturnType<typeof getWishlistProducts>;
}
export default function Wishlist({ data }: WishlistProps) {
    const [open, setOpen] = React.useState(false);
    const [isRemovePending, startRemoveTransition] = React.useTransition();
    const [selectedItem, setSelectedItem] = React.useState<Pick<typeof data[number], 'id' | 'name'>>({ id: '', name: '' });
    const onRemoveWishlist = async () => {
        startRemoveTransition(() => {
            // remove wishlist
            toggleWishlist(selectedItem.id).then((data) => {
                if (data?.error) {
                    throw new Error(data.message);
                }
                toast.success(`${selectedItem.name} removed from wishlist`);
                setOpen(false);
            }).catch((err) => {
                errorLogger(err)
                toast.error(`failed to remove ${selectedItem.name} from wishlist`);
            });
        })
    };
    const openConfirmation = (id: string, name: string) => {
        setSelectedItem({ id, name });
        setOpen(true);
    }
    return (
        <section id="wishlist-section">
            {
                data.length === 0 ? (
                    <div className="flex items-center py-6 h-[400px] shadow-lg rounded-md flex-col">
                        <div
                            className="size-32 hover:scale-110 hover:-translate-y-1 p-2 mb-7 mx-auto  bg-[#F0F9F4] rounded-full flex items-center justify-center"
                        >
                            <HeartIcon className='size-16 mx-auto text-[#28A642]' />
                        </div>
                        <div className="text-center mb-5">
                            <h2 className="font-semibold mb-2 text-lite-foreground">Your wishlist is empty</h2>
                            <p className="text-neutral-foreground mx-auto w-[80%] text-sm"> You don't have any products in the wishlist yet. You will find a lot
                                of interesting products on our Shop page.</p>
                        </div>
                        <Button asChild>
                            <Link href="/">Continue Shopping</Link>
                        </Button>
                    </div>
                ) : (
                    <div>
                        {
                            data.map((product) => (
                                <WishlistItem
                                    product={product}
                                    key={product.id}
                                    openConfirmation={openConfirmation}
                                />
                            ))
                        }
                    </div>
                )
            }
            <DeleteDialog
                customTemplate={{
                    title: "Are You Sure?",
                    message: `Are you sure you want to remove ${selectedItem.name} from your wishlist`,
                    Icon: XIcon
                }}
                open={open}
                setOpen={setOpen}
                id={selectedItem.id}
                isPending={isRemovePending}
                customAction={onRemoveWishlist}
            />
        </section>
    )
}
