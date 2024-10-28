import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    isInvalid?: boolean,
    mainSite?: boolean,
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, isInvalid=false, mainSite=false, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent outline-none file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
          isInvalid && "!border-destructive !text-destructive placeholder:text-red-400 ring-offset-destructive focus-visible:ring-destructive !focus:ring-destructive",
          mainSite && "border-[#3C4242] text-[#3C4242] placeholder-text-[#3C4242]"
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
