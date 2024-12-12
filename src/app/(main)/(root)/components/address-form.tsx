'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, Form, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CountrySelector } from '@/packages/react-country-selector';
import { addressSchema } from '@/schema/address.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import { createAddress, editAddress } from '@/actions/address.actions';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
type Props = {
    initialData?: Address
    onSubmitCb?: (data: Address) => void
    disabled?: boolean
}
export default function AddressForm({ initialData, onSubmitCb, disabled: parentDisabled }: Props) {
    const router = useRouter();
    const form = useForm<z.infer<typeof addressSchema>>({
        resolver: zodResolver(addressSchema),
        defaultValues: initialData,
        mode: 'onBlur'
    })
    const disabled = !form.formState.isValid || !!parentDisabled
    const onSubmit = async (data: z.infer<typeof addressSchema>) => {
        try {
            if (data.phoneNumber === '+234801756789') {
                return
            }
            if (!data?.isDefault) {
                data.isDefault = false
            }
            const res = initialData ? await editAddress(data as Address, initialData.id) : await createAddress(data as Address)
            if (res?.data) {
                onSubmitCb?.(res.data)
            }
            toast.success(`Address ${initialData ? 'edited' : 'created'} successfully`)
            router.push('/dashboard')
        }
        catch {
            toast.error(`An error occurred while ${initialData ? 'editing' : 'creating'} address`)
        }

    }
    return (
        <Form {...form}>
            <form onSubmit={
                form.handleSubmit(onSubmit)
            }>
                <div className='flex items-center gap-x-[2%]'>
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field, fieldState }) => {
                            return <FormItem className='w-[46%]'>
                                <FormLabel className="text-lg font-normal text-neutral-foreground">
                                    City
                                    <span className='text-destructive'>*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        mainSite
                                        isInvalid={fieldState.invalid}
                                        placeholder="City Name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }}
                    />
                    <FormField
                        control={form.control}
                        name="street"
                        render={({ field, fieldState }) => {
                            return <FormItem className='w-[46%]'>
                                <FormLabel className="text-lg font-normal text-neutral-foreground">
                                    Street
                                    <span className='text-destructive'>*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        mainSite
                                        isInvalid={fieldState.invalid}
                                        placeholder="Street Name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }}
                    />
                </div>
                <div className='flex items-center gap-x-[2%] my-5'>
                    <FormField
                        control={form.control}
                        name="zip"
                        render={({ field, fieldState }) => {
                            return <FormItem className='w-[46%]'>
                                <FormLabel className="text-lg font-normal text-neutral-foreground">
                                    Zip
                                    <span className='text-destructive'>*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        mainSite
                                        isInvalid={fieldState.invalid}
                                        placeholder="Zip Code"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }}
                    />
                    <FormField
                        control={form.control}
                        name="state"
                        render={({ field, fieldState }) => {
                            return <FormItem className='w-[46%]'>
                                <FormLabel className="text-lg font-normal text-neutral-foreground">
                                    State
                                    <span className='text-destructive'>*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        mainSite
                                        isInvalid={fieldState.invalid}
                                        placeholder="State Name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }}
                    />
                </div>
                <div className='flex items-center gap-x-[2%] my-5'>
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem className='w-[46%]'>
                                <FormLabel className="text-lg font-normal text-neutral-foreground">
                                    Country
                                    <span className='text-destructive'>*</span>
                                </FormLabel>
                                <CountrySelector
                                    value={field.value}
                                    defaultCountry='NG'
                                    onChange={(value) => field.onChange(value)}
                                    containerClassName='flex-shrink-0 focus:outline-none border-lite-foreground text-lite-foreground placeholder-text-lite-foreground focus-visible:ring-2 focus-within:ring-lite-foreground focus-within:border-lite-foreground focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                                />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem className='w-[46%]'>
                                <FormLabel className="text-lg font-normal text-neutral-foreground">
                                    Phone Number
                                    <span className='text-destructive'>*</span>
                                </FormLabel>
                                <PhoneInput
                                    value={field.value ?? '+234801756789'}
                                    international
                                    countryCallingCodeEditable={false}
                                    defaultCountry='NG'
                                    placeholder="Phone Number"
                                    onChange={(value) => {
                                        /* Conver E164Number to Number */
                                        if (value === undefined) {
                                            field.onChange('')
                                        }
                                        field.onChange(value)
                                    }}
                                    className='flex-shrink-0  border rounded-md px-3 py-2 shadow-sm focus:outline-none border-lite-foreground text-lite-foreground placeholder-text-lite-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                                />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="isDefault"
                    render={({ field }) => (
                        <FormItem className='flex space-x-2 mt-6 items-center space-y-0'>
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    variant={'neutral'}
                                />
                            </FormControl>
                            <FormLabel className='text-[#807D7E] text-lg'>
                                Set as Default Address
                            </FormLabel>
                        </FormItem>
                    )}
                />
                <div className='space-x-3 mt-5'>
                    <Button
                        type='submit'
                        className='px-8'
                        disabled={disabled || form.formState.isLoading || form.formState.isSubmitting}
                        isLoading={form.formState.isLoading || form.formState.isSubmitting}
                    >Save</Button>
                    <Button variant={'neutral'} className='px-8' asChild>
                        <Link href="/dashboard">
                            Cancel
                        </Link>
                    </Button>
                </div>
            </form>
        </Form>
    )
}
