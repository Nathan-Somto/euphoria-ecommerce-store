'use client';
import { signUpSchema } from '@/schema/auth.schema'
import React from 'react'
import AuthForm from '../components/auth-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import OauthOptions from '../components/oauth-options';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { registerUser } from '@/actions/auth.actions';
function RegisterPage() {
    return (
        <AuthForm
            schema={signUpSchema}
            heading='Sign Up'
            subTitle='Sign up for free to access any of our products.'
            btnText="Sign Up"
            showBelowBtn
            belowBtnText="Already have an account?"
            belowBtnLink="/auth/login"
            belowBtnLinkText="Sign In"
            actionFn={async (values) => await registerUser(values)}
            renderChildren={(form, isLoading) =>
                <div className=''>
                    <OauthOptions disabled={isLoading} />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field, fieldState }) => {
                            return <FormItem className='mb-3'>
                                <FormLabel className="text-lg font-normal text-[#3C4242]">Full Name</FormLabel>
                                <FormControl>
                                    <Input
                                        mainSite
                                        isInvalid={fieldState.invalid}
                                        placeholder="John Doe"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field, fieldState }) => {
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
                    <FormField
                        control={form.control}
                        name="terms"
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
                                    Agree to our <Link href="#" className='underline'>Terms</Link> of use and <Link href='#' className='underline'>Privacy Policy</Link>
                                </FormLabel>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="newsLetter"
                        render={({ field }) => (
                            <FormItem className='flex space-x-2 my-1.5 mb-5 items-center space-y-0'>
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        variant={'neutral'}
                                    />
                                </FormControl>
                                <FormLabel className='text-[#807D7E] text-lg'>
                                    Subscribe to our monthly newsletter
                                </FormLabel>
                            </FormItem>
                        )}
                    />
                </div>
            }
        />
    )
}

export default RegisterPage