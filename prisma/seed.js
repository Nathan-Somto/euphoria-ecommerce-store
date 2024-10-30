require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma_custom = new PrismaClient();

async function main() {
  console.log("Seeding categories...");
  const category = [
    {
      name: "women's clothing",
      image:
        "https://res.cloudinary.com/dj4t8vc0g/image/upload/v1730315049/category-1_iy9luq.jpg",
    },
    {
      name: "men's clothing",
      image:
        "https://res.cloudinary.com/dj4t8vc0g/image/upload/v1730315041/category-2_k0modr.jpg",
    },
  ];
  await prisma_custom.category.createMany({
    data: category,
  });
  const categoryRes = await prisma_custom.category.findMany();
  const categoryMap = categoryRes.reduce((acc, curr) => {
    acc[curr.name] = curr.id;
    return acc;
  }, {});
  console.log("categoryMap:", JSON.stringify(categoryMap, null, 2));
  console.log("Seeding products...");
  const products = [
    {
      images: [
        "https://res.cloudinary.com/dj4t8vc0g/image/upload/v1728426509/ovfhm6etrutjwlwm3mgm.jpg",
        "https://res.cloudinary.com/dj4t8vc0g/image/upload/v1728426509/ranrvj8jrm7wyc9seiw0.jpg",
      ],
      size: ["MD", "LG", "XL"],
      name: "High-Waisted Jeans",
      description:
        "Classic high-waisted jeans that provide comfort and a flattering fit.",
      price: 44.99,
      units: 5,
      colors: ["#708090", "#000000"],
      inStock: true,
      isFeatured: false,
      isArchived: false,
      discountRate: 10,
      categoryId: categoryMap["women's clothing"],
      wishListIds: [],
    },
    {
      images: [
        "https://res.cloudinary.com/dj4t8vc0g/image/upload/v1728426362/gmut2re7lk5wdfpte4mg.webp",
        "https://res.cloudinary.com/dj4t8vc0g/image/upload/v1728426363/fkj7jvikrvwbtjycrble.webp",
      ],
      size: ["SM", "MD", "LG"],
      name: "Hooded Sweatshirt",
      description: "A warm hooded sweatshirt perfect for cooler weather.",
      price: 49.99,
      units: 5,
      colors: ["#FF4500", "#000000"],
      inStock: true,
      isFeatured: true,
      isArchived: false,
      discountRate: 20,
      categoryId: categoryMap["men's clothing"],
      wishListIds: [],
    },
    {
      images: [
        "https://res.cloudinary.com/dj4t8vc0g/image/upload/v1728425049/e0wuyj10thoracqzgozl.jpg",
        "https://res.cloudinary.com/dj4t8vc0g/image/upload/v1728426752/jyf5iajulmjgkx0zxqul.jpg",
      ],
      size: ["SM", "MD"],
      name: "Casual T-Shirt",
      description:
        "A comfortable and stylish casual t-shirt perfect for everyday wear.",
      price: 19.99,
      units: 5,
      colors: ["#FF5733", "#3333FF"],
      inStock: true,
      isFeatured: true,
      isArchived: false,
      discountRate: 10,
      categoryId: categoryMap["men's clothing"],
      wishListIds: [],
    },
    {
      images: [
        "https://res.cloudinary.com/dj4t8vc0g/image/upload/v1728425864/nhmetuoajbclistwbmku.jpg",
        "https://res.cloudinary.com/dj4t8vc0g/image/upload/v1728425864/qljdov3hmugfnkt2wehy.jpg",
      ],
      size: ["MD", "LG"],
      name: "Classic Polo Shirt",
      description:
        "A timeless classic polo shirt suitable for both casual and semi-formal events.",
      price: 29.99,
      units: 5,
      colors: ["#008080", "#FFFFFF"],
      inStock: true,
      isFeatured: false,
      isArchived: false,
      discountRate: 15,
      categoryId: categoryMap["men's clothing"],
      wishListIds: [],
    },
    {
      images: [
        "https://res.cloudinary.com/dj4t8vc0g/image/upload/v1728426595/lrvzegcancmvujrbksas.webp",
        "https://res.cloudinary.com/dj4t8vc0g/image/upload/v1728426595/vmpvajzp7bvu5jl415oc.webp",
      ],
      size: ["SM", "MD", "LG", "XL"],
      name: "Denim Skirt",
      description:
        "A chic denim skirt that pairs well with any top for a casual look.",
      price: 29.99,
      units: 5,
      colors: ["#4682B4"],
      inStock: true,
      isFeatured: true,
      isArchived: false,
      discountRate: 5,
      categoryId: categoryMap["women's clothing"],
      wishListIds: [],
    },
    {
      images: [
        "https://res.cloudinary.com/dj4t8vc0g/image/upload/v1728426417/fjpek6k5ypwgops5ccvl.webp",
        "https://res.cloudinary.com/dj4t8vc0g/image/upload/v1728426418/vms1therpbtdjpmas3pb.webp",
      ],
      size: ["MD", "LG", "XL"],
      name: "Denim Jacket",
      description:
        "A durable and stylish denim jacket for a cool, casual look.",
      price: 59.99,
      units: 5,
      colors: ["#1E90FF"],
      inStock: true,
      isFeatured: false,
      isArchived: false,
      discountRate: null,
      categoryId: categoryMap["men's clothing"],
      wishListIds: [],
    },
    {
      images: [
        "https://res.cloudinary.com/dj4t8vc0g/image/upload/v1728426459/ipjkwkucmunvwzrllh7v.webp",
        "https://res.cloudinary.com/dj4t8vc0g/image/upload/v1728426460/hnii63s7s5rirl0ke3cr.jpg",
      ],
      size: ["SM", "MD", "LG"],
      name: "Floral Summer Dress",
      description:
        "A beautiful floral summer dress, perfect for warm days and casual outings.",
      price: 34.99,
      units: 5,
      colors: ["#FF69B4", "#FFFFF0"],
      inStock: true,
      isFeatured: true,
      isArchived: false,
      discountRate: 15,
      createdAt: "2024-10-07T22:01:01.179Z",
      updatedAt: "2024-10-08T22:27:53.587Z",
      categoryId: categoryMap["women's clothing"],
      wishListIds: [],
    },
    {
      images: [
        "https://res.cloudinary.com/dj4t8vc0g/image/upload/v1728426562/msxlbvoyfjdhxpnbuee4.webp",
        "https://res.cloudinary.com/dj4t8vc0g/image/upload/v1728426563/iyd57ot0wsnbtx2kyzih.webp",
      ],
      size: ["SM", "MD"],
      name: "Cozy Knit Sweater",
      description:
        "A cozy knit sweater that keeps you warm and stylish during colder seasons.",
      price: 39.99,
      units: 5,
      colors: ["#FFD700", "#FFFAFA"],
      inStock: true,
      isFeatured: false,
      isArchived: false,
      discountRate: null,
      categoryId: categoryMap["women's clothing"],
      wishListIds: [],
    },
    {
      name: "Slim Fit Jeans",
      price: 39.99,
      description: "Stylish slim-fit jeans that offer comfort and flexibility for any occasion.",
      discountRate: null,
      colors: [
        "#000000",
        "#2E8B57"
      ],
      categoryId: categoryMap['men\'s clothing'],
      images: [
        'https://res.cloudinary.com/dj4t8vc0g/image/upload/v1728426307/q4rnq82geyensn8cp2xa.webp',
        'https://res.cloudinary.com/dj4t8vc0g/image/upload/v1728426307/hinjhh9nsf2wfgsoa0k6.webp'
      ],
      isFeatured: false,
      isArchived: false,
      inStock: true,
      wishListIds: [],
      size: [
        "LG",
        "XL"
      ]
    },
    {
      name: "Leather Jacket",
      price: 79.99,
      description: "A stylish leather jacket, perfect for adding an edgy touch to any outfit.",
      discountRate: 20,
      colors: [
        "#000000",
        "#8B4513"
      ],
      categoryId: categoryMap['women\'s clothing'],
      images: [
        'https://res.cloudinary.com/dj4t8vc0g/image/upload/v1728426639/lsjavapzv1mnlv6qgf9v.webp',
        'https://res.cloudinary.com/dj4t8vc0g/image/upload/v1728426639/qiaxshfhwxfmuf0wqpvc.webp'
      ],
      isFeatured: false,
      isArchived: false,
      wishListIds: [],
      inStock: true,
      size: [
        "MD",
        "LG"
      ]
    }
  ];
  await prisma_custom.product.createMany({
    data: products,
  });
  console.log("Products seeded successfully!");
  console.log("Seeding testimonials...");
  const testimonials = [
    {
      name: "Jane Doe",
      message:
        "I love the quality of the products and the excellent customer service!",
      rating: 5,
      image: "https://xsgames.co/randomusers/assets/avatars/female/30.jpg",
    },
    {
      name: "John Smith",
      message:
        "The products are amazing and the delivery was fast. Highly recommended!",
      rating: 5,
      image: "https://xsgames.co/randomusers/assets/avatars/male/57.jpg",
    },
    {
      name: "Alice Johnson",
      message:
        "I'm very satisfied with my purchase. The products are worth every penny!",
      rating: 4.5,
      image: "https://xsgames.co/randomusers/assets/avatars/female/20.jpg",
    },
    {
      name: "Bob Brown",
      message:
        "The products are great and the customer service is top-notch. Will definitely buy again!",
      rating: 3.5,
      image: "https://xsgames.co/randomusers/assets/avatars/male/40.jpg",
    },
    {
      name: "Eve White",
      message:
        "I'm impressed with the quality of the products and the fast delivery. Keep up the good work!",
      rating: 5,
      image: "https://xsgames.co/randomusers/assets/avatars/female/45.jpg",
    },
  ];
  await prisma_custom.testimonial.createMany({
    data: testimonials,
  });
  console.log("Testimonials seeded successfully!");
  console.log("Seeding Banner...");
  const banner = [
    {
      discountRate: 50,
      discountColor: "rgb(250,30,0)",
      title: "Women's Winter Collection",
      description: "Get the best deals on winter wear",
      buttonText: "Shop Now",
      image:
        "https://res.cloudinary.com/dj4t8vc0g/image/upload/v1730314658/banner_winter_ith5p3.jpg",
    },
    {
      discountRate: null,
      title: "Men’s Fashion",
      description: "Discover stylish choices for all seasons",
      buttonText: "Explore Now",
      image:
        "https://res.cloudinary.com/dj4t8vc0g/image/upload/v1730314576/banner_men_sv9cjf.jpg",
    },
    {
      discountRate: null,
      discountColor: "rgb(0, 200, 0)",
      title: "Exclusive Spring Collection",
      description: "Refresh your wardrobe with the latest trends",
      buttonText: "See Collection",
      image:
        "https://res.cloudinary.com/dj4t8vc0g/image/upload/v1730314566/banner_spring_hopagr.jpg",
    },
  ];
  await prisma_custom.banner.createMany({
    data: banner,
  });
  console.log("Seeded banner successfully...");
  console.log("Finished Seeding db");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma_custom.$disconnect();
  });