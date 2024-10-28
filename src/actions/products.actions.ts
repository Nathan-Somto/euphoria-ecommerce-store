"use server";
import { errorLogger } from "@/utils/errorLogger";
import { ProductSchema, productSchema } from "@/schema/products.schema";
import { prettifyZodErrors } from "@/utils/prettifyZodErrors";
import { notFound, redirect } from "next/navigation";
import { sizeObj } from "@/constants/sizes";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { tryCatchFn } from "@/utils/tryCatchFn";
type WithoutSizes = Omit<ProductSchema, "sizes">;
type ModifiedData = WithoutSizes & {
  size: ProductSchema["sizes"][number]["value"][];
};
function getModifiedData(data: ProductSchema): ModifiedData {
  return {
    ...data,
    size: data.sizes?.map((item) => item.value),
    //@ts-ignore
    sizes: undefined,
  };
}
export async function getProduct(productId: string, forAdmin: boolean = false) {
  try {
    const data = await prisma?.product.findUnique({
      where: {
        id: productId,
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        discountRate: true,
        colors: true,
        categoryId: true,
        category: {
          select: {
            name: true,
          },
        },
        size: true,
        images: true,
        units: true,
        isArchived: true,
        isFeatured: true,
        createdAt: true,
      },
    });
    // the admin page can see archived products
    if (!data || (data.isArchived && !forAdmin)) {
      notFound();
    }
    return {
      data: {
        ...data,
        discountRate: data.discountRate ?? undefined,
        sizes: data.size.map((size) => ({ value: size, label: sizeObj[size] })),
        category: data?.category.name,
      },
    };
  } catch (err) {
    errorLogger(err);
    return {
      message: "failed to get product",
    };
  }
}

export async function getSimilarProducts(productId: string) {
  try {
    // get the category of the product
    const category = await prisma?.product.findUnique({
      where: {
        id: productId,
      },
      select: {
        category: {
          select: {
            id: true,
          },
        },
      },
    });
    // get all products in that category and take 5
    const similarProducts = await prisma?.product.findMany({
      where: {
        categoryId: category?.category.id,
        isArchived: false,
        id: {
          not: productId,
        },
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        discountRate: true,
        colors: true,
        category: {
          select: {
            name: true,
          },
        },
        size: true,
        images: true,
        units: true,
        isArchived: true,
        isFeatured: true,
        createdAt: true,
      },
      take: 5,
    });
    return {
      data: similarProducts,
    };
  } catch (err) {
    errorLogger(err);
    return {
      message: "failed to get similar products",
    };
  }
}
export async function createProduct(data: ProductSchema, _productId: string) {
  try {
    console.log(data);
    const validatedFields = productSchema.safeParse({
      ...data,
    });
    if (!validatedFields.success) {
      return {
        message: prettifyZodErrors(
          validatedFields.error,
          "failed to create product"
        ),
      };
    }
    const modifiedData = getModifiedData(data);
    console.log("the modified data", modifiedData);
    // perform the db manipulation.
    /*  await prisma?.product.create({
      data: {
        name: modifiedData.name,
        price: modifiedData.price,
        description: modifiedData.description,
        discountRate: modifiedData.discountRate,
        colors: modifiedData.colors,
        categoryId: modifiedData.categoryId,
        size: modifiedData.size,
        images: modifiedData.images,
        units: 5,
        isArchived: modifiedData.isArchived,
        isFeatured: modifiedData.isFeatured
      }
    }); */
    revalidatePath(`/admin/products`);
    return {
      message: "successfully created product!",
    };
  } catch (err) {
    errorLogger(err);
    return {
      message: "failed to create product",
    };
  }
}
export async function updateProduct(data: ProductSchema, productId: string) {
  try {
    const validatedFields = productSchema.safeParse({
      ...data,
    });
    if (!validatedFields.success) {
      return {
        message: prettifyZodErrors(
          validatedFields.error,
          "failed to update product"
        ),
      };
    }
    const modifiedData = getModifiedData(data);
    await prisma?.product.update({
      where: {
        id: productId,
      },
      data: {
        name: modifiedData.name,
        price: modifiedData.price,
        description: modifiedData.description,
        discountRate: modifiedData.discountRate,
        colors: modifiedData.colors,
        categoryId: modifiedData.categoryId,
        size: modifiedData.size,
        images: modifiedData.images,
        units: 5,
        isArchived: modifiedData.isArchived,
        isFeatured: modifiedData.isFeatured,
      },
    });
    revalidatePath(`/admin/products`);
  } catch (err) {
    errorLogger(err);
    return {
      message: "failed to update product",
    };
  }
}
export async function getAdminProducts() {
  try {
    const data = await prisma?.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        discountRate: true,
        colors: true,
        category: {
          select: {
            name: true,
          },
        },
        size: true,
        images: true,
        units: true,
        isArchived: true,
        isFeatured: true,
        createdAt: true,
      },
    });
    return {
      data: data?.map((item) => ({
        ...item,
        category: item.category.name,
      })),
    };
  } catch (err) {
    errorLogger(err);
    return {
      message: "failed to get products",
    };
  }
}
export async function getMainSiteProducts() {
  return await tryCatchFn({
    cb: async ()=> {
      const data = await prisma?.product.findMany({
      where: {
        isArchived: false,
      },
      select: {
        id: true,
        name: true,
        price: true,
        discountRate: true,
        category: {
          select: {
            name: true,
          },
        },
        size: true,
        images: true,
        units: true,
        isFeatured: true,
        createdAt: true,
      },
    });
    return data?.map((item) => ({
        ...item,
        category: item.category.name,
        image: item.images[0],
        images: undefined,
      }));
  },
  message: "failed to get products"
  });
}
export async function deleteProduct(
  prevState: any,
  formData: FormData,
  id: string
) {
  // if the product has no orders delete as usual
  // if the product has orders just archive it (this is done so that the product will still remain in customers history)
  return {
    message: "successfully deleted product",
  };
}
