const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./common/**/*.{ts,tsx,mdx}",
    "./app/**/*.{ts,tsx,mdx}",
    "./src/**/*.{ts,tsx,mdx}",
    flowbite.content(),
  ],
  prefix: "",
  theme: {
    container: {
      center: false,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
      },
      screens: {
        xs: "445px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
    },
    extend: {
      height: {
        "full-minus-80": "calc(100% - 80px)",
        "fill-available": "-webkit-fill-available",
      },
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: {
          DEFAULT: "var(--background)",
        },
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--black)",
          foreground: "var(--white)",
        },
        secondary: {
          DEFAULT: "var(--grey)",
          foreground: "var(--light-grey)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      fontFamily: {
        sans: ["Jost", ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      borderWidth: {
        "1": "1px",
        "3": "3px",
        "6": "6px",
      },
      borderColor: {
        dark: "var(--grey)",
        light: "var(--light-grey)",
        grey: "var(--border-grey)",
        lightDarkGrey: "var(--light-dark-grey)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "dark-gradient":
          "linear-gradient(264.39deg, rgba(0, 0, 0, 0) 35.33%, #000000 90.47%), url('https://utfs.io/f/OX5ramIp6AH4gE5EqnYBSPKmriXRwY5xo4tNbk3E0HzJD89y')",
        "grey-gradient":
          "linear-gradient(180.77deg, rgba(0, 0, 0, 0) 64.59%, rgba(0, 0, 0, 0.7) 97.05%)",
      },
      screens: {
        xs: "445px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
        "3xl": "1720px",
      },
      fontWeight: {
        normal: "400",
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "mobile-xl": "0.6312rem",
        "2xl": "1.5rem",
        "mobile-2xl": "0.9375rem",
        "3xl": "1.875rem",
        "mobile-3xl": "1.25rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "mobile-5xl": "1.75rem",
        "6xl": "4rem",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    flowbite.plugin(),
    require("tailwind-scrollbar"),
  ],
} satisfies Config;

export default config;
