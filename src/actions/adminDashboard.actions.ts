"use server";
import prisma from "@/lib/prisma";

export async function getRevenueChartData() {
  try {
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
    const orders = await prisma?.order.findMany({
      where: {
        OR: [{ status: "DELIVERED" }, { status: "SHIPPED" }],
      },
      select: {
        status: true,
        createdAt: true,
        products: {
          select: {
            price: true,
          },
        },
      },
    });
    orders.forEach((order) => {
      revenueData[order.createdAt.getMonth()].total += order.products.reduce(
        (acc, next) => acc + next.price,
        0
      );
    });
    return revenueData;
  } catch (err) {
    console.log(err.message);
    return [];
  }
}

export async function getTotalRevenueAndSales(){
    try{
        
        // Total Revenue
        const orders =  await prisma?.order.findMany({
            where: {
              OR: [{ status: "DELIVERED" }, { status: "SHIPPED" }],
            },
            select: {
              status: true,
              createdAt: true,
              products: {
                select: {
                  price: true,
                },
              },
            },
          });
          let totalRevenue = 0
          orders.forEach((order) => {
            totalRevenue += order.products.reduce(
              (acc, next) => acc + next.price,
              0
            );
          });
          return [totalRevenue, orders.length]
    }catch(err){
        return [0,0];
    }
}

export async function getActiveUsers(){
    try{
        const activeUsers = await prisma.user.count({
            where: {
                isDisabled: false,
                isEmailVerified: true,
                role: "CUSTOMER",
            }
        });
        return activeUsers;
    }
    catch(err){
        return 0;
    }
}
export async function getProductsInStock(){
try{
    const productsInStock = await prisma.product.count({
        where: {
            inStock: true
        }
    });
    return productsInStock;
}
catch(err){
    return 0;
}
}
