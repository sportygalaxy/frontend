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
const verifyOwner = (res, next, userId, tokenUserId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("[verifyOwner]", { userId, tokenUserId });
    if (userId !== tokenUserId)
        throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.NOT_AUTHORIZED, constants_1.HTTP_STATUS_CODE[403].code);
    // next();
});
exports.verifyOwner = verifyOwner;
