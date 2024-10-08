"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormInput,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ProductSchema, productSchema } from "@/schema/products.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Trash } from "lucide-react";
import { createProduct, updateProduct } from "@/actions/products.actions";
import { toast } from "react-hot-toast";
import MultiSelect from "react-select";
import { useRouter } from "next/navigation";
import {
  convertToImageVals,
  ImageVal,
  UploadButton,
} from "@/components/upload-button";
type Props = ProductFormProps & {
  initialData?: ProductSchema;
};
function ProductFormButton({ forEdit, pending }: ProductFormButtonProps) {
  return (
    <Button aria-disabled={pending} disabled={pending}>
      {pending ? "Loading..." : forEdit ? "Save Changes..." : "Publish"}
    </Button>
  );
}

export default function ProductForm({
  forEdit = false,
  initialData = {
    category: "",
    colors: [],
    description: "",
    images: [],
    name: "",
    sizes: [],
    isArchived: false,
    isFeatured: false,
    price: 35_000,
  },
  categoryNames: category,
  productId,
}: Props) {
  const actionMethod = forEdit ? updateProduct : createProduct;
  const [imageData, setImageData] = React.useState<ImageVal[]>([]);
  React.useEffect(() => {
    setImageData(convertToImageVals(initialData.images));
  }, []);
  const router = useRouter();
  const [isDiscounted, setIsDiscounted] = React.useState<boolean>(false);
  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData,
    mode: "onBlur",
  });
  const sizes: ProductSchema["sizes"] = [
    { label: "XS (Extra Small)", value: "XS" },
    { label: "SM (Small)", value: "SM" },
    { label: "MD (Medium)", value: "MD" },
    { label: "LG (Large)", value: "LG" },
    { label: "XL (Extra Large)", value: "XL" },
    { label: "XXL (Extra Extra Large)", value: "XXL" },
  ];
  const handleImageChange = (val: ImageVal) => {
    setImageData([...imageData, val]);
  };
  const handleImageRemove = (id: string) => {
    setImageData(imageData.filter((image) => image.id !== id));
  };
  return (
    <Form {...form}>
      <form
        className="space-y-10"
        onSubmit={form.handleSubmit(async (data) => {
          try {
            const { message } = await actionMethod(data, productId);
            toast.success(message);
            form.reset();
          } catch (err) {
            toast.error((err as Error).message);
          }
        })}
      >
        <UploadButton
          onChange={handleImageChange}
          onRemove={handleImageRemove}
          values={imageData}
          disabled={form.formState.isLoading || form.formState.isSubmitting}
        />
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <FormInput placeholder="Product name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <FormInput placeholder="₦35,000" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      {category.map((value) => (
                        <SelectItem value={value} key={uuidv4()}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sizes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sizes</FormLabel>
                <MultiSelect
                  defaultValue={initialData.sizes}
                  isMulti
                  options={sizes}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  placeholder="Select Sizes"
                  classNamePrefix="custom-select"
                  className="disabled:cursor-not-allowed disabled:opacity-50"
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      borderColor: state.isFocused
                        ? "var(--ring)"
                        : "var(--input)",
                      outline: "none",
                      boxShadow: state.isFocused
                        ? "0 0 0 2px #000"
                        : "none",
                      "&:hover": {
                        borderColor: "#000",
                      },
                    }),
                  }}
                  noOptionsMessage={() => (
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                      no results found.
                    </p>
                  )}
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="colors"
            render={({ field }) => {
              console.log("colors: ", field.value);
              return (
                <FormItem>
                  <FormLabel>Choose Colors:</FormLabel>
                  <FormControl>
                    <FormInput
                      type="color"
                      value={Array.isArray(field.value) ? field.value[0] : ""}
                      onChange={(e) =>
                        field.onChange([e.target.value, ...field.value])
                      }
                    />
                  </FormControl>
                  <div className="flex flex-wrap items-center">
                    {Array.isArray(field.value) &&
                      field.value.map((color, index) => (
                        <div
                          key={uuidv4()}
                          className="flex items-center space-x-0.5"
                        >
                          <span
                            style={{
                              backgroundColor: color,
                            }}
                            className="block rounded border size-10 border-gray-300"
                          ></span>
                          <Button
                            type="button"
                            size="icon"
                            variant={"ghost"}
                            onClick={() =>
                              field.onChange(
                                field.value.filter((_, i) => i !== index)
                              )
                            }
                            className="text-red-500 hover:text-red-700"
                          >
                            <span className="sr-only"> Remove</span>
                            <Trash size={16} />
                          </Button>
                        </div>
                      ))}
                  </div>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="resize-none w-full min-h-[90px]"
                    placeholder="Provide a Description"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isFeatured"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3 space-y-0 rounded-md  p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Is Featured</FormLabel>
                  <FormDescription>
                    Product will be shown on the home page.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isArchived"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3 space-y-0 rounded-md  p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Is Archived</FormLabel>
                  <FormDescription>
                    Product will not be shown anywhere in the store.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <div className="flex items-start space-x-3 space-y-0 rounded-md  p-4 shadow">
            <Checkbox
              checked={isDiscounted}
              onCheckedChange={() => setIsDiscounted(!isDiscounted)}
            />
            <div className="space-y-1 leading-none">
              <FormLabel>Discount Product</FormLabel>
              <FormDescription>
                {/* Format the percentage values */}
                Set the price at a particular discount rate (10% - 80%).
              </FormDescription>
            </div>
          </div>
          {isDiscounted && (
            <FormField
              control={form.control}
              name="discountRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Rate</FormLabel>
                  <FormControl>
                    <FormInput
                      placeholder="10%"
                      {...field}
                      type="number"
                      min="0"
                      max={80}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <ProductFormButton
          forEdit={forEdit}
          pending={form.formState.isLoading || form.formState.isSubmitting}
        />
      </form>
    </Form>
  );
}
