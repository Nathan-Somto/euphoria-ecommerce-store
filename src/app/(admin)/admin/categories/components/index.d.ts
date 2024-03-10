import {getCategories} from "@/actions/categories.actions"
export type CategoryTable = Awaited<ReturnType<typeof getCategories>>['data'][number]
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