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
exports.deleteProductSubcategory = exports.updateProductSubcategory = exports.createProductSubcategory = exports.getProductSubcategory = exports.getProductSubcategories = void 0;
const product_subcategory_service_1 = require("../services/product-subcategory.service");
const async_1 = require("../middleware/async");
const productSubcategoryService = new product_subcategory_service_1.ProductSubcategoryService();
exports.getProductSubcategories = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const productSubcategories = yield productSubcategoryService.getProductSubcategories(query, next);
    if (!productSubcategories)
        return;
    res.status(200).json({
        message: "Fetch product categories successfully",
        data: productSubcategories,
        success: !!productSubcategories,
    });
}));
exports.getProductSubcategory = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const productSubcategory = yield productSubcategoryService.getProductSubcategory(id, next);
    if (!productSubcategory)
        return;
    res.status(200).json({
        message: "Fetch product subcategory successfully",
        data: productSubcategory,
        success: !!productSubcategory,
    });
}));
exports.createProductSubcategory = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productSubcategory = yield productSubcategoryService.createProductSubcategory(Object.assign({}, req.body), next);
    if (!productSubcategory)
        return;
    res.status(201).json({
        message: "Product subcategory created successfully",
        data: productSubcategory,
        success: !!productSubcategory,
    });
}));
exports.updateProductSubcategory = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description, categoryId } = req.body;
    const productSubcategory = yield productSubcategoryService.updateProductSubcategory(id, {
        name,
        description,
        categoryId
    }, next);
    if (!productSubcategory)
        return;
    res.status(201).json({
        message: "Product subcategory updated successfully",
        data: productSubcategory,
        success: !!productSubcategory,
    });
}));
exports.deleteProductSubcategory = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield productSubcategoryService.deleteProductSubcategory({ id }, next);
    res.status(200).json({
        message: "Product subcategory deleted successfully",
        data: null,
        success: true,
    });
}));
