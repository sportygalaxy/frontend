"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = require("bcryptjs");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Create users
        const user1 = yield prisma.user.create({
            data: {
                id: "123e4567-e89b-12d3-a456-426614174000",
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com",
                password: (0, bcryptjs_1.hashSync)("password", 10),
                phone: "1234567890",
                address: "123 Main St",
                isVerified: true,
            },
        });
        const user2 = yield prisma.user.create({
            data: {
                id: "123e4567-e89b-12d3-a456-426614174006",
                firstName: "Jane",
                lastName: "Smith",
                email: "jane.smith@example.com",
                password: (0, bcryptjs_1.hashSync)("password", 10),
                phone: "0987654321",
                address: "456 Elm St",
                isVerified: true,
            },
        });
        // Create categories and subcategories
        const sportsEquipment = yield prisma.category.create({
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
                subcategories: true, // Include subcategories in the returned payload
            },
        });
        const apparel = yield prisma.category.create({
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
                subcategories: true, // Include subcategories in the returned payload
            },
        });
        // Create products
        const product1 = yield prisma.product.create({
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
        const product2 = yield prisma.product.create({
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
        // Create sizes
        const size1 = yield prisma.size.create({
            data: {
                id: "123e4567-e89b-12d3-a456-426614174005",
                name: "Small",
            },
        });
        const size2 = yield prisma.size.create({
            data: {
                id: "123e4567-e89b-12d3-a456-426614174006",
                name: "Medium",
            },
        });
        // Create colors
        const color1 = yield prisma.color.create({
            data: {
                id: "123e4567-e89b-12d3-a456-426614174007",
                name: "Red",
            },
        });
        const color2 = yield prisma.color.create({
            data: {
                id: "123e4567-e89b-12d3-a456-426614174008",
                name: "Blue",
            },
        });
        // Create types
        const type1 = yield prisma.type.create({
            data: {
                id: "123e4567-e89b-12d3-a456-426614174009",
                name: "Outdoor",
            },
        });
        const type2 = yield prisma.type.create({
            data: {
                id: "123e4567-e89b-12d3-a456-426614174010",
                name: "Indoor",
            },
        });
        // Associate products with sizes
        yield prisma.productOnSize.createMany({
            data: [
                { productId: product1.id, sizeId: size1.id },
                { productId: product1.id, sizeId: size2.id },
                { productId: product2.id, sizeId: size2.id },
            ],
        });
        // Associate products with colors
        yield prisma.productOnColor.createMany({
            data: [
                { productId: product1.id, colorId: color1.id },
                { productId: product2.id, colorId: color2.id },
            ],
        });
        // Associate products with types
        yield prisma.productOnType.createMany({
            data: [
                { productId: product1.id, typeId: type1.id },
                { productId: product2.id, typeId: type2.id },
            ],
        });
        // Create order
        const order1 = yield prisma.order.create({
            data: {
                id: "123e4567-e89b-12d3-a456-426614174011",
                userId: user1.id,
                total: 79.98,
                status: "PENDING",
                items: {
                    create: [
                        {
                            id: "123e4567-e89b-12d3-a456-426614174012",
                            productId: product1.id,
                            quantity: 1,
                            price: 29.99,
                        },
                        {
                            id: "123e4567-e89b-12d3-a456-426614174013",
                            productId: product2.id,
                            quantity: 1,
                            price: 49.99,
                        },
                    ],
                },
            },
        });
        console.log("Seeding completed");
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
