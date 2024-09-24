"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSizeSchema = exports.updateProductSchema = exports.updateAllProductSchema = exports.createProductSchema = exports.MediasSchema = exports.getProductSchema = exports.getProductsSchema = void 0;
const zod_1 = require("zod");
exports.getProductsSchema = zod_1.z.object({});
exports.getProductSchema = zod_1.z.object({});
const keyValuePairSchema = zod_1.z
    .record(zod_1.z.string().optional().nullable())
    .optional()
    .nullable();
exports.MediasSchema = zod_1.z.array(zod_1.z.union([
    zod_1.z.object({
        type: zod_1.z.literal("image"),
        images: zod_1.z.array(zod_1.z.string().url()),
    }),
    zod_1.z.object({
        type: zod_1.z.literal("video"),
        displayImage: zod_1.z.string().url(),
        links: zod_1.z.object({
            introVideo: zod_1.z.string().url(),
            completeVideo: zod_1.z.string().url(),
        }),
    }),
]));
exports.createProductSchema = zod_1.z.object({
    id: zod_1.z.string().uuid().optional(),
    name: zod_1.z.string(),
    description: zod_1.z.string().optional().nullable(),
    price: zod_1.z.number(),
    stock: zod_1.z.number().optional().nullable(),
    displayImage: zod_1.z.string().optional().nullable(),
    medias: exports.MediasSchema,
    specification: zod_1.z.array(keyValuePairSchema).optional().nullable(),
    keyattribute: zod_1.z.array(keyValuePairSchema).optional().nullable(),
    categoryId: zod_1.z.string(),
    subcategoryId: zod_1.z.string(),
    sizeIds: zod_1.z.array(zod_1.z.string()).nullable().optional(),
    colorIds: zod_1.z.array(zod_1.z.string()).nullable().optional(),
    typeIds: zod_1.z.array(zod_1.z.string()).nullable().optional(),
    createdAt: zod_1.z
        .date()
        .optional()
        .default(() => new Date()),
    updatedAt: zod_1.z.date().optional(),
    deletedAt: zod_1.z.date().optional().nullable(),
});
exports.updateAllProductSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    price: zod_1.z.number().optional(),
    stock: zod_1.z.number().optional(),
    displayImage: zod_1.z.string().optional(),
    medias: zod_1.z.array(keyValuePairSchema).optional().nullable(),
    specification: zod_1.z.array(keyValuePairSchema).optional().nullable(),
    keyattribute: zod_1.z.array(keyValuePairSchema).optional().nullable(),
    categoryId: zod_1.z.string().optional(),
    subcategoryId: zod_1.z.string().optional(),
    sizeIds: zod_1.z.array(zod_1.z.string()).optional(),
    colorIds: zod_1.z.array(zod_1.z.string()).optional(),
    typeIds: zod_1.z.array(zod_1.z.string()).optional(),
});
exports.updateProductSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    price: zod_1.z.number().optional(),
    stock: zod_1.z.number().optional(),
    displayImage: zod_1.z.string().optional(),
    medias: zod_1.z.array(keyValuePairSchema).optional().nullable(),
    specification: zod_1.z.array(keyValuePairSchema).optional().nullable(),
    keyattribute: zod_1.z.array(keyValuePairSchema).optional().nullable(),
    categoryId: zod_1.z.string().optional(),
    subcategoryId: zod_1.z.string().optional(),
});
exports.updateProductSizeSchema = zod_1.z.object({
    sizeIds: zod_1.z.array(zod_1.z.string()).optional(),
});
