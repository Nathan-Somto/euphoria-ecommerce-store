"use server";
import prisma from "@/lib/prisma";
import { generateRandomColor } from "@/utils/generateRandomColor";
import { tryCatchFn } from "@/utils/tryCatchFn";
export const getRevenueData = async () => {
  return tryCatchFn({
    cb: async () => {
      const orders = await prisma?.order.findMany({
        where: {
          OR: [{ status: "DELIVERED" }, { status: "PAID" }],
        },
        select: {
          status: true,
          createdAt: true,
          orderedProducts: {
            select: {
              quantity: true,
              Product: {
                select: {
                  price: true
                }
              }

            }
          }
        },
      });
      return orders;
    },
    message: "Error fetching total orders",
  });
};
export const getRevenueChartData = (data: ServerActionReturnType<typeof getRevenueData>) => {
  const revenueData = [
    {
      name: "January",
      total: 0,
    },
    {
      name: "Feburary",
      total: 0,
    },
    {
      name: "March",
      total: 0,
    },
    {
      name: "April",
      total: 0,
    },
    {
      name: "May",
      total: 0,
    },
    {
      name: "June",
      total: 0,
    },
    {
      name: "July",
      total: 0,
    },
    {
      name: "August",
      total: 0,
    },
    {
      name: "September",
      total: 0,
    },
    {
      name: "October",
      total: 0,
    },
    {
      name: "November",
      total: 0,
    },
    {
      name: "December",
      total: 0,
    },
  ];

  data.forEach((order) => {
    const month = new Date(order.createdAt).getMonth();
    if (revenueData[month] === undefined) return;
    revenueData[month].total += order.orderedProducts.reduce(
      (acc, next) => acc + (next?.Product?.price ?? 1) * next.quantity,
      0
    );
  });
  return revenueData;
};

export const getOrdersAndRevenue = (data: ServerActionReturnType<typeof getRevenueData>) => {
  let totalRevenue = 0
  data.forEach((order) => {
    totalRevenue += order.orderedProducts.reduce(
      (acc, next) => acc + (next?.Product?.price ?? 1) * next.quantity,
      0
    );
  })
  return { totalRevenue, totalOrders: data.length }
};


export const getActiveUsers = async () => {
  return tryCatchFn({
    cb: async () => {
      const activeUsers = await prisma.user.count({
        where: {
          isDisabled: false,
          role: "CUSTOMER",
        },
      });
      return activeUsers;
    },
    message: "Error fetching active users",
  });
};
export const getProductsInStock = async () => {
  return tryCatchFn({
    cb: async () => {
      const productsInStock = await prisma.product.count({
        where: {
          inStock: true,
        },
      });
      return productsInStock;
    },
    message: "Error fetching products in stock",
  })
}
export const getProductPurchaseData = async () => {
  return tryCatchFn({
    cb: async () => {
      const products = await prisma.product.findMany({
        select: {
          name: true,
          OrderedProduct: {
            select: {
              id: true
            }
          }
        }
      });
      // should be in this form [{name: "White Shirt", total: 15, color: "#FFC107"}]
      return products.map((product) => {
        return {
          name: product.name,
          total: product.OrderedProduct.length,
          color: generateRandomColor()
        }
      });
    },
    message: "Error fetching product purchase data"
  })
}
