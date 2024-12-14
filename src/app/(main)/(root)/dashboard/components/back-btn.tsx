'use client';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'
interface Props {
    className?: string
}
export default function BackBtn({ className }: Props) {
    const router = useRouter();
    return (
        <Button
            variant={'ghost'}
            className={className}
            onClick={() => router.back()}
            title='back'
        >
            <ChevronLeft />
            <span className="sr-only">back</span>
        </Button>
    )
}
