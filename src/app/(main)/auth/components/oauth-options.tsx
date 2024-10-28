import React from 'react'
import OAuthBtn from './oauth-btn'
type Props = {
    disabled?: boolean
}
function OauthOptions({ disabled }: Props) {
  return (
    <div className="space-y-4 flex-col flex my-5">
        <OAuthBtn provider="google" disabled={disabled} />
        <OAuthBtn provider="github" disabled={disabled} />
        <div className='flex items-center gap-x-2'>
            <div className='w-[50%] h-[2px] bg-[#666666]/25'></div>
            <p className='uppercase text-[#666]'>OR</p>
            <div className='w-[50%] h-[2px] bg-[#666666]/25'></div>
        </div>
    </div>
  )
}

export default OauthOptions