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
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const constants_1 = require("../constants");
const errorResponse_1 = require("../utils/errorResponse");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const EnvKeys_1 = require("../common/EnvKeys");
const user_service_1 = require("./user.service");
const crypto_1 = require("crypto");
const email_service_1 = require("./integration/email.service");
const redis_service_1 = require("./integration/redis.service");
const helpers_1 = require("../helpers");
const mailer_1 = require("../helpers/mailer");
const userService = new user_service_1.UserService();
const redisService = new redis_service_1.RedisService();
redisService.testConnection();
class AuthService {
    // constructor(public userService: UserService) {}
    hashPassword(_password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield bcrypt_1.default.hash(_password, 10);
            }
            catch (err) {
                return err;
            }
        });
    }
    generateCookieToken(_userId_1, _expireTime_1) {
        return __awaiter(this, arguments, void 0, function* (_userId, _expireTime, _isAdmin = false) {
            try {
                const secret = EnvKeys_1.EnvKeys.JWT_SECRET;
                // res.setHeader("Set-Cookie", "test=" + "myValue").json("success")
                const token = jsonwebtoken_1.default.sign({
                    id: _userId,
                    isAdmin: _isAdmin,
                }, secret, { expiresIn: _expireTime });
                return token;
            }
            catch (err) {
                return err;
            }
        });
    }
    decodeCookieToken(_token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const secret = EnvKeys_1.EnvKeys.JWT_SECRET;
                const decodedJwtUser = jsonwebtoken_1.default.verify(_token, secret);
                return decodedJwtUser;
            }
            catch (err) {
                return err;
            }
        });
    }
    validatedEmail(_email, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma_1.default.user.findUnique({
                    where: { email: _email },
                });
                if (!user) {
                    return _next(new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.INVALID_CREDENTIALS, constants_1.HTTP_STATUS_CODE[400].code));
                }
                return user;
            }
            catch (err) {
                return _next(err);
            }
        });
    }
    validatedUserId(_id, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma_1.default.user.findUnique({
                    where: { id: _id },
                });
                if (!user) {
                    return _next(new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.INVALID_CREDENTIALS, constants_1.HTTP_STATUS_CODE[400].code));
                }
                return user;
            }
            catch (err) {
                return _next(err);
            }
        });
    }
    comparePassword(_password, _userPassword, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isPasswordValid = yield bcrypt_1.default.compare(_password, _userPassword);
                if (!isPasswordValid) {
                    return _next(new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.INVALID_CREDENTIALS, constants_1.HTTP_STATUS_CODE[400].code));
                }
                return isPasswordValid;
            }
            catch (err) {
                return _next(err);
            }
        });
    }
    canRegister(_payload, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [email] = yield Promise.all([
                    userService.getUserByEmail(_payload.email, _next),
                ]);
                const result = {
                    isCanRegister: !!!email,
                    isEmailExist: !!email,
                };
                return {
                    isCanRegister: result === null || result === void 0 ? void 0 : result.isCanRegister,
                    isEmailExist: result === null || result === void 0 ? void 0 : result.isEmailExist,
                };
            }
            catch (err) {
                return _next(err);
            }
        });
    }
    register(_a, _next_1) {
        return __awaiter(this, arguments, void 0, function* ({ email, password, firstName, lastName, phone, address, isVerified, }, _next) {
            try {
                const payload = {
                    email,
                    firstName,
                    lastName,
                    phone,
                    address,
                    isVerified,
                };
                const canRegister = yield this.canRegister(Object.assign({}, payload), _next);
                if (!(canRegister === null || canRegister === void 0 ? void 0 : canRegister.isCanRegister)) {
                    return _next(new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.USER_EXISTS_WITH_EMAIL_OR_USERNAME, constants_1.HTTP_STATUS_CODE[400].code));
                }
                const newUser = yield prisma_1.default.user.create({
                    data: {
                        id: (0, crypto_1.randomUUID)(),
                        email,
                        password,
                        firstName,
                        lastName,
                        phone,
                        address,
                        isVerified,
                    },
                });
                return newUser;
            }
            catch (err) {
                return _next(err);
            }
        });
    }
    activate(_a, _next_1) {
        return __awaiter(this, arguments, void 0, function* ({ userId, isVerified }, _next) {
            try {
                if (isVerified) {
                    return _next(new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.USER_EMAIL_ALREADY_VERIFIED, constants_1.HTTP_STATUS_CODE[400].code));
                }
                const updatedUser = yield prisma_1.default.user.update({
                    where: { id: userId },
                    data: {
                        isVerified: true,
                    },
                });
                return updatedUser;
            }
            catch (err) {
                return _next(err);
            }
        });
    }
    sendVerification(_a, _next_1) {
        return __awaiter(this, arguments, void 0, function* ({ userId, userEmail, userFirstName, isVerified }, _next) {
            const THIRTY_MINUTES = 1000 * 60 * 30;
            const isAdmin = false;
            try {
                if (isVerified) {
                    return _next(new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.USER_EMAIL_ALREADY_VERIFIED, constants_1.HTTP_STATUS_CODE[400].code));
                }
                const emailVerificationToken = yield this.generateCookieToken(userId, THIRTY_MINUTES, isAdmin);
                const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
                yield (0, mailer_1.sendVerificationEmail)(userEmail, userFirstName, url);
                return true;
            }
            catch (err) {
                return _next(err);
            }
        });
    }
    sendResetPasswordCode(email, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma_1.default.user.findUnique({
                    where: { email },
                    select: { id: true, firstName: true, email: true },
                });
                if (!user) {
                    throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.USER_NOT_FOUND, constants_1.HTTP_STATUS_CODE[404].code);
                }
                const redisKey = `resetCode:${user.id}`;
                const timestampKey = `resetCodeTimestamp:${user.id}`;
                const currentTime = Date.now();
                const OTP_LENGTH = 5;
                const ONE_MINUTE = 60000;
                // Get the stored code and timestamp from Redis
                const redisTimestamp = yield redisService.get(timestampKey);
                // Check if the resend interval has passed
                if (redisTimestamp &&
                    currentTime - parseInt(redisTimestamp, 10) < ONE_MINUTE) {
                    throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.OTP_RESEND_TOO_SOON, constants_1.HTTP_STATUS_CODE[400].code);
                }
                // Generate new code and set it in Redis with the current timestamp
                const code = (0, helpers_1.generateCode)(OTP_LENGTH);
                yield redisService.set(redisKey, code, ONE_MINUTE); // Set code in Redis with 1-hour expiration
                yield redisService.set(timestampKey, currentTime.toString(), ONE_MINUTE); // Set timestamp in Redis with 1-hour expiration
                yield (0, email_service_1.sendResetCodeEmail)("namecheap", user.email, user.firstName, code);
                return true;
            }
            catch (error) {
                next(error);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.GENERIC_MESSAGE, constants_1.HTTP_STATUS_CODE[500].code);
            }
        });
    }
    validateResetPasswordCode(email, code, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma_1.default.user.findUnique({ where: { email } });
                if (!user) {
                    throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.USER_NOT_FOUND, constants_1.HTTP_STATUS_CODE[404].code);
                }
                const redisKey = `resetCode:${user.id}`;
                const storedCode = yield redisService.get(redisKey);
                console.log("VALIDATE", { redisKey, storedCode, code });
                if (!storedCode || storedCode !== code) {
                    throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.VERIFICATION_CODE_INVALID, constants_1.HTTP_STATUS_CODE[400].code);
                }
                return { email: user.email };
            }
            catch (error) {
                next(error);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.GENERIC_MESSAGE, constants_1.HTTP_STATUS_CODE[500].code);
            }
        });
    }
    changePassword(email, password, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cryptedPassword = yield bcrypt_1.default.hash(password, 12);
                const user = yield prisma_1.default.user.findUnique({ where: { email } });
                if (!user) {
                    throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.USER_NOT_FOUND, constants_1.HTTP_STATUS_CODE[404].code);
                }
                yield prisma_1.default.user.update({
                    where: { email: user.email },
                    data: { password: cryptedPassword },
                });
                const redisKey = `resetCode:${user.id}`;
                const timestampKey = `resetCodeTimestamp:${user.id}`;
                yield redisService.delete(redisKey);
                yield redisService.delete(timestampKey);
                return true;
            }
            catch (error) {
                next(error);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.GENERIC_MESSAGE, constants_1.HTTP_STATUS_CODE[500].code);
            }
        });
    }
}
exports.AuthService = AuthService;
