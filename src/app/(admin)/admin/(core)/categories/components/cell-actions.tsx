import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import toast from "react-hot-toast";
import { GetCategoryColumnsParams } from ".";
type Props = CellActionProps & GetCategoryColumnsParams;
export default function CellAction({
  id,
  name,
  setOpenDeleteDialog,
  setOpenEditDialog,
  setCurrentCategory
}: Props ) {
  function handleEditClick() {
    setOpenEditDialog(true);
    setCurrentCategory({ name, id });
  }
  function handleDeleteClick() {
    setOpenDeleteDialog(true);
    setCurrentCategory({ name, id });
  }
  function handleCopyClick() {
    navigator.clipboard.writeText(id);
    toast.success("Category ID copied to clipboard");
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>
          <Button variant="ghost" onClick={handleCopyClick}>
          <Copy className="h-4 w-4 mr-2"/>
          Copy Category ID
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button variant="ghost" onClick={handleEditClick}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Category
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button variant="ghost" onClick={handleDeleteClick} className="text-destructive">
            <Trash className="mr-2 h-4 w-4" />
            Delete Category
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
