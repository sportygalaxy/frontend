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
exports.ProductSubcategoryService = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const constants_1 = require("../constants");
const errorResponse_1 = require("../utils/errorResponse");
const validation_1 = require("../helpers/validation");
const product_subcategory_dto_1 = require("../types/dto/product-subcategory.dto");
class ProductSubcategoryService {
    /**
     *
     * @param _query
     * @param _next
     * @returns products subcategory list
     */
    getProductSubcategories(_query, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productSubcategories = yield prisma_1.default.subcategory.findMany({
                    where: Object.assign({}, (_query && _query)),
                });
                if (!productSubcategories) {
                    return _next(new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_SUB_CATEGORY_NOT_FOUND, constants_1.HTTP_STATUS_CODE[400].code));
                }
                return productSubcategories;
            }
            catch (err) {
                _next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_SUB_CATEGORY_GETS_FOUND, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
    /**
     *
     * @param _id subcategoryId
     * @param _next
     * @returns product subcategory details
     */
    getProductSubcategory(_id, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productSubcategory = yield prisma_1.default.subcategory.findUnique({
                    where: { id: _id },
                    include: {},
                });
                if (!productSubcategory) {
                    return _next(new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_SUB_CATEGORY_NOT_FOUND, constants_1.HTTP_STATUS_CODE[400].code));
                }
                return productSubcategory;
            }
            catch (err) {
                _next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_SUB_CATEGORY_GETS_FOUND, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
    /**
     *
     * @param _payload name
     * @param _next
     * @returns subcategory
     */
    createProductSubcategory(_payload, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateProductSubcategory = (productSubcategory) => (0, validation_1.validateData)(product_subcategory_dto_1.createProductSubcategorySchema, productSubcategory);
            const { name, description, categoryId } = _payload;
            try {
                validateProductSubcategory(_payload);
                const productSubcategory = yield prisma_1.default.subcategory.create({
                    data: Object.assign({ name,
                        categoryId }, (description && { description })),
                    include: {},
                });
                if (!productSubcategory) {
                    throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_SUB_CATEGORY_CREATE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
                }
                return productSubcategory;
            }
            catch (err) {
                _next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_SUB_CATEGORY_CREATE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
    /**
     *
     * @param _id subcategoryId
     * @param _payload  name, description
     * @param _next
     * @returns product
     */
    updateProductSubcategory(_id, _payload, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, categoryId } = _payload;
            try {
                yield this.getProductSubcategory(_id, _next);
                const updatedProductSubcategory = yield prisma_1.default.subcategory.update({
                    where: { id: _id },
                    data: Object.assign(Object.assign(Object.assign({}, (categoryId && { categoryId })), (name && { name })), (description && { description })),
                });
                if (!updatedProductSubcategory) {
                    throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_SUB_CATEGORY_UPDATE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
                }
                return updatedProductSubcategory;
            }
            catch (err) {
                _next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_SUB_CATEGORY_UPDATE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
    deleteProductSubcategory(_dto, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: _id } = _dto;
            try {
                yield prisma_1.default.subcategory.delete({
                    where: { id: _id },
                });
                return null;
            }
            catch (err) {
                _next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_SUB_CATEGORY_DELETE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
}
exports.ProductSubcategoryService = ProductSubcategoryService;
