'use client';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import React from 'react'

function DashboardClient() {
    return (
        <div>
            <Button
                variant={'destructive'}
                className='mt-4'
                onClick={
                    () => {
                        signOut();
                    }}
            >
                Logout
            </Button>
        </div>
    )
}

export default DashboardClient