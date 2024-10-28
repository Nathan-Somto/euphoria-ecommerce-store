'use client'
import React from 'react'
import AuthForm from '../../components/auth-form'
import { newPasswordSchema } from '@/schema/auth.schema'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
export default function NewPassword() {
    // check if the token is valid
    return (
        <AuthForm
            schema={newPasswordSchema}
            heading='Create New Password'
            subTitle='Please enter your new password.'
            btnText='Reset Password'
            renderChildren={(form) => (
                <div className='mb-5'>
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field, fieldState }) => (
                            <FormItem className='mb-3'>
                                <FormLabel className='text-lg font-normal text-[#3C4242]'>New Password</FormLabel>
                                <FormControl>
                                    <Input
                                        mainSite
                                        isInvalid={fieldState.invalid}
                                        placeholder='******'
                                        type='password'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='confirmPassword'
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel className='text-lg font-normal text-[#3C4242]'>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input
                                        mainSite
                                        isInvalid={fieldState.invalid}
                                        placeholder='******'
                                        type='password'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            )
            }
        />
    )
}
