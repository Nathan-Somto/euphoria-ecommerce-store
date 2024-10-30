import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React from 'react'
import { DefaultValues, useForm, UseFormReturn } from 'react-hook-form'
import { z, ZodRawShape } from 'zod'
type Props<T extends ZodRawShape | {}, U extends Record<string, any>> = {
    heading: string
    subTitle: string
    schema: z.ZodObject<T, "strip", z.ZodTypeAny> | z.ZodEffects<z.ZodObject<T, "strip", z.ZodTypeAny>>
    defaultValues?: DefaultValues<z.infer<z.ZodObject<T>>>
    renderChildren?: (form: UseFormReturn<z.infer<z.ZodObject<T>>>, isLoading: boolean) => React.ReactNode
    btnText?: string
    showBelowBtn?: boolean
    belowBtnText?: string
    belowBtnLink?: string
    belowBtnLinkText?: string
    showSubmitBtn?: boolean
    actionFn?: (values: z.infer<z.ZodObject<T>>) => Promise<U>
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
        console.log(values)
        try {
           await actionFn(values);
        }
        catch (err) {

        }

    }
    // disable button if form is not valid
    const disabled = !form.formState.isValid
    // for submission of form
    const isLoading = form.formState.isLoading || form.formState.isSubmitting
    return (
        <div className='lg:w-[50%] flex-shrink-0 w-[90%] mx-auto max-w-[600px] lg:max-w-none'>
            <Form {...form}>
                <form className='px-10 py-8' onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='mb-5'>
                        <h2 className='text-3xl text-[#333] font-semibold mb-2'>{heading}</h2>
                        <p className='text-[#666666]/80 font-medium text-sm'>{subTitle}</p>
                    </div>
                    {
                        renderChildren && renderChildren(form, isLoading)
                    }
                    {showSubmitBtn && (<Button type='submit' className='min-w-[170px]' disabled={disabled} isLoading={isLoading} showOnlySpinner>{btnText}</Button>)}
                    {showBelowBtn && (
                        <div className='mt-5 text-left'>
                            <p className="text-sm text-[#3C4242]">
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