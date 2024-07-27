import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
const prisma = new PrismaClient();

async function main() {
  // Create some users
  const user1 = await prisma.user.create({
    data: {
      id: randomUUID(),
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
      id: randomUUID(),
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
      id: randomUUID(),
      name: "Sports Equipment",
      description: "Various sports equipment",
    },
  });

  const category2 = await prisma.category.create({
    data: {
      id: randomUUID(),
      name: "Apparel",
      description: "Sportswear and apparel",
    },
  });

  // Create some subcategories
  const subcategory1 = await prisma.subcategory.create({
    data: {
      id: randomUUID(),
      name: "Basketball",
      description: "Basketball equipment",
      categoryId: category1.id,
    },
  });

  const subcategory2 = await prisma.subcategory.create({
    data: {
      id: randomUUID(),
      name: "Running",
      description: "Running gear and accessories",
      categoryId: category2.id,
    },
  });

  // Create some products
  const product1 = await prisma.product.create({
    data: {
      id: randomUUID(),
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
      id: randomUUID(),
      name: "Running Shoes",
      description: "Comfortable running shoes",
      price: 49.99,
      stock: 50,
      categoryId: category2.id,
      subcategoryId: subcategory2.id,
    },
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
