import bcrypt from "bcrypt";
import prisma from "../lib/prisma";
import { ERROR_MESSAGES, HTTP_STATUS_CODE } from "../constants";
import { ErrorResponse } from "../utils/errorResponse";
import { NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { EnvKeys } from "../common/EnvKeys";
import {
  ActivateUserDto,
  CanRegisterResponse,
  RegisterUserDto,
  SendVerificationDto,
} from "types/auth.types";
import { UserService } from "./user.service";
import { randomUUID } from "crypto";
import {
  sendResetCodeEmail,
  sendVerificationEmail,
} from "./integration/email.service";
import { RedisService } from "./integration/redis.service";
import { generateCode } from "../helpers";
import { User } from "../models";
// import { sendVerificationEmail } from "../helpers/mailer";

const userService = new UserService();
const redisService = new RedisService();

redisService.testConnection();

export class AuthService {
  // constructor(public userService: UserService) {}

  async hashPassword(_password: string): Promise<string> {
    try {
      return await bcrypt.hash(_password, 10);
    } catch (err: any) {
      return err;
    }
  }

  async generateCookieToken(
    _userId: string,
    _expireTime: number,
    _isAdmin: boolean = false
  ): Promise<string> {
    try {
      const secret = EnvKeys.JWT_SECRET;

      // res.setHeader("Set-Cookie", "test=" + "myValue").json("success")

      const token = jwt.sign(
        {
          id: _userId,
          isAdmin: _isAdmin,
        },
        secret,
        { expiresIn: _expireTime }
      );

      return token;
    } catch (err: any) {
      return err;
    }
  }

  async decodeCookieToken(_token: string): Promise<JwtPayload> {
    try {
      const secret = EnvKeys.JWT_SECRET;

      const decodedJwtUser = jwt.verify(_token, secret) as JwtPayload;

      return decodedJwtUser;
    } catch (err: any) {
      return err;
    }
  }

  async validatedEmail(_email: string, _next: NextFunction) {
    try {
      const user = await prisma.user.findUnique({
        where: { email: _email },
      });

      if (!user) {
        return _next(
          new ErrorResponse(
            ERROR_MESSAGES.INVALID_CREDENTIALS,
            HTTP_STATUS_CODE[400].code
          )
        );
      }

      return user;
    } catch (err) {
      return _next(err);
    }
  }

  async validatedUserId(_id: string, _next: NextFunction) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: _id },
      });

      if (!user) {
        return _next(
          new ErrorResponse(
            ERROR_MESSAGES.INVALID_CREDENTIALS,
            HTTP_STATUS_CODE[400].code
          )
        );
      }

      return user;
    } catch (err) {
      return _next(err);
    }
  }

  async comparePassword(
    _password: string,
    _userPassword: string,
    _next: NextFunction
  ) {
    try {
      const isPasswordValid = await bcrypt.compare(_password, _userPassword);

      if (!isPasswordValid) {
        return _next(
          new ErrorResponse(
            ERROR_MESSAGES.INVALID_CREDENTIALS,
            HTTP_STATUS_CODE[400].code
          )
        );
      }

      return isPasswordValid;
    } catch (err) {
      return _next(err);
    }
  }

  private async canRegister(
    _payload: {
      email: string;
      dto?: any;
    },
    _next: NextFunction
  ): Promise<CanRegisterResponse | void> {
    try {
      const [email] = await Promise.all([
        userService.getUserByEmail(_payload.email, _next),
      ]);

      const result: CanRegisterResponse = {
        isCanRegister: !!!email,
        isEmailExist: !!email,
      };

      return {
        isCanRegister: result?.isCanRegister,
        isEmailExist: result?.isEmailExist,
      };
    } catch (err) {
      return _next(err);
    }
  }

  async register(
    {
      email,
      password,
      firstName,
      lastName,
      phone,
      address,
      isVerified,
    }: RegisterUserDto,
    _next: NextFunction
  ) {
    try {
      const payload = {
        email,
        firstName,
        lastName,
        phone,
        address,
        isVerified,
      };
      const canRegister = await this.canRegister({ ...payload }, _next);

      if (!canRegister?.isCanRegister) {
        return _next(
          new ErrorResponse(
            ERROR_MESSAGES.USER_EXISTS_WITH_EMAIL_OR_USERNAME,
            HTTP_STATUS_CODE[400].code
          )
        );
      }

      const newUser = await prisma.user.create({
        data: {
          id: randomUUID(),
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
    } catch (err) {
      return _next(err);
    }
  }

  async activate({ userId, isVerified }: ActivateUserDto, _next: NextFunction) {
    try {
      if (isVerified) {
        return _next(
          new ErrorResponse(
            ERROR_MESSAGES.USER_EMAIL_ALREADY_VERIFIED,
            HTTP_STATUS_CODE[400].code
          )
        );
      }

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          isVerified: true,
        },
      });

      return updatedUser;
    } catch (err) {
      return _next(err);
    }
  }

  async sendVerification(
    { userId, userEmail, userFirstName, isVerified }: SendVerificationDto,
    _next: NextFunction
  ) {
    const THIRTY_MINUTES = 1000 * 60 * 30;
    const isAdmin = false;

    try {
      if (isVerified) {
        return _next(
          new ErrorResponse(
            ERROR_MESSAGES.USER_EMAIL_ALREADY_VERIFIED,
            HTTP_STATUS_CODE[400].code
          )
        );
      }

      const emailVerificationToken = await this.generateCookieToken(
        userId,
        THIRTY_MINUTES,
        isAdmin
      );

      const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
      await sendVerificationEmail("gmail", userEmail, userFirstName, url);

      return true;
    } catch (err) {
      return _next(err);
    }
  }

  async sendResetPasswordCode(
    email: string,
    next: NextFunction
  ): Promise<boolean | void> {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true, firstName: true, email: true },
      });

      if (!user) {
        throw new ErrorResponse(
          ERROR_MESSAGES.USER_NOT_FOUND,
          HTTP_STATUS_CODE[404].code
        );
      }

      const redisKey = `resetCode:${user.id}`;
      const timestampKey = `resetCodeTimestamp:${user.id}`;
      const currentTime = Date.now();

      const OTP_LENGTH = 5;
      const ONE_MINUTE = 60000;

      // Get the stored code and timestamp from Redis
      const redisTimestamp = await redisService.get(timestampKey);

      // Check if the resend interval has passed
      if (
        redisTimestamp &&
        currentTime - parseInt(redisTimestamp, 10) < ONE_MINUTE
      ) {
        throw new ErrorResponse(
          ERROR_MESSAGES.OTP_RESEND_TOO_SOON,
          HTTP_STATUS_CODE[400].code
        );
      }

      // Generate new code and set it in Redis with the current timestamp
      const code = generateCode(OTP_LENGTH);
      await redisService.set(redisKey, code, ONE_MINUTE); // Set code in Redis with 1-hour expiration
      await redisService.set(timestampKey, currentTime.toString(), ONE_MINUTE); // Set timestamp in Redis with 1-hour expiration

      await sendResetCodeEmail("namecheap", user.email, user.firstName, code);

      return true;
    } catch (error) {
      next(error);
      throw new ErrorResponse(
        ERROR_MESSAGES.GENERIC_MESSAGE,
        HTTP_STATUS_CODE[500].code
      );
    }
  }

  async validateResetPasswordCode(
    email: string,
    code: string,
    next: NextFunction
  ): Promise<Partial<User> | void> {
    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw new ErrorResponse(
          ERROR_MESSAGES.USER_NOT_FOUND,
          HTTP_STATUS_CODE[404].code
        );
      }

      const redisKey = `resetCode:${user.id}`;
      const storedCode = await redisService.get(redisKey);

      console.log("VALIDATE", { redisKey, storedCode, code });

      if (!storedCode || storedCode !== code) {
        throw new ErrorResponse(
          ERROR_MESSAGES.VERIFICATION_CODE_INVALID,
          HTTP_STATUS_CODE[400].code
        );
      }

      return { email: user.email };
    } catch (error) {
      next(error);
      throw new ErrorResponse(
        ERROR_MESSAGES.GENERIC_MESSAGE,
        HTTP_STATUS_CODE[500].code
      );
    }
  }

  async changePassword(email: string, password: string, next: NextFunction) {
    try {
      const cryptedPassword = await bcrypt.hash(password, 12);

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new ErrorResponse(
          ERROR_MESSAGES.USER_NOT_FOUND,
          HTTP_STATUS_CODE[404].code
        );
      }

      await prisma.user.update({
        where: { email: user.email },
        data: { password: cryptedPassword },
      });

      const redisKey = `resetCode:${user.id}`;
      const timestampKey = `resetCodeTimestamp:${user.id}`;

      await redisService.delete(redisKey);
      await redisService.delete(timestampKey);

      return true;
    } catch (error) {
      next(error);
      throw new ErrorResponse(
        ERROR_MESSAGES.GENERIC_MESSAGE,
        HTTP_STATUS_CODE[500].code
      );
    }
  }
}
