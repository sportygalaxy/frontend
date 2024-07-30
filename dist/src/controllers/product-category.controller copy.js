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
exports.deleteProductCategory = exports.updateProductCategory = exports.createProductCategory = exports.getProductCategory = exports.getProductCategories = void 0;
const product_category_service_1 = require("../services/product-category.service");
const async_1 = require("../middleware/async");
const productCategoryService = new product_category_service_1.ProductCategoryService();
exports.getProductCategories = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const productCategories = yield productCategoryService.getProductCategories(query, next);
    if (!productCategories)
        return;
    res.status(200).json({
        message: "Fetch product categories successfully",
        data: productCategories,
        success: !!productCategories,
    });
}));
exports.getProductCategory = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const productCategory = yield productCategoryService.getProductCategory(id, next);
    if (!productCategory)
        return;
    res.status(200).json({
        message: "Fetch product category successfully",
        data: productCategory,
        success: !!productCategory,
    });
}));
exports.createProductCategory = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productCategory = yield productCategoryService.createProductCategory(Object.assign({}, req.body), next);
    if (!productCategory)
        return;
    res.status(201).json({
        message: "Product category created successfully",
        data: productCategory,
        success: !!productCategory,
    });
}));
exports.updateProductCategory = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description } = req.body;
    const productCategory = yield productCategoryService.updateProductCategory(id, {
        name,
        description
    }, next);
    if (!productCategory)
        return;
    res.status(201).json({
        message: "Product category updated successfully",
        data: productCategory,
        success: !!productCategory,
    });
}));
exports.deleteProductCategory = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield productCategoryService.deleteProductCategory({ id }, next);
    res.status(200).json({
        message: "Product category deleted successfully",
        data: null,
        success: true,
    });
}));
