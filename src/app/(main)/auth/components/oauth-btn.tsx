import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"

type Props = {
    provider: 'google' | 'github',
    disabled?: boolean
}
export default function OAuthBtn({ provider, disabled = false }: Props) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const getProviderIcon = () => {
        switch (provider) {
            case 'google':
                return '/auth/google.svg'
            case 'github':
                return '/auth/github.svg'
            default:
                return''
        }
    }
    const handleOauth = () => {
        //Todo: implement oauth with auth.js
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
           <span>Continue with</span> <span className="capitalize">{" "+provider}</span>
        </Button>
    )
}