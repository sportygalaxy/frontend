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
exports.ReviewService = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const constants_1 = require("../constants");
const errorResponse_1 = require("../utils/errorResponse");
const validation_1 = require("../helpers/validation");
const review_dto_1 = require("../types/dto/review.dto");
class ReviewService {
    /**
     *
     * @param _query
     * @param _next
     * @returns products review list
     */
    getReviews(_query, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reviews = yield prisma_1.default.review.findMany({
                    where: Object.assign({}, (_query && _query)),
                });
                if (!reviews) {
                    return _next(new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.REVIEW_NOT_FOUND, constants_1.HTTP_STATUS_CODE[400].code));
                }
                return reviews;
            }
            catch (err) {
                _next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.REVIEW_GETS_FOUND, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
    /**
     *
     * @param _id reviewId
     * @param _next
     * @returns review review details
     */
    getReview(_id, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const review = yield prisma_1.default.review.findUnique({
                    where: { id: _id },
                    include: {},
                });
                if (!review) {
                    return _next(new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.REVIEW_NOT_FOUND, constants_1.HTTP_STATUS_CODE[400].code));
                }
                return review;
            }
            catch (err) {
                _next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.REVIEW_GETS_FOUND, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
    /**
     *
     * @param _payload rating, comment
     * @param _next
     * @returns review
     */
    createReview(_payload, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateReview = (review) => (0, validation_1.validateData)(review_dto_1.createReviewSchema, review);
            const { userId, productId, rating, comment } = _payload;
            const reviewExist = yield prisma_1.default.review.findMany({
                where: {
                    AND: [{ userId }, { productId }],
                },
            });
            if (reviewExist.length >= 1) {
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.REVIEW_ALREADY_EXIST_FOUND, constants_1.HTTP_STATUS_CODE[400].code);
            }
            try {
                validateReview(_payload);
                const review = yield prisma_1.default.review.create({
                    data: {
                        userId,
                        productId,
                        rating,
                        comment,
                    },
                    include: {},
                });
                if (!review) {
                    throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.REVIEW_CREATE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
                }
                return review;
            }
            catch (err) {
                _next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.REVIEW_CREATE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
    /**
     *
     * @param _id reviewId
     * @param _payload  name
     * @param _next
     * @returns review
     */
    updateReview(_id, _payload, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rating, comment } = _payload;
            try {
                yield this.getReview(_id, _next);
                const updatedReview = yield prisma_1.default.review.update({
                    where: { id: _id },
                    data: Object.assign(Object.assign({}, (rating && { rating })), (comment && { comment })),
                });
                if (!updatedReview) {
                    throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.REVIEW_UPDATE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
                }
                return updatedReview;
            }
            catch (err) {
                _next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.REVIEW_UPDATE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
    deleteReview(_dto, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: _id } = _dto;
            try {
                yield prisma_1.default.review.delete({
                    where: { id: _id },
                });
                return null;
            }
            catch (err) {
                _next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.REVIEW_DELETE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
}
exports.ReviewService = ReviewService;
