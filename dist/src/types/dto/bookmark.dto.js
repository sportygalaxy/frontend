"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookmarkSchema = exports.createBookmarkSchema = exports.getBookmarkSchema = exports.getBookmarksSchema = void 0;
const zod_1 = require("zod");
exports.getBookmarksSchema = zod_1.z.object({});
exports.getBookmarkSchema = zod_1.z.object({});
exports.createBookmarkSchema = zod_1.z.object({
    userId: zod_1.z.string().uuid(),
    productId: zod_1.z.string().uuid(),
});
exports.deleteBookmarkSchema = zod_1.z.object({
    userId: zod_1.z.string().uuid(),
    productId: zod_1.z.string().uuid(),
});
