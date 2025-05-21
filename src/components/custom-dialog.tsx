"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import React from "react";
type Props = CustomDialogProps & {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};
export default function CustomDialog({
  children,
  open,
  setOpen,
  text,
  withTrigger,
}: Props) {
  // quick fix to prevent hydration error.
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <Dialog
      open={open}
      onOpenChange={(previousOpen) => {
        return (typeof setOpen !== "undefined" ? setOpen(previousOpen) : undefined)
      }}
    >
      {withTrigger && (
        <DialogTrigger>
          <Button>{text}</Button>
        </DialogTrigger>
      )}
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
