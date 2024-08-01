import prisma from "../lib/prisma";
import { ERROR_MESSAGES, HTTP_STATUS_CODE } from "../constants";
import { ErrorResponse } from "../utils/errorResponse";
import { NextFunction } from "express";
import { validateData } from "../helpers/validation";
import {
  CreateReviewDTO,
  CreateReviewResponse,
  GetReviewsDTO,
  UpdateReviewDTO,
  UpdateReviewResponse,
} from "../types/review.types";
import { createReviewSchema } from "../types/dto/review.dto";
import { Review } from "models";

export class ReviewService {
  /**
   *
   * @param _query
   * @param _next
   * @returns products review list
   */
  async getReviews(_query: GetReviewsDTO, _next: NextFunction) {
    try {
      const reviews = await prisma.review.findMany({
        where: {
          ...(_query && _query),
        },
      });

      if (!reviews) {
        return _next(
          new ErrorResponse(
            ERROR_MESSAGES.REVIEW_NOT_FOUND,
            HTTP_STATUS_CODE[400].code
          )
        );
      }

      return reviews;
    } catch (err) {
      _next(err);
      throw new ErrorResponse(
        ERROR_MESSAGES.REVIEW_GETS_FOUND,
        HTTP_STATUS_CODE[400].code
      );
    }
  }

  /**
   *
   * @param _id reviewId
   * @param _next
   * @returns review review details
   */
  async getReview(_id: string, _next: NextFunction) {
    try {
      const review = await prisma.review.findUnique({
        where: { id: _id },
        include: {},
      });

      if (!review) {
        return _next(
          new ErrorResponse(
            ERROR_MESSAGES.REVIEW_NOT_FOUND,
            HTTP_STATUS_CODE[400].code
          )
        );
      }

      return review;
    } catch (err) {
      _next(err);
      throw new ErrorResponse(
        ERROR_MESSAGES.REVIEW_GETS_FOUND,
        HTTP_STATUS_CODE[400].code
      );
    }
  }

  /**
   *
   * @param _payload rating, comment
   * @param _next
   * @returns review
   */
  async createReview(
    _payload: CreateReviewDTO,
    _next: NextFunction
  ): Promise<Review> {
    const validateReview = (review: CreateReviewDTO) =>
      validateData(createReviewSchema, review);

    const { userId, productId, rating, comment } = _payload;

    const reviewExist = await prisma.review.findMany({
      where: {
        AND: [{ userId }, { productId }],
      },
    });

    if (reviewExist.length >= 1) {
      throw new ErrorResponse(
        ERROR_MESSAGES.REVIEW_ALREADY_EXIST_FOUND,
        HTTP_STATUS_CODE[400].code
      );
    }

    try {
      validateReview(_payload);
      const review = await prisma.review.create({
        data: {
          userId,
          productId,
          rating,
          comment,
        },
        include: {},
      });

      if (!review) {
        throw new ErrorResponse(
          ERROR_MESSAGES.REVIEW_CREATE_FAILED,
          HTTP_STATUS_CODE[400].code
        );
      }

      return review;
    } catch (err: any) {
      _next(err);
      throw new ErrorResponse(
        ERROR_MESSAGES.REVIEW_CREATE_FAILED,
        HTTP_STATUS_CODE[400].code
      );
    }
  }

  /**
   *
   * @param _id reviewId
   * @param _payload  name
   * @param _next
   * @returns review
   */
  async updateReview(
    _id: string,
    _payload: UpdateReviewDTO,
    _next: NextFunction
  ): Promise<Review> {
    const { rating, comment } = _payload;
    try {
      await this.getReview(_id, _next);
      const updatedReview = await prisma.review.update({
        where: { id: _id },
        data: {
          ...(rating && { rating }),
          ...(comment && { comment }),
        },
      });

      if (!updatedReview) {
        throw new ErrorResponse(
          ERROR_MESSAGES.REVIEW_UPDATE_FAILED,
          HTTP_STATUS_CODE[400].code
        );
      }

      return updatedReview;
    } catch (err: any) {
      _next(err);
      throw new ErrorResponse(
        ERROR_MESSAGES.REVIEW_UPDATE_FAILED,
        HTTP_STATUS_CODE[400].code
      );
    }
  }

  async deleteReview(
    _dto: { id: string },
    _next: NextFunction
  ): Promise<null | void> {
    const { id: _id } = _dto;

    try {
      await prisma.review.delete({
        where: { id: _id },
      });

      return null;
    } catch (err) {
      _next(err);
      throw new ErrorResponse(
        ERROR_MESSAGES.REVIEW_DELETE_FAILED,
        HTTP_STATUS_CODE[400].code
      );
    }
  }
}
