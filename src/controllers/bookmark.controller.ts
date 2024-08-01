import { Request, Response, NextFunction } from "express";

import { asyncHandler } from "../middleware/async";
import { BookmarkService } from "../services/bookmark.service";

const bookmarkService = new BookmarkService();

export const createBookmark = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, productId } = req.body;

    const bookmark = await bookmarkService.createBookmark(
      userId,
      productId,
      next
    );

    if (!bookmark) return;

    res.status(201).json({
      message: "Bookmark created successfully",
      data: bookmark,
      success: !!bookmark,
    });
  }
);

export const getBookmarks = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const bookmarks = await bookmarkService.getBookmarks(query, next);

    if (!bookmarks) return;

    res.status(200).json({
      message: "Fetch Bookmarks successfully",
      data: bookmarks,
      success: !!bookmarks,
    });
  }
);

export const deleteBookmark = asyncHandler(async (req, res, next) => {
  const { userId, productId } = req.body;

  await bookmarkService.deleteBookmark({ userId, productId }, next);

  res.status(200).json({
    message: "Bookmark deleted successfully",
    data: null,
    success: true,
  });
});
