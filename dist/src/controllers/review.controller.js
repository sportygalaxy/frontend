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
exports.deleteReview = exports.updateReview = exports.createReview = exports.getReview = exports.getReviews = void 0;
const review_service_1 = require("../services/review.service");
const async_1 = require("../middleware/async");
const reviewService = new review_service_1.ReviewService();
exports.getReviews = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const reviews = yield reviewService.getReviews(query, next);
    if (!reviews)
        return;
    res.status(200).json({
        message: "Fetch product reviews successfully",
        data: reviews,
        success: !!reviews,
    });
}));
exports.getReview = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const review = yield reviewService.getReview(id, next);
    if (!review)
        return;
    res.status(200).json({
        message: "Fetch product review successfully",
        data: review,
        success: !!review,
    });
}));
exports.createReview = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield reviewService.createReview(Object.assign({}, req.body), next);
    if (!review)
        return;
    res.status(201).json({
        message: "Product review created successfully",
        data: review,
        success: !!review,
    });
}));
exports.updateReview = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const review = yield reviewService.updateReview(id, {
        rating,
        comment,
    }, next);
    if (!review)
        return;
    res.status(201).json({
        message: "Product review updated successfully",
        data: review,
        success: !!review,
    });
}));
exports.deleteReview = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield reviewService.deleteReview({ id }, next);
    res.status(200).json({
        message: "Product review deleted successfully",
        data: null,
        success: true,
    });
}));
