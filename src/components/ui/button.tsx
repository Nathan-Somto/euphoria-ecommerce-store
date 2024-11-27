import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Loader2Icon } from "lucide-react"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-no-action disabled:bg-disabled disabled:text-disabled-foreground",
  {
    variants: {
      variant: {
        default: "bg-primary text-neutral hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-primary border border-lite-foreground hover:bg-[rgba(102,32,193,0.03)] focus-visible:border-primary",
        ghost: "hover:bg-lite hover:text-neutral-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        neutral: "bg-disabled text-neutral-foreground hover:bg-neutral/90",
        white: "bg-white text-primary-foreground hover:bg-lite/80",
        lite: 'bg-lite text-neutral-foreground hover:bg-lite/80 border-l-2 border-lite-foreground rounded-tl-none rounded-bl-none',
        elevated: "shadow-md "
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  showOnlySpinner?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, showOnlySpinner, isLoading, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    if (isLoading) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          disabled
          {...props}
        >
          <div className="animate-spin gap-x-0.5">
            <Loader2Icon />
          </div>
          {showOnlySpinner ? null : props.children}
        </Comp>
      )
    }
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
