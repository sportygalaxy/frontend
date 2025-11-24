import { PrizeType } from "@/types/spinner";

export const PHONE_NUMBER = "7072215324";
export const PHONE_NUMBER_2 = "8116370946";
export const PHONE_NUMBER_3 = "9027338732";
export const COUNTRY_CODE = "+234";
export const EMAIL = "support@sportygalaxy.com";
export const ADDRESS = "";
export const ADDRESS_LINK = "";
export const WEBSITE = "https://www.sportygalaxy.com";
export const BRAND_NAME = "SPORTY GALAXY LIMITED";
export const BUSINESS_ADDRESS =
  "Alaba International Market, No 25 olojo drive ojo town Lagos";
export const logoUrl =
  "https://utfs.io/f/OX5ramIp6AH4YSDqoO7pjsfC6oQDNzYrxLmUHTlPghA7i2KF"; // "/images/logo/sg_logo.svg"; // https://www.sportygalaxy.com/logo.png
  export const SIGNATURE = "/images/signature.jpg";

export const NAV_CONSTANT = {
  PHONE_NUMBER,
  FORMATTED_NUMBER: `(${COUNTRY_CODE}) ${PHONE_NUMBER}`,
  EMAIL,
  ADDRESS,
  FACEBOOK_URL: "https://www.facebook.com/share/16xpwMdDTL/",
  X_URL: "https://x.com/sportygalaxy?t=UXNdx7UaqL4WmjgAbTztWg&s=09",
  TIKTOK_URL: "https://www.tiktok.com/@sportygalaxy1?_t=ZM-8y1S0TY1Qbm&_r=1",
  INSTAGRAM_URL:
    "https://www.instagram.com/sporty_galaxy1?igsh=cnI3YzB4ZGR4dXBq",
  LINKEDIN_URL: "",
  WHATSAPP_LINK: `https://api.whatsapp.com/send?phone=${COUNTRY_CODE}${PHONE_NUMBER}&text=Hello%Sporty%20galaxy,%20I%20am%20interested%20in%20buying%sport%20equipments`,
  CALL_LINK: `tel:+${COUNTRY_CODE}${PHONE_NUMBER}`,
  EMAIL_LINK: `mailto:${EMAIL}`,
  BANK_NAME: "Opay",
  BANK_ACCOUNT_NUMBER: 7025069316,
  BANK_ACCOUNT_NAME: "Sporty Galaxy",
};

export const AUTHENTIATED = false;

export const WATERMARK = "/images/logo/sg_logo.svg";
export const videoPath = "/videos/prod-1.mp4";
export const youTubeLink = "https://www.youtube.com/watch?v=6qg7UHgkq-U";

// uploadConfig.ts
export const uploadConfig = {
  maxFileSize: "4MB", // Max file size
  maxFileCount: 5, // Max file count for multiple uploads
  allowedFileTypes: [
    // Image MIME types
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/gif",
    "image/bmp",
    "image/webp",
    "image/tiff",
    "image/svg+xml",
    "image/*",

    // Document MIME types
    "application/pdf",

    // Video MIME types
    "video/mp4",
    "video/mpeg",
    "video/x-msvideo", // .avi
    "video/quicktime", // .mov
    "video/webm",
    "video/ogg",
    "video/x-matroska", // .mkv
    "video/*",
  ], // Allowed MIME types, // Allowed MIME types
};

export const PRODUCT_ID = "70e232f2-eee3-4027-b672-34cdf175b93b";
export const DEFAULT_PRODUCT_IMAGE = "/favicon-16x16.png";
export const DEFAULT_USER_IMAGE = "/images/default-image.png";

export const PAGINATION_DEFAULT = {
  page: 1,
  limit: 20,
};

export const UI_SLICES = [
  "TRY_AGAIN",
  "FREE_GIFT",
  "FREE_DELIVERY",
  "CASH_GIFT",
  "SPIN_AGAIN",
  "DISCOUNT_10",
  "DISCOUNT_20",
  "DISCOUNT_50",
];

// Spinner degree outcome for corresponding prizes
export const SPINNER_DEGREE_OUTCOME = {
  TRY_AGAIN: { slice: 0, angleDeg: 22.5 },
  FREE_GIFT: { slice: 1, angleDeg: 67.5 },
  FREE_DELIVERY: { slice: 2, angleDeg: 112.5 },
  CASH_GIFT: { slice: 3, angleDeg: 157.5 },
  SPIN_AGAIN: { slice: 4, angleDeg: 202.5 },
  DISCOUNT_10: { slice: 5, angleDeg: 247.5 },
  DISCOUNT_20: { slice: 6, angleDeg: 292.5 },
  DISCOUNT_50: { slice: 7, angleDeg: 337.5 },
};

// List of valid prizes excluding "TRY_AGAIN" and "SPIN_AGAIN"
export const validPrizes: PrizeType[] = [
  "FREE_GIFT",
  "FREE_DELIVERY",
  "CASH_GIFT",
  "DISCOUNT_10",
  "DISCOUNT_20",
  "DISCOUNT_50",
];

export const faqs = [
  {
    question: "How long does shipping take?",
    answer:
      "We can deliver any item to most parts of lagos within 24 or 48 hours. We also deliver to other southerns states within 3 business days and northern states within 5 business days. Every item is shipped on the days of ordering. We accept payment on delivery within Lagos.",
  },
  {
    question: "Can I return an item?",
    answer:
      "Yes, you can return any unused item within 7 days of delivery. Please ensure it's in its original packaging.",
  },
  {
    question: "Do you offer bulk purchase discounts?",
    answer:
      "Absolutely! Contact our sales team for discounted pricing on bulk orders.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order ships, you'll receive a tracking link via email. You can also check your order status in your account dashboard.",
  },
];
