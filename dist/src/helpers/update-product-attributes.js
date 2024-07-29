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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductAttribute = updateProductAttribute;
const constants_1 = require("../constants");
const prisma_1 = __importDefault(require("../lib/prisma"));
const utils_1 = require("../utils");
const errorResponse_1 = require("../utils/errorResponse");
/**
 * Updates product attribute relationships for a given attribute type.
 *
 * @param _id - The product ID.
 * @param attribute - The attribute type (size, color, type).
 * @param ids - An array of IDs corresponding to the attribute type.
 * @param _next - The next function for error handling.
 * @returns A promise that resolves to an array of updated product attributes.
 */
function updateProductAttribute(_id, attribute, ids, _next) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedProducts = [];
        const modelName = `productOn${(0, utils_1.capitalizeFirstLetter)(attribute)}`;
        const prismaModel = prisma_1.default[modelName];
        if (!prismaModel) {
            throw new Error(`Model ${modelName} not found in Prisma client.`);
        }
        try {
            // Find all existing relations for the product
            const existingRelations = yield prismaModel.findMany({
                where: {
                    productId: _id,
                },
            });
            const existingIds = new Set(existingRelations === null || existingRelations === void 0 ? void 0 : existingRelations.map((relation) => relation[`${attribute}Id`]));
            // Remove relations not in the new IDs
            const idsToRemove = [...existingIds].filter((existingId) => !ids.includes(existingId));
            yield prismaModel.deleteMany({
                where: {
                    productId: _id,
                    [`${attribute}Id`]: { in: idsToRemove },
                },
            });
            // Create or update relations for IDs in the new array
            for (const id of ids) {
                if (!existingIds.has(id)) {
                    const createdProductOnAttribute = yield prismaModel.create({
                        data: {
                            productId: _id,
                            [`${attribute}Id`]: id,
                        },
                    });
                    updatedProducts.push(createdProductOnAttribute);
                }
                else {
                    const updatedProductOnAttribute = yield prismaModel.update({
                        where: {
                            [`productId_${attribute}Id`]: {
                                productId: _id,
                                [`${attribute}Id`]: id,
                            },
                        },
                        data: {
                            [`${attribute}Id`]: id,
                        },
                    });
                    updatedProducts.push(updatedProductOnAttribute);
                }
            }
            return updatedProducts;
        }
        catch (err) {
            _next(err);
            throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_UPDATE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
        }
    });
}
