'use client'
import React from 'react'
import AuthForm from '../components/auth-form'
import { resetPasswordSchema } from '@/schema/auth.schema'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

function ResetPasswordPage() {
    return (
        <AuthForm
            schema={resetPasswordSchema}
            heading='Reset Password'
            subTitle="Enter your email and we'll send you a link to reset your password. Please check it."
            btnText='Reset Password'
            showBelowBtn
            belowBtnText='Back to'
            belowBtnLink='/auth/login'
            belowBtnLinkText='Login'
            renderChildren={(form) => (
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field, fieldState }) => (
                        <FormItem className='mb-3'>
                            <FormLabel className='text-lg font-normal text-[#3C4242]'>Email Address</FormLabel>
                            <FormControl>
                                <Input
                                    mainSite
                                    isInvalid={fieldState.invalid} 
                                    {...field}
                                    />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            )}
        />
    )
}


export default ResetPasswordPage