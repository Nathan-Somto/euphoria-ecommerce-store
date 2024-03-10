'use server'
import prisma from '@/lib/prisma'
import { categorySchema } from "@/schema/categories.schema"
import { errorLogger } from '@/utils/errorLogger';
import { revalidatePath } from 'next/cache'

export async function getCategories(){
  try{
    // add an  array of product ids to each category
    const categories = await prisma?.category.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        products: {
          select: {
            id: true
          }
      }
    }});
    return {
      data: categories
    }
  }
  catch(err){
    errorLogger(err)
    return {
      data: []
    }
  }
} 
export  async function createCategory(prevState:any, formData:FormData, _categoryId: string) {
  try{const validatedFields = categorySchema.safeParse({
    name: formData.get('name'),
  })
  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors.name?.join('\n') ?? "failed to add category",
    }
  }
 
  // Mutate data
  await prisma?.category.create({
    data: {
        name:formData.get('name') as unknown as string
    }
  })
  revalidatePath('/admin/categories')
  //@Todo: revalidate the home page to include the new category
  return {
    message: "successfully added category"
  }}
  catch(err){
    errorLogger(err)
    return {
      message: "failed to add category"
    }
  }

}
export async function updateCategory(prevState:any, formData:FormData, categoryId: string) {

try{
  console.log(categoryId);
  const validatedFields = categorySchema.safeParse({
    name: formData.get('name'),
  })
  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors.name?.join('\n') ?? "failed to add category",
    }
  }
  await prisma.category.update({
    where: {
      id: categoryId ?? ""
    },
    data: {
      name: formData.get('name') as unknown as string
    }
  })
  revalidatePath('/admin/categories')
  //@Todo: revalidate the home page to include the new category
  return {
    message: "successfully editted category"
  }}
catch(err){
  errorLogger(err)
  return {
    message: "failed to edit category"
  }
}
}
export async function deleteCategory(prevState:any, formData:FormData, categoryId: string) {
try{ 
  await prisma.category.delete({
    where: {
      id: categoryId
    }
  })
  await prisma.product.updateMany({
    where :{
      categoryId
    },
    data: {
      categoryId: undefined
    }
  });
  revalidatePath('/admin/categories');
  return ({
    message: "successfully deleted category"
  })
}
catch(err){
  errorLogger(err);
  return ({
    message: "failed to delete category"
  })
}
}