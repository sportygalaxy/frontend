export const ERROR_MESSAGES = {
  UNAUTHORIZED: "Sorry, you do not have access to this resource",
  GENERIC_MESSAGE: "Sorry, an error occurred",
  USER_NOT_FOUND: "Sorry, user not found",
  USER_EXISTS_WITH_EMAIL_OR_USERNAME: "Sorry, user already exists",
  USER_EMAIL_ALREADY_VERIFIED: "Email is already activated.",
  USER_EXISTS_WITH_USERNAME: "Sorry, username already exists",
  USER_EXISTS_WITH_EMAIL: "Sorry, email already exists",
  PROFILE_UPDATE_FAILED: "Sorry, profile update failed",
  USER_DELETE_FAILED: "Sorry, failed to delete",
  INVALID_OTP: "Invalid/Expired OTP Entered",
  TOKEN_EXPIRED: "Sorry, this token is expired or invalid",
  NOT_AUTHORIZED: "Sorry, you are not authorized!",
  NOT_AUTHENTICATED: "Sorry, you are not authenticated!",
  INVALID_CREDENTIALS: "Invalid Credentials",
  INVALID_IDENTIFIER: "Invalid Identifier Received",
  INVALID_PAYLOAD: "Invalid payload",
  PRODUCT_NOT_FOUND: "Sorry, product not found",
  PRODUCT_GETS_FOUND: "Sorry, failed to retrive products",
  PRODUCT_DELETE_FAILED: "Sorry, failed to delete product",
  PRODUCT_CREATE_FAILED: "Sorry, failed to create product",
  PRODUCT_UPDATE_FAILED: "Sorry, failed to update product",
  PRODUCT_SIZE_NOT_FOUND: "Sorry, product size not found",
  PRODUCT_SIZE_GETS_FOUND: "Sorry, failed to retrive product sizes",
  PRODUCT_SIZE_DELETE_FAILED: "Sorry, failed to delete product size",
  PRODUCT_SIZE_CREATE_FAILED: "Sorry, failed to create product size",
  PRODUCT_SIZE_UPDATE_FAILED: "Sorry, failed to update product size",
  PRODUCT_COLOR_NOT_FOUND: "Sorry, product color not found",
  PRODUCT_COLOR_GETS_FOUND: "Sorry, failed to retrive product colors",
  PRODUCT_COLOR_DELETE_FAILED: "Sorry, failed to delete product color",
  PRODUCT_COLOR_CREATE_FAILED: "Sorry, failed to create product color",
  PRODUCT_COLOR_UPDATE_FAILED: "Sorry, failed to update product color",
  PRODUCT_CATEGORY_NOT_FOUND: "Sorry, product category not found",
  PRODUCT_CATEGORY_GETS_FOUND: "Sorry, failed to retrive product categorys",
  PRODUCT_CATEGORY_DELETE_FAILED: "Sorry, failed to delete product category",
  PRODUCT_CATEGORY_CREATE_FAILED: "Sorry, failed to create product category",
  PRODUCT_CATEGORY_UPDATE_FAILED: "Sorry, failed to update product category",
  PRODUCT_SUB_CATEGORY_NOT_FOUND: "Sorry, product sub category not found",
  PRODUCT_SUB_CATEGORY_GETS_FOUND: "Sorry, failed to retrive product sub categorys",
  PRODUCT_SUB_CATEGORY_DELETE_FAILED: "Sorry, failed to delete product sub category",
  PRODUCT_SUB_CATEGORY_CREATE_FAILED: "Sorry, failed to create product sub category",
  PRODUCT_SUB_CATEGORY_UPDATE_FAILED: "Sorry, failed to update product sub category",
  ORDER_NOT_FOUND: "Sorry, order not found",
  ORDER_GETS_FOUND: "Sorry, failed to retrive orders",
  ORDER_DELETE_FAILED: "Sorry, failed to delete order",
  ORDER_CREATE_FAILED: "Sorry, failed to create order",
  ORDER_UPDATE_FAILED: "Sorry, failed to update order",
  BOOKMARK_NOT_FOUND: "Sorry, bookmark not found",
  BOOKMARK_ALREADY_EXIST_FOUND: "Sorry, bookmark already exist",
  BOOKMARK_GETS_FOUND: "Sorry, failed to retrive bookmarks",
  BOOKMARK_DELETE_FAILED: "Sorry, failed to delete bookmark",
  BOOKMARK_CREATE_FAILED: "Sorry, failed to create bookmark",
  BOOKMARK_UPDATE_FAILED: "Sorry, failed to update bookmark",
  REVIEW_NOT_FOUND: "Sorry, review not found",
  REVIEW_ALREADY_EXIST_FOUND: "Sorry, review already exist",
  REVIEW_GETS_FOUND: "Sorry, failed to retrive reviews",
  REVIEW_DELETE_FAILED: "Sorry, failed to delete review",
  REVIEW_CREATE_FAILED: "Sorry, failed to create review",
  REVIEW_UPDATE_FAILED: "Sorry, failed to update review",
  COUPON_NOT_FOUND: "Sorry, coupon not found",
  COUPON_ALREADY_EXIST_FOUND: "Sorry, coupon already exist",
  COUPON_GETS_FOUND: "Sorry, failed to retrive coupons",
  COUPON_DELETE_FAILED: "Sorry, failed to delete coupon",
  COUPON_CREATE_FAILED: "Sorry, failed to create coupon",
  COUPON_UPDATE_FAILED: "Sorry, failed to update coupon",
};

export const ENVIRONMENTS = {
  local: "local",
  development: "development",
  staging: "staging",
  production: "production",
};

export const DEFAULT_PORT = 4500;

export const HTTP_STATUS_CODE = {
  200: {
    code: 200,
    name: "OK",
    meaning: "The request has succeeded.",
  },
  201: {
    code: 201,
    name: "Created",
    meaning:
      "The request has been fulfilled and has resulted in one or more new resources being created.",
  },
  204: {
    code: 204,
    name: "No Content",
    meaning:
      "The server successfully processed the request and is not returning any content.",
  },
  400: {
    code: 400,
    name: "Bad Request",
    meaning:
      "The server cannot or will not process the request due to an apparent client error.",
  },
  401: {
    code: 401,
    name: "Unauthorized",
    meaning:
      "The request has not been applied because it lacks valid authentication credentials for the target resource.",
  },
  403: {
    code: 403,
    name: "Forbidden",
    meaning:
      "The server understood the request, but it is refusing to fulfill it.",
  },
  404: {
    code: 404,
    name: "Not Found",
    meaning: "The server cannot find the requested resource.",
  },
  405: {
    code: 405,
    name: "Method Not Allowed",
    meaning:
      "The method received in the request-line is known by the origin server but not supported by the target resource.",
  },
  500: {
    code: 500,
    name: "Internal Server Error",
    meaning:
      "The server encountered an unexpected condition that prevented it from fulfilling the request.",
  },
  503: {
    code: 503,
    name: "Service Unavailable",
    meaning:
      "The server is currently unable to handle the request due to temporary overloading or maintenance of the server.",
  },
};

export const HTTP_STATUS_CODES = {
  200: {
    code: 200,
    name: "OK",
    meaning: "The request has succeeded.",
  },
  201: {
    code: 201,
    name: "Created",
    meaning:
      "The request has been fulfilled and has resulted in one or more new resources being created.",
  },
  204: {
    code: 204,
    name: "No Content",
    meaning:
      "The server successfully processed the request and is not returning any content.",
  },
  400: {
    code: 400,
    name: "Bad Request",
    meaning:
      "The server cannot or will not process the request due to an apparent client error.",
  },
  401: {
    code: 401,
    name: "Unauthorized",
    meaning:
      "The request has not been applied because it lacks valid authentication credentials for the target resource.",
  },
  403: {
    code: 403,
    name: "Forbidden",
    meaning:
      "The server understood the request, but it is refusing to fulfill it.",
  },
  404: {
    code: 404,
    name: "Not Found",
    meaning: "The server cannot find the requested resource.",
  },
  405: {
    code: 405,
    name: "Method Not Allowed",
    meaning:
      "The method received in the request-line is known by the origin server but not supported by the target resource.",
  },
  500: {
    code: 500,
    name: "Internal Server Error",
    meaning:
      "The server encountered an unexpected condition that prevented it from fulfilling the request.",
  },
  503: {
    code: 503,
    name: "Service Unavailable",
    meaning:
      "The server is currently unable to handle the request due to temporary overloading or maintenance of the server.",
  },
};
