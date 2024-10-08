import { ProductSchema } from "@/schema/products.schema";

export const sizes: ProductSchema["sizes"] = [
    { label: "XS (Extra Small)", value: "XS" },
    { label: "SM (Small)", value: "SM" },
    { label: "MD (Medium)", value: "MD" },
    { label: "LG (Large)", value: "LG" },
    { label: "XL (Extra Large)", value: "XL" },
    { label: "XXL (Extra Extra Large)", value: "XXL" },
  ];
export const sizeObj = {
    "XS": "XS (Extra Small)",
    "SM": "SM (Small)",
    "MD": "MD (Medium)",
    "LG": "LG (Large)",
    "XL": "XL (Extra Large)",
    "XXL": "XXL (Extra Extra Large)"
} as const;