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
exports.deleteProductColor = exports.updateProductColor = exports.createProductColor = exports.getProductColor = exports.getProductColors = void 0;
const product_color_service_1 = require("../services/product-color.service");
const async_1 = require("../middleware/async");
const productColorService = new product_color_service_1.ProductColorService();
exports.getProductColors = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const productColors = yield productColorService.getProductColors(query, next);
    if (!productColors)
        return;
    res.status(200).json({
        message: "Fetch product colors successfully",
        data: productColors,
        success: !!productColors,
    });
}));
exports.getProductColor = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const productColor = yield productColorService.getProductColor(id, next);
    if (!productColor)
        return;
    res.status(200).json({
        message: "Fetch product color successfully",
        data: productColor,
        success: !!productColor,
    });
}));
exports.createProductColor = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productColor = yield productColorService.createProductColor(Object.assign({}, req.body), next);
    if (!productColor)
        return;
    res.status(201).json({
        message: "Product color created successfully",
        data: productColor,
        success: !!productColor,
    });
}));
exports.updateProductColor = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name } = req.body;
    const productColor = yield productColorService.updateProductColor(id, {
        name,
    }, next);
    if (!productColor)
        return;
    res.status(201).json({
        message: "Product color updated successfully",
        data: productColor,
        success: !!productColor,
    });
}));
exports.deleteProductColor = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield productColorService.deleteProductColor({ id }, next);
    res.status(200).json({
        message: "Product color deleted successfully",
        data: null,
        success: true,
    });
}));
