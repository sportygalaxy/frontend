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
exports.deleteProductSize = exports.updateProductSize = exports.createProductSize = exports.getProductSize = exports.getProductSizes = exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProduct = exports.getProducts = void 0;
const product_service_1 = require("../services/product.service");
const product_size_service_1 = require("../services/product-size.service");
const async_1 = require("../middleware/async");
const productService = new product_service_1.ProductService();
const productSizeService = new product_size_service_1.ProductSizeService();
exports.getProducts = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const products = yield productService.getProducts(query, next);
    if (!products)
        return;
    res.status(200).json({
        message: "Fetch products successfully",
        data: products,
        success: !!products,
    });
}));
exports.getProduct = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const product = yield productService.getProduct(id, next);
    if (!product)
        return;
    res.status(200).json({
        message: "Fetch product successfully",
        data: product,
        success: !!product,
    });
}));
exports.createProduct = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield productService.createProduct(Object.assign({}, req.body), next);
    if (!product)
        return;
    res.status(201).json({
        message: "Product created successfully",
        data: product,
        success: !!product,
    });
}));
exports.updateProduct = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description, price, stock, categoryId, subcategoryId, sizeIds, colorIds, typeIds, } = req.body;
    const [details, attribute] = yield Promise.all([
        productService.updateProduct(id, {
            name,
            description,
            price,
            stock,
            categoryId,
            subcategoryId,
        }, next),
        productService.updateProductAttributes(id, {
            sizeIds,
            colorIds,
            typeIds,
        }, next),
    ]);
    if (!details || !attribute)
        return;
    const result = { details, attribute };
    res.status(201).json({
        message: "Product updated successfully",
        data: result,
        success: !!result,
    });
}));
exports.deleteProduct = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield productService.deleteProduct({ id }, next);
    res.status(200).json({
        message: "Product deleted successfully",
        data: null,
        success: true,
    });
}));
exports.getProductSizes = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const productSizes = yield productSizeService.getProductSizes(query, next);
    if (!productSizes)
        return;
    res.status(200).json({
        message: "Fetch product sizes successfully",
        data: productSizes,
        success: !!productSizes,
    });
}));
exports.getProductSize = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const productSize = yield productSizeService.getProductSize(id, next);
    if (!productSize)
        return;
    res.status(200).json({
        message: "Fetch product size successfully",
        data: productSize,
        success: !!productSize,
    });
}));
exports.createProductSize = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productSize = yield productSizeService.createProductSize(Object.assign({}, req.body), next);
    if (!productSize)
        return;
    res.status(201).json({
        message: "Product size created successfully",
        data: productSize,
        success: !!productSize,
    });
}));
exports.updateProductSize = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name } = req.body;
    const productSize = yield productSizeService.updateProductSize(id, {
        name,
    }, next);
    if (!productSize)
        return;
    res.status(201).json({
        message: "Product size updated successfully",
        data: productSize,
        success: !!productSize,
    });
}));
exports.deleteProductSize = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield productSizeService.deleteProductSize({ id }, next);
    res.status(200).json({
        message: "Product deleted successfully",
        data: null,
        success: true,
    });
}));
