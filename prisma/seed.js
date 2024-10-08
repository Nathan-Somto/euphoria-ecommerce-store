require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma_custom = new PrismaClient();

async function main() {
  const products = [
    {
      name: "Casual T-Shirt",
      price: 19.99,
      description: "A comfortable and stylish casual t-shirt perfect for everyday wear.",
      discountRate: 10,
      colors: ["#FF5733", "#3333FF"],
      categoryId: "fe11dc3e-80d6-4bbb-a20a-083500ad4ca7",
      images: [],
      isFeatured: true,
      isArchived: false,
      size: ["SM", "MD"]
    },
    {
      name: "Classic Polo Shirt",
      price: 29.99,
      description: "A timeless classic polo shirt suitable for both casual and semi-formal events.",
      discountRate: 15,
      colors: ["#008080", "#FFFFFF"],
      categoryId: "fe11dc3e-80d6-4bbb-a20a-083500ad4ca7",
      images: [],
      isFeatured: false,
      isArchived: false,
      size: ["MD", "LG"]
    },
    {
      name: "Slim Fit Jeans",
      price: 39.99,
      description: "Stylish slim-fit jeans that offer comfort and flexibility for any occasion.",
      discountRate: null,
      colors: ["#000000", "#2E8B57"],
      categoryId: "fe11dc3e-80d6-4bbb-a20a-083500ad4ca7",
      images: [],
      isFeatured: false,
      isArchived: false,
      size: ["LG", "XL"]
    },
    {
      name: "Hooded Sweatshirt",
      price: 49.99,
      description: "A warm hooded sweatshirt perfect for cooler weather.",
      discountRate: 20,
      colors: ["#FF4500", "#000000"],
      categoryId: "fe11dc3e-80d6-4bbb-a20a-083500ad4ca7",
      images: [],
      isFeatured: true,
      isArchived: false,
      size: ["SM", "MD", "LG"]
    },
    {
      name: "Denim Jacket",
      price: 59.99,
      description: "A durable and stylish denim jacket for a cool, casual look.",
      discountRate: null,
      colors: ["#1E90FF"],
      categoryId: "fe11dc3e-80d6-4bbb-a20a-083500ad4ca7",
      images: [],
      isFeatured: false,
      isArchived: false,
      size: ["MD", "LG", "XL"]
    },
    {
      name: "Floral Summer Dress",
      price: 34.99,
      description: "A beautiful floral summer dress, perfect for warm days and casual outings.",
      discountRate: 15,
      colors: ["#FF69B4", "#FFFFF0"],
      categoryId: "bcbc719e-4573-4a55-9975-e6cff1c6f12e",
      images: [],
      isFeatured: true,
      isArchived: false,
      size: ["SM", "MD", "LG"]
    },
    {
      name: "High-Waisted Jeans",
      price: 44.99,
      description: "Classic high-waisted jeans that provide comfort and a flattering fit.",
      discountRate: 10,
      colors: ["#708090", "#000000"],
      categoryId: "bcbc719e-4573-4a55-9975-e6cff1c6f12e",
      images: [],
      isFeatured: false,
      isArchived: false,
      size: ["MD", "LG", "XL"]
    },
    {
      name: "Cozy Knit Sweater",
      price: 39.99,
      description: "A cozy knit sweater that keeps you warm and stylish during colder seasons.",
      discountRate: null,
      colors: ["#FFD700", "#FFFAFA"],
      categoryId: "bcbc719e-4573-4a55-9975-e6cff1c6f12e",
      images: [],
      isFeatured: false,
      isArchived: false,
      size: ["SM", "MD"]
    },
    {
      name: "Denim Skirt",
      price: 29.99,
      description: "A chic denim skirt that pairs well with any top for a casual look.",
      discountRate: 5,
      colors: ["#4682B4"],
      categoryId: "bcbc719e-4573-4a55-9975-e6cff1c6f12e",
      images: [],
      isFeatured: true,
      isArchived: false,
      size: ["SM", "MD", "LG", "XL"]
    },
    {
      name: "Leather Jacket",
      price: 79.99,
      description: "A stylish leather jacket, perfect for adding an edgy touch to any outfit.",
      discountRate: 20,
      colors: ["#000000", "#8B4513"],
      categoryId: "bcbc719e-4573-4a55-9975-e6cff1c6f12e",
      images: [],
      isFeatured: false,
      isArchived: false,
      size: ["MD", "LG"]
    }
  ];
  
  console.log('Seeding products...');
  await prisma_custom.product.createMany({
    data: products,
  });
  console.log('Products seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma_custom.$disconnect();
  });