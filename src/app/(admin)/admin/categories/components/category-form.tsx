"use client";
import { useRef, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormInput
} from "@/components/ui/form";
import {
  type CategorySchema,
  categorySchema,
} from "@/schema/categories.schema";
import { createCategory, updateCategory } from "@/actions/categories.actions";
import { z } from "zod";
import { toast } from "react-hot-toast";
function CategoryFormButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      aria-disabled={pending}
      className="disabled:cursor-not-allowed"
      disabled={pending}
    >
      {pending ? "Loading..." : "Submit"}
    </Button>
  );
}
export default function CategoryForm({
  initialData = {
    name: undefined,
  },
  categoryNames,
  categoryId = "",
}: CategoryFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const action =
    typeof initialData.name !== "undefined" ? updateCategory : createCategory;

  const [state, formAction] = useFormState(
    (prevState: any, formData: FormData) =>
      action(
        prevState,
        formData,
        categoryId
      ),
    {
      message: "",
    }
  );
  const form = useForm<CategorySchema>({
    resolver: zodResolver(
      z.object({
        ...categorySchema.shape,
        name: z.string().refine((value) => !categoryNames.includes(value), {
          message: "Category name is already taken",
        }),
      })
    ),
    defaultValues: {
      name: initialData.name ?? "",
    },
    mode: "onBlur",
  });
  useEffect(() => {
    if (state?.message) {
      toast(state.message);
    }
  }, [state]);
  return (
    <Form {...form}>
      <form ref={formRef} action={formAction} className="space-y-8">
        <h1 className="text-2xl leading-tight ">
          {initialData?.name ? "Edit Category" : "Create Category"}
        </h1>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <FormInput placeholder="Category name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <CategoryFormButton />
      </form>
    </Form>
  );
}
