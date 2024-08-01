import { NextFunction, Request, Response } from "express";
import { ReviewService } from "../services/review.service";
import { asyncHandler } from "../middleware/async";
import {
  CreateReviewApiResponse,
  UpdateReviewApiResponse,
  UpdateReviewDTO,
} from "../types/review.types";

const reviewService = new ReviewService();

export const getReviews = asyncHandler(async (req, res, next) => {
  const query = req.query;
  const reviews = await reviewService.getReviews(query, next);

  if (!reviews) return;

  res.status(200).json({
    message: "Fetch product reviews successfully",
    data: reviews,
    success: !!reviews,
  });
});

export const getReview = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const review = await reviewService.getReview(id, next);

  if (!review) return;

  res.status(200).json({
    message: "Fetch product review successfully",
    data: review,
    success: !!review,
  });
});

export const createReview = asyncHandler(
  async (
    req: { body: any },
    res: Response,
    next: NextFunction
  ): Promise<CreateReviewApiResponse | void> => {
    const review = await reviewService.createReview(
      {
        ...req.body,
      },
      next
    );

    if (!review) return;

    res.status(201).json({
      message: "Product review created successfully",
      data: review,
      success: !!review,
    });
  }
);

export const updateReview = asyncHandler(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<UpdateReviewApiResponse | void> => {
    const { id } = req.params;
    const { rating, comment }: UpdateReviewDTO = req.body;

    const review = await reviewService.updateReview(
      id,
      {
        rating,
        comment,
      },
      next
    );

    if (!review) return;

    res.status(201).json({
      message: "Product review updated successfully",
      data: review,
      success: !!review,
    });
  }
);

export const deleteReview = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  await reviewService.deleteReview({ id }, next);

  res.status(200).json({
    message: "Product review deleted successfully",
    data: null,
    success: true,
  });
});
