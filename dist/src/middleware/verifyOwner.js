"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOwner = void 0;
const errorResponse_1 = require("../utils/errorResponse");
const constants_1 = require("../constants");
/**
 *
 * @param res response
 * @param next next middleware
 * @param userId userId from request
 * @param tokenUserId userId from JWT
 * @returns Error JSON payload
 */
const verifyOwner = (res, next, userId, tokenUserId) => {
    console.log("[verifyOwner]", { userId, tokenUserId });
    if (userId !== tokenUserId)
        throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.NOT_AUTHORIZED, constants_1.HTTP_STATUS_CODE[403].code);
    // next();
};
exports.verifyOwner = verifyOwner;
