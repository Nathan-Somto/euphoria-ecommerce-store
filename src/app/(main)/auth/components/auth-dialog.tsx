import { loginUser, registerUser } from '@/actions/auth.actions'
import AuthForm from './auth-form'
import OauthOptions from './oauth-options'
import CustomDialog from '@/components/custom-dialog'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { loginSchema, signUpSchema } from '@/schema/auth.schema'
import React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
type Props = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export default function AuthDialog({ open, setOpen }: Props) {
    const [currentView, setCurrentView] = React.useState<'login' | 'register'>('login')
    const renderViews = () => {
        switch (currentView) {
            case 'login':
                return <AuthForm
                    className="w-full [&_form]:px-2 h-[380px] overflow-y-auto lg:w-full max-w-lg"
                    schema={loginSchema}
                    heading='Sign In'
                    subTitle='Welcome back! Please sign in to continue with checkout.'
                    btnText="Sign In"
                    showBelowBtn={false}
                    customBelowBtn={() => <p className="text-sm text-lite-foreground mt-2">Don't have an account? <Button
                        variant={'link'}
                        onClick={() => setCurrentView('register')}
                        className='px-0'>
                        Sign Up
                    </Button></p>}
                    actionFn={async (values) => await loginUser(
                        {
                            email: values.email,
                            password: values.password
                        },
                        '/cart',
                        false
                    )}
                    renderChildren={(form, isLoading) =>
                        <div className=''>
                            <OauthOptions disabled={isLoading} />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field, fieldState }) => {
                                    return <FormItem className='mb-3'>
                                        <FormLabel className="text-lg font-normal text-lite-foreground">Email Address</FormLabel>
                                        <FormControl>
                                            <Input
                                                mainSite
                                                isInvalid={fieldState.invalid}
                                                placeholder="johndoe@gmail.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                }}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field, fieldState }) => (
                                    <FormItem className='mb-4'>
                                        <FormLabel className="text-lg font-normal text-lite-foreground">Password</FormLabel>
                                        <FormControl>
                                            <Input mainSite placeholder="******"
                                                isInvalid={fieldState.invalid} type='password' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    }
                />
            case 'register':
                return <AuthForm
                    schema={signUpSchema}
                    className="w-full [&_form]:px-2 h-[380px] overflow-y-auto lg:w-full max-w-lg"
                    heading='Sign Up'
                    subTitle='Sign up for free to proceed with checkout!'
                    btnText="Sign Up"
                    customBelowBtn={() => <p className="text-sm text-lite-foreground mt-2">Already have an account?
                        <Button
                            variant={'link'}
                            onClick={() => setCurrentView('login')}
                            className='px-0'>
                            Sign In
                        </Button> </p>
                    }
                    actionFn={async (values) => await registerUser(values, '/cart')}
                    renderChildren={(form, isLoading) =>
                        <div className=''>
                            <OauthOptions disabled={isLoading} />
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field, fieldState }) => {
                                    return <FormItem className='mb-3'>
                                        <FormLabel className="text-lg font-normal text-lite-foreground">Full Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                mainSite
                                                isInvalid={fieldState.invalid}
                                                placeholder="John Doe"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                }}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field, fieldState }) => {
                                    return <FormItem className='mb-3'>
                                        <FormLabel className="text-lg font-normal text-lite-foreground">Email Address</FormLabel>
                                        <FormControl>
                                            <Input
                                                mainSite
                                                isInvalid={fieldState.invalid}
                                                placeholder="johndoe@gmail.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                }}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg font-normal text-lite-foreground">Password</FormLabel>
                                        <FormControl>
                                            <Input mainSite placeholder="******"
                                                isInvalid={fieldState.invalid} type='password' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="terms"
                                render={({ field }) => (
                                    <FormItem className='flex space-x-2 mt-6 items-center space-y-0'>
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                variant={'neutral'}
                                            />
                                        </FormControl>
                                        <FormLabel className='text-neutral-foreground text-lg'>
                                            Agree to our <Button variant={'link'} className='underline px-0'>Terms</Button> of use and <Button variant={'link'} className='underline px-0'>Privacy Policy</Button>
                                        </FormLabel>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="newsLetter"
                                render={({ field }) => (
                                    <FormItem className='flex space-x-2 my-1.5 mb-5 items-center space-y-0'>
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                variant={'neutral'}
                                            />
                                        </FormControl>
                                        <FormLabel className='text-neutral-foreground text-lg'>
                                            Subscribe to our monthly newsletter
                                        </FormLabel>
                                    </FormItem>
                                )}
                            />
                        </div>
                    }
                />
            default:
                return <p>no views</p>
        }

    }
    return (
        <CustomDialog open={open} setOpen={setOpen} >
            {renderViews()}
        </CustomDialog>
    )
}
