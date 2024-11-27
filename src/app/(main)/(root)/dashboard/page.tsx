import { currentSession } from '@/lib/next-auth'
import React from 'react'


export default async function DashboardPage() {
    const session = await currentSession();
    return (
        <div className='h-screen'>
            <h1 className='text-3xl text-primary'>Welcome {session?.user?.username}</h1>
        </div>
    )
}
