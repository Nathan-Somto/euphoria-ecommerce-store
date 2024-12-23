import { currentSession } from '@/lib/next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import { AlertCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function BannedPage() {
    const session = await currentSession();
    if (session?.user?.role !== 'CUSTOMER' || !session?.user?.isDisabled) {
        redirect('/');
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-background shadow-lg rounded-lg p-8 flex flex-col items-center text-center max-w-md">
                <AlertCircleIcon size={64} className="text-primary mb-4" />
                <h2 className="mb-2">
                    Your account has been disabled
                </h2>
                <p className="mb-4 text-muted-foreground">
                    We're sorry for the inconvenience. Please contact support for assistance.
                </p>
                <Button asChild>
                    <a
                        href={`mailto:euphoria@gmail.com?subject=Account%20Disabled%20Support%20Request&body=Hello%20Euphoria%20Support%2C%0A%0A%0A%0AMy%20account%20has%20been%20disabled%20and%20I%20would%20like%20to%20request%20assistance%20to%20resolve%20this%20issue.%\nmy%20email%20is%20${session?.user?.email}%`}
                        className="">
                        Contact Support
                    </a>
                </Button>
            </div>
        </div>
    );
}
