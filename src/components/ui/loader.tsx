import { Loader2Icon } from 'lucide-react'
import React from 'react'
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from '@/lib/utils'
const loaderVariants = cva(
    "",
    {
        variants: {
            size: {
                default: "size-10",
                sm: "size-8",
                lg: "size-12"
            },
            variant: {
                default: "text-primary",
                secondary: "text-secondary",
                success: "text-emerald-500",
            }
        },
        defaultVariants: {
            size: "default",
            variant: "default"
        }
    }
)
export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof loaderVariants> {
}
export default function Loader({ variant, size, className, ...props }: LoaderProps) {
    return (
        <div className={cn("animate-spin", className)} {...props} >
            <Loader2Icon className={cn(loaderVariants({ variant, size }))} />
        </div>
    )
}
