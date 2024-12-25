import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React from 'react'
import { DefaultValues, useForm, UseFormReturn } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z, ZodRawShape } from 'zod'
type Props<T extends ZodRawShape | {}, U extends Record<string, any>> = {
    heading: string
    subTitle: string
    schema: z.ZodObject<T, "strip", z.ZodTypeAny> | z.ZodEffects<z.ZodObject<T, "strip", z.ZodTypeAny>>
    defaultValues?: DefaultValues<z.infer<z.ZodObject<T>>>
    renderChildren?: (form: UseFormReturn<z.infer<z.ZodObject<T>>>, isLoading: boolean) => React.ReactNode
    btnText?: string
    className?: string
    showBelowBtn?: boolean
    belowBtnText?: string
    belowBtnLink?: string
    belowBtnLinkText?: string
    showSubmitBtn?: boolean
    customImage?: () => React.ReactNode
    customBelowBtn?: () => React.ReactNode
    actionFn?: (values: z.infer<z.ZodObject<T>>) => Promise<U>
    onSubmitCb?: (values: z.infer<z.ZodObject<T>>) => void;
}
export default function AuthForm<T extends ZodRawShape, U extends Record<string, any>>({
    schema,
    defaultValues = {} as DefaultValues<z.infer<z.ZodObject<T>>>,
    heading,
    subTitle,
    renderChildren,
    btnText = "Submit",
    showBelowBtn = false,
    belowBtnText = "",
    belowBtnLink = "",
    belowBtnLinkText = "",
    showSubmitBtn = true,
    customBelowBtn: BelowBtn,
    customImage: Image,
    className,
    onSubmitCb = () => void 0,
    actionFn = async (values: z.infer<z.ZodObject<T>>): Promise<U> => ({
        error: "method not implemented",
    } as unknown as U)
}: Props<T, U>) {
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues,
        mode: 'onBlur'
    })
    async function onSubmit(values: z.infer<typeof schema>) {
        try {
            const res = await actionFn(values);
            if (res?.error) {
                throw new Error(res.message)
            }
            onSubmitCb(values);
        }
        catch (err) {
            if (err instanceof Error) {
                toast.error(err?.message || 'An error occurred')
            }
        }

    }
    // disable button if form is not valid
    const disabled = !form.formState.isValid
    // for submission of form
    const isLoading = form.formState.isLoading || form.formState.isSubmitting
    return (
        <div className={cn('lg:w-[50%] flex-shrink-0 w-[90%] mx-auto max-w-[600px] lg:max-w-none', className)}>
            <Form {...form}>
                <form className='px-10 py-8' onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='mb-5'>
                        {Image && <Image />}
                        <h2 className='text-3xl text-[#333] font-semibold mb-2'>{heading}</h2>
                        <p className='text-[#666666]/80 font-medium text-sm'>{subTitle}</p>
                    </div>
                    {
                        renderChildren && renderChildren(form, isLoading)
                    }
                    {showSubmitBtn && (<Button type='submit' className='min-w-[170px]' disabled={disabled} isLoading={isLoading} showOnlySpinner>{btnText}</Button>)}
                    {BelowBtn ? <BelowBtn /> : showBelowBtn && (
                        <div className='mt-5 text-left'>
                            <p className="text-sm text-lite-foreground">
                                {belowBtnText}{' '}
                                <Link
                                    href={belowBtnLink
                                        ? belowBtnLink
                                        : '#'}
                                    className='underline'>{belowBtnLinkText}</Link>
                            </p>
                        </div>
                    )}
                </form>
            </Form>
        </div>
    )
}
