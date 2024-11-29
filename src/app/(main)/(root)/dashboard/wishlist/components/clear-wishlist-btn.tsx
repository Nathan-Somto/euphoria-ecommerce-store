'use client'
import { clearWishlist } from '@/actions/wishlist.actions';
import DeleteDialog from '@/components/delete-dialog';
import { Button } from '@/components/ui/button'
import useWishlist from '@/hooks/use-wishlist';
import { errorLogger } from '@/utils/errorLogger';
import { TrashIcon, XIcon } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast';

export default function ClearWishlistBtn() {
    const [open, setOpen] = React.useState(false);
    const [isPending, startTransition] = React.useTransition();
    const { setWishlistProductIds, getTotalWishlistProducts } = useWishlist();
    const onClearWishlist = async () => {
        startTransition(() => {
            clearWishlist().then((data) => {
                if (data?.error) {
                    throw new Error(data.message);
                }
                setWishlistProductIds({});
                toast.success('Wishlist cleared');
                setOpen(false);
            }).catch((err) => {
                errorLogger(err)
                toast.error('Failed to clear wishlist');
            });
        })
    }
    const isDisabled = getTotalWishlistProducts() === 0;
    return (
        <>
            <Button
                variant={'destructive'}
                className='gap-x-1 text-rose-100 disabled:cursor-not-allowed'
                onClick={() => setOpen(true)}
                disabled={isDisabled}
            >
                <XIcon className='size-4' />
                Clear Wishlist
            </Button>
            <DeleteDialog
                customTemplate={{
                    title: "Are You Sure?",
                    message: `Are you sure you want to clear your wishlist?\nthis action cannot be undone.`,
                    Icon: TrashIcon
                }}
                open={open}
                setOpen={setOpen}
                id={'clear-wishlist'}
                isPending={isPending}
                customAction={onClearWishlist}
            />
        </>
    )
}
