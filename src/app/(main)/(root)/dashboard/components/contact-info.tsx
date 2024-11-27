'use client';
import { useRef, useState, useEffect, useMemo, use, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SaveIcon, XIcon } from 'lucide-react'
import React from 'react'
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import { updateUserProfile } from '@/actions/user.actions';
import { Session } from 'next-auth';
import toast from 'react-hot-toast';
type Field = {
    label: string,
    value: string
    type: string
}
type Props = {
    fields: Field[],
    userId: string
}
export default function ContactInfo({ fields, userId }: Props) {
    const [isPending, setIsPending] = useState(false);
    const oldValues = useRef<Field[]>([]);
    const [values, setValues] = useState<(Field & ({ isEditting: boolean }))[]>([]);
    const { update, data } = useSession();
    useEffect(() => {
        oldValues.current = fields;
        setValues(fields.map(field => ({
            ...field,
            isEditting: false
        })));
    }, [fields]);
    const onEdit = (index: number) => {
        setValues(values.map((field, i) => {
            if (i === index) {
                return {
                    ...field,
                    isEditting: true
                }
            }
            return field;
        }));
    }
    const onChange = (index: number, value: string) => {
        setValues(values.map((field, i) => {
            if (i === index) {
                return {
                    ...field,
                    value
                }
            }
            return field;
        }));
    }
    const onReset = (index: number) => {
        setValues(values.map((field, i) => {
            if (i === index) {
                return {
                    ...field,
                    value: oldValues.current[i].value,
                    isEditting: false
                }
            }
            return field;
        }
        ));
    }
    const onSave = async () => {
        if (userId === 'no id') return;
        if (data === null) return;
        setIsPending(true);
        setValues(values.map(field => ({
            ...field,
            isEditting: false
        })));
        try {
            const normalized: Record<string, string> = {}
            values.forEach(({ isEditting, ...rest }) => {
                normalized[rest.label] = rest.value
            });
            await updateUserProfile(normalized as unknown as Pick<Session["user"], "name" | "email" | "username">, userId);
            await update({
                ...data,
                user: {
                    ...data.user,
                    ...normalized
                }
            })
            toast.success('Contact information updated successfully');
        }
        catch (e) {
            console.error(e);
            toast.error('Failed to update contact information');
        }
        finally {
            setIsPending(false);
        }

    }
    const isEditting = useMemo(() => values.some(field => field.isEditting), [values]);
    return (
        <section id="contact-info">
            {
                isEditting &&
                <>
                    <p className='text-neutral-foreground text-lg mb-4'>
                        You are currently editing your contact information
                    </p>
                    <div onClick={onSave} className='flex justify-end items-center mb-5'>
                        <Button isLoading={isPending} className='bg-emerald-600 gap-x-1.5 hover:bg-emerald-600/80'>
                            {!isPending && <SaveIcon />}
                            Save
                        </Button>
                    </div>
                </>
            }
            <div>
                {values.map((field, index) => (
                    <div key={`${field}-${index}`} className='flex flex-col gap-x-[2px] my-3'>
                        <label
                            htmlFor={field.label}
                            className='text-neutral-foreground font-semibold text-lg px-3'>{field.label}</label>
                        <div
                            className='border-b justify-between  border-neutral-200 flex items-center w-full'>
                            <Input
                                id={field.label}
                                type={field.type}
                                value={field.value}
                                readOnly={!field.isEditting}
                                onChange={(e) => onChange(index, e.target.value)}
                                className={cn(
                                    `w-full 
                                    h-6 
                                    border-none 
                                    flex-[0.8] 
                                    focus:border-none 
                                    focus-visible:ring-0 
                                    focus-visible:ring-offset-0 
                                    focus-visible:ring-offset-transparent`,
                                    field.isEditting && `
                                    border-background
                                    focus:outline-none 
                                    focus:border-background
                                    border 
                                    ring-2
                                    ring-ring
                                    ring-offset-2
                                    ring-offset-background
                                    border-solid
                                    focus-visible:ring-2
                                     focus-visible:ring-ring
                                    focus-visible:ring-offset-2
                                    focus-visible:ring-offset-background 
                                    focus-visible:border-primary-foreground`)}
                            />
                            <Button
                                variant={'ghost'}
                                className='gap-x-2'
                                disabled={isPending}
                                onClick={() => {
                                    if (field.isEditting) {
                                        onReset(index);
                                    } else {
                                        onEdit(index);
                                    }
                                }}
                            >
                                {
                                    field.isEditting ?
                                        <>
                                            <XIcon className='size-4' />
                                            Reset
                                        </> : 'Change'
                                }
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
