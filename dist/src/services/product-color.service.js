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
exports.ProductColorService = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const constants_1 = require("../constants");
const errorResponse_1 = require("../utils/errorResponse");
const validation_1 = require("../helpers/validation");
const product_color_dto_1 = require("../types/dto/product-color.dto");
class ProductColorService {
    /**
     *
     * @param _query
     * @param _next
     * @returns products color list
     */
    getProductColors(_query, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productColors = yield prisma_1.default.color.findMany({
                    where: Object.assign({}, (_query && _query)),
                });
                if (!productColors) {
                    return _next(new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_COLOR_NOT_FOUND, constants_1.HTTP_STATUS_CODE[400].code));
                }
                return productColors;
            }
            catch (err) {
                _next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_COLOR_GETS_FOUND, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
    /**
     *
     * @param _id colorId
     * @param _next
     * @returns product color details
     */
    getProductColor(_id, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productColor = yield prisma_1.default.color.findUnique({
                    where: { id: _id },
                    include: {},
                });
                if (!productColor) {
                    return _next(new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_COLOR_NOT_FOUND, constants_1.HTTP_STATUS_CODE[400].code));
                }
                return productColor;
            }
            catch (err) {
                _next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_COLOR_GETS_FOUND, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
    /**
     *
     * @param _payload name
     * @param _next
     * @returns product
     */
    createProductColor(_payload, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateProductColor = (productColor) => (0, validation_1.validateData)(product_color_dto_1.createProductColorSchema, productColor);
            const { name } = _payload;
            try {
                validateProductColor(_payload);
                const productColor = yield prisma_1.default.color.create({
                    data: {
                        name,
                    },
                    include: {},
                });
                if (!productColor) {
                    throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_COLOR_CREATE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
                }
                return productColor;
            }
            catch (err) {
                _next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_COLOR_CREATE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
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
    updateProductColor(_id, _payload, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = _payload;
            try {
                yield this.getProductColor(_id, _next);
                const updatedProductColor = yield prisma_1.default.color.update({
                    where: { id: _id },
                    data: Object.assign({}, (name && { name })),
                });
                if (!updatedProductColor) {
                    throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_COLOR_UPDATE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
                }
                return updatedProductColor;
            }
            catch (err) {
                _next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_COLOR_UPDATE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
    deleteProductColor(_dto, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: _id } = _dto;
            try {
                yield prisma_1.default.color.delete({
                    where: { id: _id },
                });
                return null;
            }
            catch (err) {
                _next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.PRODUCT_COLOR_DELETE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
}
exports.ProductColorService = ProductColorService;
