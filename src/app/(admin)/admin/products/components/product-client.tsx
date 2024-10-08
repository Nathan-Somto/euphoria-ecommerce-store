"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import ProductForm from "./product-form";
import { ProductClientProps } from ".";

export default function ProductClient({categoryData, initialData, isCreate}: ProductClientProps) {
  const { productId } = useParams();
  const title = isCreate ? "Create a Product" : `Edit `;
  return (
    <div className="px-5 pt-6">
      <Heading title={title} />
      <Separator className="mb-8 mt-3" />
      <ProductForm
        categories={categoryData}
        forEdit={!isCreate}
        initialData={initialData}
        productId={productId as string}
      />
    </div>
  );
}
