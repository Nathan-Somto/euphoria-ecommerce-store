'use client';
import { deleteAddress, editAddress } from '@/actions/address.actions';
import DeleteDialog from '@/components/delete-dialog';
import { Button } from '@/components/ui/button'
import { Edit2Icon, LucideIcon, MailIcon, MapIcon, PhoneIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import toast from 'react-hot-toast';
type Props = {
    data: Address & { index: number }
}
type AddressItemProps = {
    Icon: LucideIcon,
    item: string | number
}
function AddressItem({ Icon, item }: AddressItemProps) {
    return (
        <p className='flex items-center gap-x-3.5 text-neutral-foreground my-2.5'>
            <span><Icon className='size-4 flex-shrink-0' /></span>
            <span className='text-wrap flex-[0.9]'>{item}</span>
        </p>
    )
}
export default function AddressCard({ data }: Props) {
    const [isEditPending, startEditTransition] = React.useTransition();
    const [isRemovePending, startRemoveTransition] = React.useTransition();
    const [open, setOpen] = React.useState(false);
    const onRemoveAddress = async () => {
        startRemoveTransition(() => {
            // remove address
            deleteAddress(data.id).then(() => {
                toast.success('Address removed');
                setOpen(false);
            }).catch(() => {
                toast.error('Failed to remove address')
            })
        })
    }
    const onSetDefault = async () => {
        startEditTransition(() => {
            // set as default
            editAddress({ isDefault: true }, data.id).then(() => {
                toast.success('Address set as default')
            }).catch(() => {
                toast.error('Failed to set as default')
            })
        })
    }
    return (
        <div className='bg-lite rounded-xl min-h-[250px] px-6 py-4'>
            <h3 className='text-lite-foreground mb- 4font-semibold text-xl'>Address {`#${data.index + 1}`}</h3>
            <AddressItem
                Icon={PhoneIcon}
                item={data.phoneNumber}
            />
            <AddressItem
                Icon={MapIcon}
                item={[data.street, data.city, data.state, data.country].join(', ')}
            />
            <AddressItem
                Icon={MailIcon}
                item={data.zip}
            />
            {
                data.isDefault && <p className='bg-primary max-w-fit px-2 mb-3.5 rounded-md text-neutral-100 font-medium text-sm'>
                    Default
                </p>
            }
            <div className='flex  [&>:not(:first-child)]:ml-2  [&>:not(:first-child)]:!px-2 [&>:not(:first-child)]:border-l [&>:not(:first-child)]:border-l-neutral-200'>
                <Button
                    variant={'ghost'}
                    onClick={() => setOpen(true)}
                    isLoading={isRemovePending}
                    disabled={isRemovePending || isEditPending}
                    className='flex gap-x-2  px-2 rounded-none text-destructive hover:text-destructive hover:bg-red-50'>
                   {!isRemovePending && <XIcon className='size-3' />}
                    Remove
                </Button>
                <Button
                    asChild variant={'ghost'} className='rounded-none  flex gap-x-2 '>
                    <Link href={`/dashboard/address/${data.id}`}>
                        <Edit2Icon className='size-3' />
                        Edit
                    </Link>
                </Button>
                {
                    !data.isDefault && (
                        <Button
                        onClick={onSetDefault}
                        isLoading={isEditPending}
                        disabled={isRemovePending || isEditPending} 
                        variant={'ghost'} 
                        className='rounded-none'>
                            Set as Default
                        </Button>
                    )
                }
            </div>
            <DeleteDialog
                customTemplate={{
                    title: "Are You Sure?",
                    message: "Are you sure you want to remove this address",
                    Icon: XIcon
                }}
                open={open}
                setOpen={setOpen}
                id={data.id}
                isPending={isRemovePending}
                customAction={onRemoveAddress}
            />
        </div>
    )
}
