'use server';
import {errorLogger} from "@/utils/errorLogger";
import {ProductSchema, productSchema} from "@/schema/products.schema";
type WithoutSizes = Omit<ProductSchema, 'sizes'>;
type ModifiedData = WithoutSizes & {
  sizes: (ProductSchema['sizes'][number]['value'])[]
};
export async function createProduct( data: ProductSchema, _productId:string) {
 try{
    console.log(data);
    const validatedFields = productSchema.safeParse({
       ...data
    });
    if (!validatedFields.success) {
      return {
        message: validatedFields.error.flatten().fieldErrors.name?.join('\n') ?? "failed to create product",
      }
    }
    const modifiedData: ModifiedData = {
      ...data,
      sizes : data.sizes?.map((item) => item.value)
    };
    console.log("the modified data", modifiedData);
    // perform the db manipulation.
    return{
      message: "successfully created product!"
    }
 }
 catch(err){
   errorLogger(err);
    return {
      message: "failed to create product"
    }
 }   
}
export async function updateProduct(data: ProductSchema, productId: string){
  return {
    message : "not implemented!"
  }
}

export async function deleteProduct(prevState: any, formData: FormData){
   // if the product has no orders delete as usual
   // if the product has orders just archive it (this is done so that the product will still remain in customers history)
}