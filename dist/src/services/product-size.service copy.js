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
exports.ProductSizeService = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const constants_1 = require("../constants");
const errorResponse_1 = require("../utils/errorResponse");
const validation_1 = require("../helpers/validation");
const product_size_dto_1 = require("../types/dto/product-size.dto");
class ProductSizeService {
    /**
     *
     * @param _query
     * @param _next
     * @returns products size list
     */
    getProductSizes(_query, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productSizes = yield prisma_1.default.size.findMany({
                    where: Object.assign({}, (_query && _query)),
                });
                if (!productSizes) {
                    return _next(new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_SIZE_NOT_FOUND, constants_1.HTTP_STATUS_CODE[400].code));
                }
                return productSizes;
            }
            catch (err) {
                _next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_SIZE_GETS_FOUND, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
    /**
     *
     * @param _id sizeId
     * @param _next
     * @returns product size details
     */
    getProductSize(_id, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productSize = yield prisma_1.default.size.findUnique({
                    where: { id: _id },
                    include: {},
                });
                if (!productSize) {
                    return _next(new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_SIZE_NOT_FOUND, constants_1.HTTP_STATUS_CODE[400].code));
                }
                return productSize;
            }
            catch (err) {
                _next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_SIZE_GETS_FOUND, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
    /**
     *
     * @param _payload name
     * @param _next
     * @returns product
     */
    createProductSize(_payload, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateProductSize = (productSize) => (0, validation_1.validateData)(product_size_dto_1.createProductSizeSchema, productSize);
            const { name } = _payload;
            try {
                validateProductSize(_payload);
                const productSize = yield prisma_1.default.size.create({
                    data: {
                        name,
                    },
                    include: {},
                });
                if (!productSize) {
                    throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_SIZE_CREATE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
                }
                return productSize;
            }
            catch (err) {
                _next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_SIZE_CREATE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
    /**
     *
     * @param _id productId
     * @param _payload  name
     * @param _next
     * @returns product
     */
    updateProductSize(_id, _payload, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = _payload;
            try {
                yield this.getProductSize(_id, _next);
                const updatedProductSize = yield prisma_1.default.size.update({
                    where: { id: _id },
                    data: Object.assign({}, (name && { name })),
                });
                if (!updatedProductSize) {
                    throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_SIZE_UPDATE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
                }
                return updatedProductSize;
            }
            catch (err) {
                _next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_SIZE_UPDATE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
    deleteProductSize(_dto, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: _id } = _dto;
            try {
                yield prisma_1.default.size.delete({
                    where: { id: _id },
                });
                return null;
            }
            catch (err) {
                _next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_SIZE_DELETE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
}
exports.ProductSizeService = ProductSizeService;
