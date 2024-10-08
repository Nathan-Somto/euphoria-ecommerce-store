"use client";
import { CldUploadWidget } from "next-cloudinary";
import { ImageIcon, TrashIcon } from "lucide-react";
import { v4 as uuidV4 } from "uuid";
import { Button } from "@/components/ui/button";
export type ImageVal = {
  id: string;
  url: string;
};

export function convertToImageVals(val: string[]): ImageVal[] {
  return val.map((url) => ({
    id: uuidV4(),
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
              onChange({
                id: uuidV4(),
                url: res.info.secure_url,
              });
            }
          }
        }}
      >
        {({ open }) => {
          return (
            <Button
              variant={"secondary"}
              disabled={disabled}
              onClick={() => open()}
              type="button"
            >
              <ImageIcon className="mr-2" /> Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
      {/* Render the images */}
      <div className="flex flex-wrap gap-2.5 mt-4">
        {values.map((value) => (
          <div key={value.id} className="relative">
            <img
              src={value.url}
              className="w-40 h-40 object-cover rounded-lg aspect-square "
              alt="product"
            />
            <Button
              type="button"
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
