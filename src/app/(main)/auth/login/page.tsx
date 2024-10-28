'use client';
import React from 'react'
import AuthForm from '../components/auth-form';
import { loginSchema } from '@/schema/auth.schema';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import OauthOptions from '../components/oauth-options';

export default function LoginPage() {
    return (

        <AuthForm
            schema={loginSchema}
            heading='Sign In'
            subTitle='Welcome back! Please sign in to your account.'
            btnText="Sign In"
            showBelowBtn
            belowBtnText="Don't have an account?"
            belowBtnLink="/auth/register"
            belowBtnLinkText="Sign Up"
            renderChildren={(form) =>
                <div className=''>
                    <OauthOptions disabled={form.formState.isSubmitting}/>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field, fieldState }) => {
                            console.log('email: ', fieldState)
                            return <FormItem className='mb-3'>
                                <FormLabel className="text-lg font-normal text-[#3C4242]">Email Address</FormLabel>
                                <FormControl>
                                    <Input
                                        mainSite
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
                                    <Input mainSite placeholder="******"
                                        isInvalid={fieldState.invalid} type='password' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='text-right mt-3'>
                        <Link href="/auth/reset-password" className="underline text-[#3C4242]">
                            forgot password
                        </Link>
                    </div>
                </div>
            }
        />
    )
}
