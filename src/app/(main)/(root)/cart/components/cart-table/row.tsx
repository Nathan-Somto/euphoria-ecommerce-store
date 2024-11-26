import React from 'react';
import { TrashIcon } from 'lucide-react';
import { CartItem } from '../index';
import useCart from '@/hooks/use-cart';
import CustomDialog from '@/components/custom-dialog';
import { Button } from '@/components/ui/button';
import DeleteDialog from '@/components/delete-dialog';


type CartTableRowProps = {
    item: CartItem;
}

export function CartTableRow({ item }: CartTableRowProps) {
    const [open, setOpen] = React.useState(false);
    const { removeFromCart, decreaseQuantity, increaseQuantity } = useCart();
    const onIncrease = () => {
        increaseQuantity(item.id);
    };
    const onDecrease = () => {
        decreaseQuantity(item.id);
    };
    const onRemove = () => {
        removeFromCart(item.id);
    }
    const onOpenDialog = () => {
        setOpen(true);
    }
    const onRemoveFromCart = () => {
        removeFromCart(item.id);
        setOpen(false)
    }
    return (
        <>
            <tr className='h-[120px] w-full min-w-[600px] mx-auto border-b border-muted-foreground'>
                <td className='flex items-center space-x-4 p-2'>
                    <img
                        src={item.imageUrl}
                        alt={item.name}
                        className='w-[105px] h-[120px] object-cover rounded-[12px]'
                    />
                    <div>
                        <p className='text-gray-800 font-semibold'>{item.name}</p>
                        <p className='text-gray-600 text-sm flex items-center'>
                            Color: <span className='size-3 rounded-full inline-block ml-2' style={{ backgroundColor: item.color }}></span>
                        </p>
                        <p className='text-gray-600 text-sm'>
                            Size: <span className='ml-3 font-semibold'>{item.size}</span>
                        </p>
                    </div>
                </td>
                <td className='font-semibold text-primary-foreground text-lg p-2'>${item.price.toFixed(2)}</td>
                <td className='p-2'>
                    <div className='bg-accent-foreground h-8 flex items-center rounded-[8px] max-w-20 justify-center px-2'>
                        <button
                            onClick={onDecrease}
                            disabled={item.quantity === 1}
                            className='text-secondary-foreground disabled:opacity-50 text-xl hover:opacity-75'
                        >
                            -
                        </button>
                        <span className='mx-3 text-xs font-medium'>{item.quantity}</span>
                        <button
                            onClick={onIncrease}
                            disabled={item.quantity === item.unitsInStock}
                            className='text-secondary-foreground disabled:opacity-50 text-xl hover:opacity-75'
                        >
                            +
                        </button>
                    </div>
                </td>
                <td className='font-semibold text-primary-foreground text-lg p-2'>${(item.quantity * item.price).toFixed(2)}</td>
                <td className='p-2'>
                    <button onClick={onOpenDialog} className='text-destructive hover:opacity-50'><TrashIcon size={18} /></button>
                </td>
            </tr>
            <DeleteDialog
                open={open}
                setOpen={setOpen}
                id="remove-from-cart"
                customAction={onRemoveFromCart}
                customTemplate={{
                    Icon: TrashIcon,
                    title: 'Remove from Cart',
                    message: 'Are you sure you want to remove this item from your cart?',
                }}
            />
        </>

    );
}
