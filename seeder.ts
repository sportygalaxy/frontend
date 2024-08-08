import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcryptjs";

const prisma = new PrismaClient();

async function seedUsers() {
  const user1 = await prisma.user.create({
    data: {
      id: "123e4567-e89b-12d3-a456-426614174000",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: hashSync("password", 10),
      phone: "1234567890",
      address: "123 Main St",
      isVerified: true,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      id: "123e4567-e89b-12d3-a456-426614174006",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      password: hashSync("password", 10),
      phone: "0987654321",
      address: "456 Elm St",
      isVerified: true,
    },
  });

  console.log("Users seeded");
}

async function seedCategoriesAndProducts() {
  const sportsEquipment = await prisma.category.create({
    data: {
      id: "123e4567-e89b-12d3-a456-426614174001",
      name: "Sports Equipment",
      description: "Various sports equipment",
      subcategories: {
        create: [
          {
            id: "123e4567-e89b-12d3-a456-426614174007",
            name: "Basketball",
            description: "Basketball equipment",
          },
        ],
      },
    },
    include: {
      subcategories: true,
    },
  });

  const apparel = await prisma.category.create({
    data: {
      id: "123e4567-e89b-12d3-a456-426614174002",
      name: "Apparel",
      description: "Sportswear and apparel",
      subcategories: {
        create: [
          {
            id: "123e4567-e89b-12d3-a456-426614174008",
            name: "Running",
            description: "Running gear and accessories",
          },
        ],
      },
    },
    include: {
      subcategories: true,
    },
  });

  const product1 = await prisma.product.create({
    data: {
      id: "123e4567-e89b-12d3-a456-426614174003",
      name: "Basketball",
      description: "A high-quality basketball",
      price: 29.99,
      stock: 100,
      categoryId: sportsEquipment.id,
      subcategoryId: sportsEquipment.subcategories[0].id,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      id: "123e4567-e89b-12d3-a456-426614174004",
      name: "Running Shoes",
      description: "Comfortable running shoes",
      price: 49.99,
      stock: 50,
      categoryId: apparel.id,
      subcategoryId: apparel.subcategories[0].id,
    },
  });

  console.log("Categories and Products seeded");
}

async function seedSizesAndColors() {
  const size1 = await prisma.size.create({
    data: {
      id: "123e4567-e89b-12d3-a456-426614174005",
      name: "Small",
    },
  });

  const size2 = await prisma.size.create({
    data: {
      id: "123e4567-e89b-12d3-a456-426614174006",
      name: "Medium",
    },
  });

  const color1 = await prisma.color.create({
    data: {
      id: "123e4567-e89b-12d3-a456-426614174007",
      name: "Red",
    },
  });

  const color2 = await prisma.color.create({
    data: {
      id: "123e4567-e89b-12d3-a456-426614174008",
      name: "Blue",
    },
  });

  console.log("Sizes and Colors seeded");
}

async function seedTypesAndAssociations() {
  const type1 = await prisma.type.create({
    data: {
      id: "123e4567-e89b-12d3-a456-426614174009",
      name: "Outdoor",
    },
  });

  const type2 = await prisma.type.create({
    data: {
      id: "123e4567-e89b-12d3-a456-426614174010",
      name: "Indoor",
    },
  });

  await prisma.productOnSize.createMany({
    data: [
      {
        productId: "123e4567-e89b-12d3-a456-426614174003",
        sizeId: "123e4567-e89b-12d3-a456-426614174005",
      },
      {
        productId: "123e4567-e89b-12d3-a456-426614174003",
        sizeId: "123e4567-e89b-12d3-a456-426614174006",
      },
      {
        productId: "123e4567-e89b-12d3-a456-426614174004",
        sizeId: "123e4567-e89b-12d3-a456-426614174006",
      },
    ],
  });

  await prisma.productOnColor.createMany({
    data: [
      {
        productId: "123e4567-e89b-12d3-a456-426614174003",
        colorId: "123e4567-e89b-12d3-a456-426614174007",
      },
      {
        productId: "123e4567-e89b-12d3-a456-426614174004",
        colorId: "123e4567-e89b-12d3-a456-426614174008",
      },
    ],
  });

  await prisma.productOnType.createMany({
    data: [
      {
        productId: "123e4567-e89b-12d3-a456-426614174003",
        typeId: "123e4567-e89b-12d3-a456-426614174009",
      },
      {
        productId: "123e4567-e89b-12d3-a456-426614174004",
        typeId: "123e4567-e89b-12d3-a456-426614174010",
      },
    ],
  });

  console.log("Types and Associations seeded");
}

async function seedOrders() {
  const order1 = await prisma.order.create({
    data: {
      id: "123e4567-e89b-12d3-a456-426614174011",
      userId: "123e4567-e89b-12d3-a456-426614174000",
      total: 79.98,
      status: "PENDING",
      items: {
        create: [
          {
            id: "123e4567-e89b-12d3-a456-426614174012",
            productId: "123e4567-e89b-12d3-a456-426614174003",
            quantity: 1,
            price: 29.99,
          },
          {
            id: "123e4567-e89b-12d3-a456-426614174013",
            productId: "123e4567-e89b-12d3-a456-426614174004",
            quantity: 1,
            price: 49.99,
          },
        ],
      },
    },
  });

  console.log("Orders seeded");
}

async function seedPaymentGateways() {
  const gateways = [
    {
      name: "Stripe",
      baseUrl: "https://api.stripe.com",
      apiKey: process.env.STRIPE_API_KEY,
      supportedCurrencies: ["USD", "EUR", "NGN"],
      transactionFee: 2.9, // Assuming 2.9% fee for Stripe
    },
    {
      name: "Paystack",
      baseUrl: "https://api.paystack.co",
      apiKey: process.env.PAYSTACK_API_KEY,
      supportedCurrencies: ["NGN", "USD"],
      transactionFee: 1.5, // Assuming 1.5% fee for Paystack
    },
  ];

  for (const gateway of gateways) {
    await prisma.paymentGateway.upsert({
      where: { name: gateway.name },
      update: {},
      create: gateway,
    });
  }

  console.log("Payment Gateways seeded successfully");
}

async function main() {
  const blockToSeed = process.argv[2]; // Pass the block name as a command line argument

  switch (blockToSeed) {
    case "users":
      await seedUsers();
      break;
    case "categoriesAndProducts":
      await seedCategoriesAndProducts();
      break;
    case "sizesAndColors":
      await seedSizesAndColors();
      break;
    case "typesAndAssociations":
      await seedTypesAndAssociations();
      break;
    case "orders":
      await seedOrders();
      break;
    case "paymentGateways":
      await seedPaymentGateways();
      break;
    default:
      console.log(
        "Please specify a valid block to seed: users, categoriesAndProducts, sizesAndColors, typesAndAssociations, orders"
      );
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// append the block name to seed
// npx ts-node seeder.ts paymentGateways
// node seeder.ts paymentGateways
