import { Heading } from "@/components/ui/heading";
import CustomDialog from "@/components/custom-dialog";
import CategoryForm from "./components/category-form";
import { getCategories } from "@/actions/categories.actions";
import CategoryClient from "./components/category-client";

export default async function CategoryPage() {
  const { data: categories } = await getCategories(true);
  return (
    <div className="py-5 px-4">
      <div className="flex items-center justify-between mb-8">
        <Heading
          title="Categories"
          description="here are a list of available categories for the store"
        />
        <CustomDialog text="Add Category" withTrigger>
          <CategoryForm categoryNames={categories.map((item) => item.name)} />
        </CustomDialog>
      </div>
      <div>
        <CategoryClient categories={categories} />
      </div>
    </div>
  );
}
