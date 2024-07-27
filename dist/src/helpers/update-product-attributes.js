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
 *
 * @param _id productId
 * @param attribute size | color | type
 * @param ids sizeIds[] | colorIds[] | typeIds[]
 * @param _next
 * @returns A Facade to update size, color, type
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
            for (const id of ids) {
                const whereClause = {
                    [`productId_${attribute}Id`]: {
                        productId: _id,
                        [`${attribute}Id`]: id,
                    },
                };
                const productOnAttribute = yield prismaModel.findUnique({
                    where: whereClause,
                });
                if (!productOnAttribute) {
                    throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_NOT_FOUND, constants_1.HTTP_STATUS_CODE[400].code);
                }
                const updatedProductOnAttribute = yield prismaModel.update({
                    where: whereClause,
                    data: {
                        [`${attribute}Id`]: id,
                    },
                });
                if (!updatedProductOnAttribute) {
                    throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_UPDATE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
                }
                updatedProducts.push(updatedProductOnAttribute);
            }
            return updatedProducts;
        }
        catch (err) {
            _next(err);
            throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_UPDATE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
        }
    });
}
