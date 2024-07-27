import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Create some users
  const user1 = await prisma.user.create({
    data: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password",
      phone: "1234567890",
      address: "123 Main St",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      password: "password",
      phone: "0987654321",
      address: "456 Main St",
    },
  });

  // Create some categories
  const category1 = await prisma.category.create({
    data: {
      name: "Sports Equipment",
      description: "Various sports equipment",
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: "Apparel",
      description: "Sportswear and apparel",
    },
  });

  // Create some subcategories
  const subcategory1 = await prisma.subcategory.create({
    data: {
      name: "Basketball",
      description: "Basketball equipment",
      categoryId: category1.id,
    },
  });

  const subcategory2 = await prisma.subcategory.create({
    data: {
      name: "Running",
      description: "Running gear and accessories",
      categoryId: category2.id,
    },
  });

  // Create sizes
  const size1 = await prisma.size.create({
    data: {
      name: "Small",
    },
  });

  const size2 = await prisma.size.create({
    data: {
      name: "Medium",
    },
  });

  // Create colors
  const color1 = await prisma.color.create({
    data: {
      name: "Red",
    },
  });

  const color2 = await prisma.color.create({
    data: {
      name: "Blue",
    },
  });

  // Create types
  const type1 = await prisma.type.create({
    data: {
      name: "Outdoor",
    },
  });

  const type2 = await prisma.type.create({
    data: {
      name: "Indoor",
    },
  });

  // Create some products
  const product1 = await prisma.product.create({
    data: {
      name: "Basketball",
      description: "A high-quality basketball",
      price: 29.99,
      stock: 100,
      categoryId: category1.id,
      subcategoryId: subcategory1.id,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Running Shoes",
      description: "Comfortable running shoes",
      price: 49.99,
      stock: 50,
      categoryId: category2.id,
      subcategoryId: subcategory2.id,
    },
  });

  // Associate products with sizes
  await prisma.productOnSize.createMany({
    data: [
      { productId: product1.id, sizeId: size1.id },
      { productId: product1.id, sizeId: size2.id },
      { productId: product2.id, sizeId: size2.id },
    ],
  });

  // Associate products with colors
  await prisma.productOnColor.createMany({
    data: [
      { productId: product1.id, colorId: color1.id },
      { productId: product2.id, colorId: color2.id },
    ],
  });

  // Associate products with types
  await prisma.productOnType.createMany({
    data: [
      { productId: product1.id, typeId: type1.id },
      { productId: product2.id, typeId: type2.id },
    ],
  });

  console.log("Seeding completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
