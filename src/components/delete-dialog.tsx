"use client";
import React from "react";
import CustomDialog from "./custom-dialog";
import { DialogHeader } from "./ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useFormStatus, useFormState } from "react-dom";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

type DeleteDialogProps = {
  actionFn: (
    prevState: any,
    formData: FormData,
    id: string
  ) => Promise<{ message: string }>;
  resourceName: string;
  open: boolean;
  id: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
function DeleteDialog({
  actionFn,
  id,
  setOpen,
  open,
  resourceName,
}: DeleteDialogProps) {
  const [state, action] = useFormState(
    (prevState: any, formData: FormData) => actionFn(prevState, formData, id),
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
        <DialogHeader className="text-2xl font-semibold">
          Are you Sure?
        </DialogHeader>
        <DialogDescription>
          are you absolute sure that you want to delete {resourceName}
        </DialogDescription>
        <form action={action}>
          <DeleteModalButtons setOpenDeleteDialog={setOpen} />
        </form>
      </>
    </CustomDialog>
  );
}
function DeleteModalButtons({
  setOpenDeleteDialog,
}: {
  setOpenDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { pending } = useFormStatus();
  return (
    <div className="pt-6 space-x-2 flex items-center justify-end w-full">
      <Button
        disabled={pending}
        variant="outline"
        onClick={() => setOpenDeleteDialog(false)}
        type="button"
      >
        Cancel
      </Button>
      <Button disabled={pending} variant="destructive" type="submit">
        {pending ? "Deleting..." : "Continue"}
      </Button>
    </div>
  );
}

export default DeleteDialog;
