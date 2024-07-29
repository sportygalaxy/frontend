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
exports.ProductService = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const constants_1 = require("../constants");
const errorResponse_1 = require("../utils/errorResponse");
const product_dto_1 = require("../types/dto/product.dto");
const validation_1 = require("../helpers/validation");
const update_product_attributes_1 = require("../helpers/update-product-attributes");
class ProductService {
    /**
     *
     * @param _query
     * @param _next
     * @returns products list
     */
    getProducts(_query, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield prisma_1.default.product.findMany({
                    where: Object.assign({}, (_query && _query)),
                });
                if (!products) {
                    return _next(new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_NOT_FOUND, constants_1.HTTP_STATUS_CODE[400].code));
                }
                return products;
            }
            catch (err) {
                _next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_GETS_FOUND, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
    /**
     *
     * @param _id productId
     * @param _next
     * @returns product details
     */
    getProduct(_id, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield prisma_1.default.product.findUnique({
                    where: { id: _id },
                    include: {
                        category: true,
                        subcategory: true,
                        sizes: {
                            select: {
                                size: {
                                    select: {
                                        id: true,
                                        name: true,
                                    },
                                },
                            },
                        },
                        colors: {
                            select: {
                                color: {
                                    select: {
                                        id: true,
                                        name: true,
                                    },
                                },
                            },
                        },
                        types: {
                            select: {
                                type: {
                                    select: {
                                        id: true,
                                        name: true,
                                    },
                                },
                            },
                        },
                        orders: true,
                    },
                });
                if (!product) {
                    return _next(new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_NOT_FOUND, constants_1.HTTP_STATUS_CODE[400].code));
                }
                return product;
            }
            catch (err) {
                _next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_GETS_FOUND, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
    /**
     *
     * @param _payload name, description, price, stock, categoryId, subcategoryId, sizeIds, colorIds, typeIds,
     * @param _next
     * @returns product
     */
    createProduct(_payload, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateProduct = (product) => (0, validation_1.validateData)(product_dto_1.createProductSchema, product);
            const { name, description, price, stock, categoryId, subcategoryId, sizeIds, colorIds, typeIds, } = _payload;
            try {
                validateProduct(_payload);
                const product = yield prisma_1.default.product.create({
                    data: {
                        name,
                        description,
                        price,
                        stock,
                        categoryId,
                        subcategoryId,
                        sizes: {
                            create: sizeIds === null || sizeIds === void 0 ? void 0 : sizeIds.map((sizeId) => ({ sizeId })),
                        },
                        colors: {
                            create: colorIds === null || colorIds === void 0 ? void 0 : colorIds.map((colorId) => ({ colorId })),
                        },
                        types: {
                            create: typeIds === null || typeIds === void 0 ? void 0 : typeIds.map((typeId) => ({ typeId })),
                        },
                    },
                    include: {
                        category: true,
                        subcategory: true,
                        sizes: true,
                        colors: true,
                        types: true,
                        orders: true,
                    },
                });
                if (!product) {
                    throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_CREATE_FAILED, constants_1.HTTP_STATUS_CODE[500].code);
                }
                return product;
            }
            catch (err) {
                _next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_CREATE_FAILED, constants_1.HTTP_STATUS_CODE[500].code);
            }
        });
    }
    /**
     *
     * @param _id productId
     * @param _payload  name, description, price, stock, categoryId, subcategoryId,
     * @param _next
     * @returns product
     */
    updateProduct(_id, _payload, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, price, stock, categoryId, subcategoryId } = _payload;
            try {
                const updatedProduct = yield prisma_1.default.product.update({
                    where: { id: _id },
                    data: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (name && { name })), (description && { description })), (price && { price })), (stock && { stock })), (categoryId && {
                        category: {
                            connect: {
                                id: categoryId,
                            },
                        },
                    })), (subcategoryId && {
                        subcategory: {
                            connect: {
                                id: subcategoryId,
                            },
                        },
                    })),
                });
                if (!updatedProduct) {
                    throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_UPDATE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
                }
                return updatedProduct;
            }
            catch (err) {
                _next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_UPDATE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
    /**
     *
     * @param _id productId
     * @param _payload sizeIds[]
     * @param _next
     * @returns
     */
    updateProductSize(_id, _payload, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sizeIds = [] } = _payload;
            const updatedProducts = [];
            try {
                for (const sizeId of sizeIds) {
                    const productOnSize = yield prisma_1.default.productOnSize.findUnique({
                        where: {
                            productId_sizeId: {
                                productId: _id,
                                sizeId: sizeId,
                            },
                        },
                    });
                    if (!productOnSize) {
                        throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_NOT_FOUND, constants_1.HTTP_STATUS_CODE[400].code);
                    }
                    const updatedProductOnSize = yield prisma_1.default.productOnSize.update({
                        where: {
                            productId_sizeId: {
                                productId: _id,
                                sizeId: sizeId,
                            },
                        },
                        data: {
                            sizeId: sizeId,
                        },
                    });
                    if (!updatedProductOnSize) {
                        throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_UPDATE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
                    }
                    updatedProducts.push(updatedProductOnSize);
                }
                return updatedProducts;
            }
            catch (err) {
                _next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_UPDATE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
    /**
     *
     * @param _id productId
     * @param _payload sizeIds[] | colorIds[] | typeIds[]
     * @param _next
     * @returns
     */
    updateProductAttributes(_id, _payload, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sizeIds = [], colorIds = [], typeIds = [] } = _payload;
            let updatedProducts = [];
            try {
                if (sizeIds.length > 0) {
                    const updatedSizes = yield (0, update_product_attributes_1.updateProductAttribute)(_id, "size", sizeIds, _next);
                    updatedProducts = updatedProducts.concat(updatedSizes);
                }
                if (colorIds.length > 0) {
                    const updatedColors = yield (0, update_product_attributes_1.updateProductAttribute)(_id, "color", colorIds, _next);
                    updatedProducts = updatedProducts.concat(updatedColors);
                }
                if (typeIds.length > 0) {
                    const updatedTypes = yield (0, update_product_attributes_1.updateProductAttribute)(_id, "type", typeIds, _next);
                    updatedProducts = updatedProducts.concat(updatedTypes);
                }
                return updatedProducts;
            }
            catch (err) {
                _next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_UPDATE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
    deleteProduct(_dto, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: _id } = _dto;
            try {
                yield prisma_1.default.product.delete({
                    where: { id: _id },
                });
                return null;
            }
            catch (err) {
                _next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_DELETE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
}
exports.ProductService = ProductService;
