import { ERROR_MESSAGES, HTTP_STATUS_CODE } from "../constants";
import { EnvKeys } from "../common/EnvKeys";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface JwtPayload {
  id: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
}
export const verifyToken = (
  req:
    | {
        userId: string;
        cookies: { token: string };
        header: (param: string) => any;
      }
    | Request
    | any,
  res: Response,
  next: NextFunction
) => {
  let tokenFromHeader = req.header("Authorization");
  tokenFromHeader = tokenFromHeader
    ? tokenFromHeader.slice(7, tokenFromHeader.length)
    : "";

  const tokenFromCookies = req.cookies.token;

  // Use cookies / headers
  const token = tokenFromHeader || tokenFromCookies;

  console.log({ tokenFromCookies, tokenFromHeader });

  if (!token)
    return res.status(401).json({
      error: ERROR_MESSAGES.NOT_AUTHENTICATED,
      success: false,
      statusCode: HTTP_STATUS_CODE[401].name,
    });

  const secret = EnvKeys.JWT_SECRET;

  jwt.verify(token, secret, async (err: any, payload: JwtPayload | any) => {
    if (err)
      return res.status(403).json({
        error: ERROR_MESSAGES.TOKEN_EXPIRED,
        success: false,
        statusCode: HTTP_STATUS_CODE[403].name,
      });
    console.log("[verifyToken]", payload);
    req.userId = payload.id;

    next();
  });
};
