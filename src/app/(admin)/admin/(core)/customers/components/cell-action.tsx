"use client"

import { Button } from "@/components/ui/button"

import { toggleUserStatus } from "@/actions/user.actions"
import toast from "react-hot-toast"
import { useTransition } from "react"

type CellActionProps = {
    id: string
    isDisabled: boolean
}

export default function CellAction({ id, isDisabled }: CellActionProps) {
    const [isPending, startTransition] = useTransition()
    const handleToggle = async () => {
        startTransition(async () => {
            try {
                const action = isDisabled ? "unban" : "ban"
                const toastId = toast.loading(`${action} user...`)
                await toggleUserStatus(id)
                toast.success(`${action} user successfully`, { id: toastId })
                // update the UI optimistically

            } catch (err) {
                toast.error("Something went wrong")
            }
        })
    }

    return (
        <Button
            variant={"outline"}
            isLoading={isPending}
            showOnlySpinner
            size="sm"
            onClick={handleToggle}
            className={isDisabled ? 'text-green-500 border-green-500 hover:bg-green-500 hover:text-white' : 'text-red-500 border-red-500 hover:bg-red-500 hover:text-white'}
        >
            {isDisabled ? "Unban" : "Ban"}
        </Button>
    )
}
