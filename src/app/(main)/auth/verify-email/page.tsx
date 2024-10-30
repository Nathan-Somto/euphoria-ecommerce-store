'use client'
import React from 'react'
import AuthForm from '../components/auth-form'
import { verifyEmailSchema } from '@/schema/auth.schema'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useSearchParams } from 'next/navigation'
import { verifyEmail } from '@/actions/auth.actions'
import { FeatureFlagGuard } from '@/flags'

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? '';
  return (
    <FeatureFlagGuard
      flag='EMAIL_VERIFICATION'
      redirectUrl='/auth/login'
    >
      <AuthForm
        heading='Verify your Email'
        subTitle='Paste the token that was sent to your email'
        schema={verifyEmailSchema}
        actionFn={async (values) => await verifyEmail(email,values.token, '/' )}
        renderChildren={(form) => 
        <>
             <FormField
                      control={form.control}
                      name='token'
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
        </>
        }/>
    </FeatureFlagGuard>
  )
}
