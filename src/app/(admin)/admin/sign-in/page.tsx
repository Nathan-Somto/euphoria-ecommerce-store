'use client';
import { loginUser } from '@/actions/auth.actions'
import AuthForm from '@/app/(main)/auth/components/auth-form'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { loginSchema } from '@/schema/auth.schema'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'



export default function AdminSignInPage() {
    const searchParams = useSearchParams();
    const blockedRoute = searchParams.get('blockedRoute');
    console.log('blockedRoute: ', blockedRoute)
    const DEFAULT_ADMIN_REDIRECT = '/admin'
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
            <div className="w-full">
                <AuthForm
                    heading='Admin Sign In'
                    className='[&_h2]:!text-center [&_p]:!text-center'
                    subTitle='Please sign in to manage the store.'
                    schema={loginSchema}
                    showBelowBtn={false}
                    btnText='Sign In'
                    customImage={() => (
                        <Link
                            href="/"
                            className='grid place-items-center'
                        >

                            <Image
                                src="/Logo.svg"
                                alt="Euphoria Logo"
                                width={32}
                                height={32}
                                className='size-28'
                            />

                            <span className="sr-only">Euphoria</span>
                        </Link>
                    )}
                    renderChildren={(form, isLoading) =>
                        <div className='text-left'>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field, fieldState }) => {
                                    return <FormItem className='mb-3'>
                                        <FormLabel className="text-lg font-normal text-[#3C4242]">Email Address</FormLabel>
                                        <FormControl>
                                            <Input
                                                isInvalid={fieldState.invalid}
                                                placeholder="johndoe@gmail.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                }}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg font-normal text-[#3C4242]">Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="******"
                                                isInvalid={fieldState.invalid} type='password' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='mb-5' />
                        </div>
                    }
                    actionFn={async (values) => await loginUser(
                        {
                            email: values.email,
                            password: values.password
                        },
                        blockedRoute || DEFAULT_ADMIN_REDIRECT,
                        true
                    )}
                />
            </div>
        </div>
    )
}
