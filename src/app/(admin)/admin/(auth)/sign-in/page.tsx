'use client';
import { loginUser } from '@/actions/auth.actions';
import AuthForm from '@/app/(main)/auth/components/auth-form';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { BadRequestError, UnauthorizedError } from '@/lib/errors';
import { loginSchema } from '@/schema/auth.schema';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const MAX_ATTEMPTS = 3;
const BLOCK_DURATION = 60_000; // 1 minute

export default function AdminSignInPage() {
    const searchParams = useSearchParams();
    const blockedRoute = searchParams.get('blockedRoute');
    const DEFAULT_ADMIN_REDIRECT = '/admin';

    const [isBlocked, setIsBlocked] = React.useState(false);
    const [remainingTime, setRemainingTime] = React.useState(0);

    const updateBlockState = React.useCallback(() => {
        const blockUntil = localStorage.getItem('admin_block_until');
        if (blockUntil) {
            const now = Date.now();
            const blockTime = parseInt(blockUntil);
            if (now < blockTime) {
                setIsBlocked(true);
                setRemainingTime(Math.ceil((blockTime - now) / 1000));
                return;
            } else {
                localStorage.removeItem('admin_block_until');
                localStorage.removeItem('admin_failed_attempts');
                setIsBlocked(false);
                setRemainingTime(0);
            }
        }
    }, []);

    React.useEffect(() => {
        updateBlockState();
        const interval = setInterval(updateBlockState, 1000);
        return () => clearInterval(interval);
    }, [updateBlockState]);

    const handleLoginAttempt = async (values: { email: string; password: string }) => {
        if (isBlocked) return { error: true, message: 'Too many failed attempts' };

        try {
            const res = await loginUser(
                {
                    email: values.email,
                    password: values.password
                },
                blockedRoute || DEFAULT_ADMIN_REDIRECT,
                true
            );
            return res;
        } catch (err) {
            console.log('error: ', err);
            console.log("type check: ", err instanceof BadRequestError || err instanceof UnauthorizedError)
            if (err instanceof BadRequestError || err instanceof UnauthorizedError) {
                const attempts = parseInt(localStorage.getItem('admin_failed_attempts') || '0') + 1;
                localStorage.setItem('admin_failed_attempts', attempts.toString());

                if (attempts >= MAX_ATTEMPTS) {
                    const blockUntil = Date.now() + BLOCK_DURATION;
                    localStorage.setItem('admin_block_until', blockUntil.toString());
                    setIsBlocked(true);
                }
            } else {
                localStorage.removeItem('admin_failed_attempts');
                localStorage.removeItem('admin_block_until');
            }
            throw err;
        }

    };

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
            <div className="w-full">
                <AuthForm
                    heading="Admin Sign In"
                    className="[&_h2]:!text-center [&_p]:!text-center"
                    subTitle={
                        isBlocked
                            ? `Too many failed attempts. Please wait ${remainingTime}s.`
                            : 'Please sign in to manage the store.'
                    }
                    schema={loginSchema}
                    showBelowBtn={false}
                    btnText="Sign In"
                    disabled={isBlocked}
                    customImage={() => (
                        <Link href="/" className="grid place-items-center">
                            <Image
                                src="/Logo.svg"
                                alt="Euphoria Logo"
                                width={32}
                                height={32}
                                className="size-28"
                            />
                            <span className="sr-only">Euphoria</span>
                        </Link>
                    )}
                    renderChildren={(form, isLoading) => (
                        <div className="text-left">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field, fieldState }) => (
                                    <FormItem className="mb-3">
                                        <FormLabel className="text-lg font-normal text-[#3C4242]">
                                            Email Address
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                isInvalid={fieldState.invalid}
                                                placeholder="johndoe@gmail.com"
                                                {...field}
                                                disabled={isBlocked}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg font-normal text-[#3C4242]">
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="******"
                                                isInvalid={fieldState.invalid}
                                                type="password"
                                                {...field}
                                                disabled={isBlocked}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="mb-5" />
                        </div>
                    )}
                    actionFn={handleLoginAttempt}
                />
            </div>
        </div>
    );
}
