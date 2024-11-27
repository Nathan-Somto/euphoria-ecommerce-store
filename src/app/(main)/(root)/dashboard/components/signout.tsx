'use client';
import { Button } from '@/components/ui/button';
import { LogOutIcon } from 'lucide-react';
import { signOut } from 'next-auth/react';
import React from 'react'

export default function Signout() {
    return (
        <div>
            <Button
                variant={'ghost'}
                className='text-destructive hover:text-destructive hover:bg-red-50 w-full flex justify-start gap-x-2'
                onClick={
                    () => {
                        signOut();
                    }}
            >
                <LogOutIcon />
                Sign Out
            </Button>
        </div>
    )
}
