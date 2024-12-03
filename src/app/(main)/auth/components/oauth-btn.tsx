'use client';
import { Button } from "@/components/ui/button"

import { errorLogger } from "@/utils/errorLogger"
import { signIn } from "next-auth/react";
import Image from "next/image"
import { useState } from "react"
import toast from "react-hot-toast"

type Props = {
    provider: 'google' | 'github',
    disabled?: boolean,
    callbackUrl?: string
}
export default function OAuthBtn({ provider, disabled = false, callbackUrl }: Props) {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const getProviderIcon = () => {
        switch (provider) {
            case 'google':
                return '/auth/google.svg'
            case 'github':
                return '/auth/github.svg'
            default:
                return ''
        }
    }
    const handleOauth = async () => {
        setIsSubmitting(true)
        try {
            await signIn(provider, {
                redirectTo: callbackUrl ?? '/',
            })
        }
        catch (e) {
            errorLogger(e);
            toast.error('Failed to authenticate with ' + provider);
        }
        finally {
            setIsSubmitting(false)
        }
    }
    return (
        <Button
            type='button'
            disabled={disabled || isSubmitting}
            isLoading={isSubmitting}
            showOnlySpinner
            variant={'secondary'}
            className=' text-primary'
            onClick={handleOauth}
        >
            <span className='relative flex items-center justify-center w-6 h-6 mr-2'>
                <Image src={getProviderIcon()} alt={provider + 'icon'} fill />
            </span>
            <span>Continue with</span> <span className="whitespace-break-spaces">{' '}</span> <span className="capitalize">{provider}</span>
        </Button>
    )
}