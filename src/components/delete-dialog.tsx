"use client";
import React from "react";
import CustomDialog from "./custom-dialog";
import { DialogHeader } from "./ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useFormStatus, useFormState } from "react-dom";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { LucideIcon } from "lucide-react";

type DeleteDialogProps = {
  actionFn?: (
    prevState: any,
    formData: FormData,
    id: string
  ) => Promise<{ message: string }>;
  resourceName?: string;
  open: boolean;
  id: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  customAction?: () => void;
  customTemplate?: {
    Icon: LucideIcon;
    title: string;
    message: string;
  }
};
function DeleteDialog({
  actionFn,
  id,
  setOpen,
  open,
  resourceName,
  customAction,
  customTemplate
}: DeleteDialogProps) {
  const [state, action] = useFormState(
    (prevState: any, formData: FormData) => actionFn && actionFn(prevState, formData, id),
    {
      message: "",
    }
  );
  React.useEffect(() => {
    if (state?.message) {
      toast(state.message);
    }
  }, [state]);
  return (
    <CustomDialog open={open} setOpen={setOpen}>
      <>
        {customTemplate ? (
          <div className="p-4 flex flex-col items-center text-center">
            <customTemplate.Icon className="text-red-500 size-24 mb-3" />
            <DialogHeader className="text-2xl font-semibold text-gray-700 mb-1.5">
              {customTemplate.title}
            </DialogHeader>
            <DialogDescription className="text-gray-500">{customTemplate.message}</DialogDescription>
          </div>
        ) : (
          <>
            <DialogHeader className="text-2xl font-semibold">
              Are you Sure?
            </DialogHeader>
            <DialogDescription>
              are you absolute sure that you want to delete {resourceName}
            </DialogDescription>
          </>
        )}
        <form action={action}>
          <DeleteModalButtons setOpen={setOpen} customAction={customAction} />
        </form>
      </>
    </CustomDialog>
  );
}
function DeleteModalButtons({
  setOpen,
  customAction,
}: Pick<DeleteDialogProps, "setOpen" | 'customAction'>
) {
  const { pending } = useFormStatus();
  return (
    <div className="pt-6 space-x-2 flex items-center  w-full">
      <Button
        disabled={pending}
        variant="outline"
        onClick={() => setOpen(false)}
        type="button"
        className="w-[48%] flex-shrink-0"
      >
        Cancel
      </Button>
      <Button
        className="w-[48%] flex-shrink-0"
        disabled={pending}
        variant="destructive"
        onClick={customAction}
        type={customAction ? 'button' : 'submit'}>
        {pending ? "Deleting..." : "Continue"}
      </Button>
    </div>
  );
}

export default DeleteDialog;
