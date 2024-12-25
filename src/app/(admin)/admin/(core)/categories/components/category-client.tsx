"use client";
import { DataTable } from "@/components/ui/data-table";
import React from "react";
import CustomDialog from "@/components/custom-dialog";
import { getCategoyColumns } from "./category-columns";
import CategoryForm from "./category-form";
import { DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { deleteCategory } from "@/actions/categories.actions";
import toast from "react-hot-toast";
import { CategoryClientProps } from ".";
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
export default function CategoryClient({ categories }: CategoryClientProps) {
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [currentCategory, setCurrentCategory] = React.useState<null | {
    name: string;
    id: string;
  }>(null);
  const [state, action] = useFormState(
    (prevState: any, formData: FormData) =>
      deleteCategory(prevState, formData, currentCategory?.id ?? ""),
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
    <>
      <DataTable
        name="Categories"
        columns={getCategoyColumns({
          setOpenEditDialog,
          setOpenDeleteDialog,
          setCurrentCategory,
        })}
        data={categories}
      />
      <CustomDialog open={openEditDialog} setOpen={setOpenEditDialog}>
        <CategoryForm
          categoryNames={categories.map((item) => item.name)}
          categoryId={currentCategory?.id ?? ""}
          initialData={{
            name: currentCategory?.name ?? "",
          }}
        />
      </CustomDialog>
      <CustomDialog open={openDeleteDialog} setOpen={setOpenDeleteDialog}>
        <>
          <DialogHeader className="text-2xl font-semibold">Are you Sure?</DialogHeader>
          <DialogDescription>
            are you absolute sure that you want to delete{" "}
            {currentCategory?.name}
          </DialogDescription>
          <form action={action}>
            <DeleteModalButtons setOpenDeleteDialog={setOpenDeleteDialog} />
          </form>
        </>
      </CustomDialog>
    </>
  );
}
