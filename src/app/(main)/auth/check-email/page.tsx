'use client'
import React from 'react'
import AuthForm from '../components/auth-form'
import { resetPasswordSchema } from '@/schema/auth.schema'

export default function CheckEmailPage() {
    return (
        <AuthForm
            schema={resetPasswordSchema}
            heading='Check Your Email'
            subTitle={`Please check your email inbox and click on the provided link to reset your password . If you don’t receive email, Click here to resend`}
            btnText="Check Email"
            showSubmitBtn={false}
            showBelowBtn
            belowBtnText="Back to"
            belowBtnLink="/auth/login"
            belowBtnLinkText="Login"
        />
    )
}
