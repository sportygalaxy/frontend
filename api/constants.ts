import { TEnvMode } from "./types";

export const appTitle =
  process.env.NEXT_PUBLIC_APP_TITLE || "Sporty Galaxy™";
export const appDescription =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "Enhance your training sessions with our cutting-edge sports equipment";
export const appSeoKeywords = [
  "sportygalaxy",
  "sportygalaxys",
  "sporty-galaxy",
  "sporty-galaxys",
  "sporty galaxys",
  "sporty galaxys",
  "sporty",
  "sport",
  "gym",
  "galaxys",
  "sportswear",
  "gym equipment",
  "fitness apparel",
  "workout clothes",
  "athletic wear",
  "exercise gear",
  "sports gear",
  "yoga pants",
  "running shoes",
  "fitness equipment",
  "gym clothes",
  "training gear",
  "sports accessories",
  "activewear",
  "fitness accessories",
  "workout equipment",
  "sports shoes",
  "home gym equipment",
  "crossfit gear",
  "exercise machines",
  "sports bags",
  "gym accessories",
  "fitness gadgets",
  "compression wear",
  "workout tops",
  "sports bras",
  "athletic shoes",
  "performance wear",
  "exercise clothing",
  "gym shorts",
];

export const envMode = (process.env.NEXT_PUBLIC_REACT_APP_ENV ||
  process.env.NODE_ENV) as TEnvMode;

const authConfig = {
  local: {
    API_BASE_URL: "https://auth.v2.sportygalaxy.xyz/api/v2/",
    WEB_BASE_URL: "https://ecommerce-sport-app.vercel.app/",
  },
  development: {
    API_BASE_URL: "https://auth.v2.sportygalaxy.xyz/api/v2/",
    WEB_BASE_URL: "https://ecommerce-sport-app.vercel.app/",
  },
  staging: {
    API_BASE_URL: "https://auth.v2.sportygalaxy.xyz/api/v2/",
    WEB_BASE_URL: "https://sv-frontend-staging.vercel.app",
  },
  production: {
    API_BASE_URL: "https://auth.v2.sportygalaxy.xyz/api/v2/",
    WEB_BASE_URL: "https://www.sportygalaxy.com/",
  },

  // Demo environment
  test: {
    API_BASE_URL: "https://auth.v2.sportygalaxy.xyz/api/v2/",
    WEB_BASE_URL: "https://ecommerce-sport-app.vercel.app/",
  },
} as const;

export const authApiBaseUrl = authConfig[envMode].API_BASE_URL;

export const webBaseUrl = authConfig[envMode].WEB_BASE_URL;
