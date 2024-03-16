"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import ProductForm from "./product-form";
export default function ProductClient() {
  const { productId } = useParams();
  const title = productId === "new" ? "Create a Product" : `Edit `;
  return (
    <div className="px-5 pt-6">
      <Heading title={title} />
      <Separator className="mb-8 mt-3" />
      <ProductForm
        categoryNames={["Men's Clothing", "Women's Clothing", "Jeans"]}
        forEdit={productId !== "new"}
        productId={productId as string} 
      />
    </div>
  );
}
