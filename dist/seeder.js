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
const crypto_1 = require("crypto");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Create some users
        const user1 = yield prisma.user.create({
            data: {
                id: (0, crypto_1.randomUUID)(),
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com",
                password: "password",
                phone: "1234567890",
                address: "123 Main St",
            },
        });
        const user2 = yield prisma.user.create({
            data: {
                id: (0, crypto_1.randomUUID)(),
                firstName: "Jane",
                lastName: "Smith",
                email: "jane.smith@example.com",
                password: "password",
                phone: "0987654321",
                address: "456 Main St",
            },
        });
        // Create some categories
        const category1 = yield prisma.category.create({
            data: {
                id: (0, crypto_1.randomUUID)(),
                name: "Sports Equipment",
                description: "Various sports equipment",
            },
        });
        const category2 = yield prisma.category.create({
            data: {
                id: (0, crypto_1.randomUUID)(),
                name: "Apparel",
                description: "Sportswear and apparel",
            },
        });
        // Create some subcategories
        const subcategory1 = yield prisma.subcategory.create({
            data: {
                id: (0, crypto_1.randomUUID)(),
                name: "Basketball",
                description: "Basketball equipment",
                categoryId: category1.id,
            },
        });
        const subcategory2 = yield prisma.subcategory.create({
            data: {
                id: (0, crypto_1.randomUUID)(),
                name: "Running",
                description: "Running gear and accessories",
                categoryId: category2.id,
            },
        });
        // Create some products
        const product1 = yield prisma.product.create({
            data: {
                id: (0, crypto_1.randomUUID)(),
                name: "Basketball",
                description: "A high-quality basketball",
                price: 29.99,
                stock: 100,
                categoryId: category1.id,
                subcategoryId: subcategory1.id,
            },
        });
        const product2 = yield prisma.product.create({
            data: {
                id: (0, crypto_1.randomUUID)(),
                name: "Running Shoes",
                description: "Comfortable running shoes",
                price: 49.99,
                stock: 50,
                categoryId: category2.id,
                subcategoryId: subcategory2.id,
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
