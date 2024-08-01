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
exports.BookmarkService = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const constants_1 = require("../constants");
const errorResponse_1 = require("../utils/errorResponse");
const bookmark_dto_1 = require("../types/dto/bookmark.dto");
const validation_1 = require("../helpers/validation");
class BookmarkService {
    /**
     *
     * @param userId
     * @param productId
     * @param next
     * @returns
     */
    createBookmark(userId, productId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateBookmark = (bookmark) => (0, validation_1.validateData)(bookmark_dto_1.createBookmarkSchema, bookmark);
            const param = {
                userId,
                productId,
            };
            try {
                validateBookmark(param);
                const existingBookmark = yield prisma_1.default.bookmark.findUnique({
                    where: {
                        userId_productId: {
                            userId,
                            productId,
                        },
                    },
                });
                if (existingBookmark) {
                    throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.BOOKMARK_ALREADY_EXIST_FOUND, constants_1.HTTP_STATUS_CODE[400].code);
                }
                const bookmark = yield prisma_1.default.bookmark.create({
                    data: {
                        userId,
                        productId,
                    },
                });
                return bookmark;
            }
            catch (err) {
                next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.BOOKMARK_CREATE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
    /**
     *
     * @param query
     * @param next
     * @returns bookmark details
     */
    getBookmarks(query, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookmarks = yield prisma_1.default.bookmark.findMany({
                    where: Object.assign({}, (query && query)),
                    include: { product: true },
                });
                if (!bookmarks) {
                    throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.BOOKMARK_NOT_FOUND, constants_1.HTTP_STATUS_CODE[400].code);
                }
                return bookmarks;
            }
            catch (err) {
                next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.BOOKMARK_GETS_FOUND, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
    deleteBookmark(_dto, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, productId } = _dto;
            const validateBookmark = (bookmark) => (0, validation_1.validateData)(bookmark_dto_1.createBookmarkSchema, bookmark);
            const param = {
                userId,
                productId,
            };
            try {
                validateBookmark(param);
                const existingBookmark = yield prisma_1.default.bookmark.findUnique({
                    where: {
                        userId_productId: {
                            userId,
                            productId,
                        },
                    },
                });
                if (!existingBookmark) {
                    throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.BOOKMARK_NOT_FOUND, constants_1.HTTP_STATUS_CODE[400].code);
                }
                yield prisma_1.default.bookmark.delete({
                    where: {
                        userId_productId: {
                            userId,
                            productId,
                        },
                    },
                });
                return null;
            }
            catch (err) {
                _next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.BOOKMARK_DELETE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
}
exports.BookmarkService = BookmarkService;
