import { CategoryWithProducts, getCategories } from "@/actions/categories.actions"
export type CategoryTable = CategoryWithProducts;
export type GetCategoryColumnsParams =
    {
        setOpenEditDialog: React.Dispatch<React.SetStateAction<boolean>>,
        setOpenDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>,
        setCurrentCategory: React.Dispatch<React.SetStateAction<null | {
            name: string;
            id: string;
        }>>
    }
export type CategoryClientProps = {
    categories: CategoryTable[]
}