const PHONE_NUMBER = "7072215324";
const PHONE_NUMBER_2 = "8116370946";
const PHONE_NUMBER_3 = "9027338732";
const COUNTRY_CODE = "+234";
export const EMAIL = "support@sportygalaxy.com";
const ADDRESS = "";
const ADDRESS_LINK = "";
export const logoUrl = "https://i.ibb.co/Fmm8v5h/Frame-2610515.png"; // "/images/logo/sg_logo.svg"; // https://www.sportygalaxy.com/logo.png

export const NAV_CONSTANT = {
  PHONE_NUMBER,
  FORMATTED_NUMBER: `(${COUNTRY_CODE}) ${PHONE_NUMBER}`,
  EMAIL,
  ADDRESS,
  FACEBOOK_URL: "",
  X_URL: "",
  TIKTOK_URL: "",
  INSTAGRAM_URL: "",
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

