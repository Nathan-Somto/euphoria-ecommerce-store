import Link from "next/link";
import React, { useState } from "react";
import { GetProductsColumnsParams, ProductTable } from ".";
import { Button } from "@/components/ui/button";
import {
  Trash,
  ChevronLeft,
  ChevronRight,
  Tag,
  DollarSign,
  Box,
  Archive,
  Layers,
} from "lucide-react";

type Props = Pick<
  ProductTable,
  | "images"
  | "name"
  | "description"
  | "price"
  | "units"
  | "category"
  | "size"
  | "id"
  | "isArchived"
> &
  Pick<GetProductsColumnsParams, "toggleDeleteDialog">;

function ProductCard({
  id,
  images,
  name,
  description,
  price,
  units,
  category,
  size,
  isArchived,
  toggleDeleteDialog,
}: Props) {
  const [currentImage, setCurrentImage] = useState(0);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImage((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImage((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Link
      href={`/admin/products/${id}`}
      className="block bg-white rounded-lg relative shadow-lg p-4 pb-6 min-h-14"
    >
      <div className="flex justify-between z-[5] items-center mb-4 absolute -top-2 right-0">
        <Button
          variant="ghost"
          onClick={(e) => {
            e.preventDefault();
            toggleDeleteDialog({ id, name, open: true });
          }}
        >
          <Trash className="h-4 w-4 text-destructive" />
        </Button>
      </div>

      <div className="relative mt-2.5 w-full h-32 mb-4 overflow-hidden rounded-md">
        {images.length > 0 ? (
          <img
            src={images[currentImage]}
            alt={name}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200 text-gray-500">
            No Image Available
          </div>
        )}

        {images.length > 1 && (
          <>
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-1 rounded-full"
              onClick={handlePrevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-1 rounded-full"
              onClick={handleNextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      <h3 className="text-lg font-bold">{name}</h3>

      <p className="text-sm text-gray-600 mb-3">{description}</p>

      <div className="grid grid-cols-2 gap-2 text-sm mb-2">
        <div className="flex items-center space-x-1 text-gray-400">
          <DollarSign className="h-4 w-4 text-emerald-500" />
          <span>${price}</span>
        </div>
        <div className="flex items-center space-x-1 text-gray-400">
          <Box className="h-4 w-4 text-blue-500" />
          <span>{units} units</span>
        </div>

        <div className="flex items-center space-x-1 text-gray-400">
          <Tag className="h-4 w-4 text-purple-500" />
          <span>{category}</span>
        </div>

        <div className="flex items-center space-x-1 text-gray-400">
          <Archive className="h-4 w-4 text-red-500" />
          <span>{isArchived ? "Archived" : "Active"}</span>
        </div>
      </div>

      <div className="flex items-center space-x-2 text-xs text-gray-600">
        <Layers className="h-4 w-4 text-indigo-500" />
        <span>{size.join(", ")}</span>
      </div>
    </Link>
  );
}

export default ProductCard;
