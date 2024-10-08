"use client";
import { CldUploadWidget } from "next-cloudinary";
import { ImageIcon, TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
export type ImageVal = {
  id: string;
  url: string;
};
function getId() {
  return Math.random().toString(36).substring(7);
}
export function convertToImageVals(val: string[]): ImageVal[] {
  return val.map((url) => ({
    id: getId(),
    url,
  }));
}
type Props = {
  disabled?: boolean;
  onRemove?: (id: string) => void;
  onChange: (val: ImageVal) => void;
  values: ImageVal[];
};
export function UploadButton({ onChange, onRemove, disabled, values }: Props) {
  return (
    <div>
      <CldUploadWidget
        uploadPreset="product_preset"
        onSuccess={(res) => {
          if (typeof res.info !== "string") {
            if (res.info) {
              // create an id for the image
              const id = Math.random().toString(36).substring(7);
              onChange({
                id,
                url: res.info.secure_url,
              });
            }
          }
        }}
      >
        {({ open }) => {
          return (
            <Button variant={"secondary"} onClick={() => open()}>
              <ImageIcon className="mr-2" /> Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
      {/* Render the images */}
      <div className="flex flex-wrap gap-2.5 mt-4">
        {values.map((value) => (
          <div key={value.id} className="relative">
            <Image
              src={value.url}
              className="w-40 h-40 object-cover rounded-lg aspect-square "
              alt="product"
            />
            <Button
              variant="destructive"
              className="absolute top-0 right-0"
              onClick={() => onRemove && onRemove(value.id)}
            >
              <TrashIcon className="h-4 w-4" />
              <span className="sr-only">Remove</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
