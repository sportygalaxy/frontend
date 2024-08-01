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
exports.deleteBookmark = exports.getBookmarks = exports.createBookmark = void 0;
const async_1 = require("../middleware/async");
const bookmark_service_1 = require("../services/bookmark.service");
const bookmarkService = new bookmark_service_1.BookmarkService();
exports.createBookmark = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId } = req.body;
    const bookmark = yield bookmarkService.createBookmark(userId, productId, next);
    if (!bookmark)
        return;
    res.status(201).json({
        message: "Bookmark created successfully",
        data: bookmark,
        success: !!bookmark,
    });
}));
exports.getBookmarks = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const bookmarks = yield bookmarkService.getBookmarks(query, next);
    if (!bookmarks)
        return;
    res.status(200).json({
        message: "Fetch Bookmarks successfully",
        data: bookmarks,
        success: !!bookmarks,
    });
}));
exports.deleteBookmark = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId } = req.body;
    yield bookmarkService.deleteBookmark({ userId, productId }, next);
    res.status(200).json({
        message: "Bookmark deleted successfully",
        data: null,
        success: true,
    });
}));
