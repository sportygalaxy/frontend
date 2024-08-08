import { ErrorResponse } from "../utils/errorResponse";
import { ERROR_MESSAGES, HTTP_STATUS_CODE } from "../constants";
import { NextFunction, Response } from "express";

/**
 *
 * @param res response
 * @param next next middleware
 * @param userId userId from request
 * @param tokenUserId userId from JWT
 * @returns Error JSON payload
 */
export const verifyOwner = async (
  res: Response | any,
  next: NextFunction | any,
  userId: string | undefined,
  tokenUserId: string | undefined
) => {
  console.log("[verifyOwner]", { userId, tokenUserId });
  if (!userId || !tokenUserId || userId !== tokenUserId)
    throw new ErrorResponse(
      ERROR_MESSAGES.NOT_AUTHORIZED,
      HTTP_STATUS_CODE[403].code
    );
  // next();
};
