import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./common/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: false,
      padding: {
        DEFAULT: "1rem", // Default padding
        sm: "2rem", // Padding for screens >= 640px
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
      },
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
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
        "1": "1px", // Custom border width
        "3": "3px", // Custom border width
        "6": "6px", // Another custom border width
      },
      borderColor: {
        dark: "var(--grey)", // Custom border color
        light: "var(--light-grey)", // Another custom border color
        grey: "var(--border-grey)", // Another custom border color
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "dark-gradient":
          "linear-gradient(264.39deg, rgba(0, 0, 0, 0) 35.33%, #000000 90.47%), url('https://s3-alpha-sig.figma.com/img/2761/03b9/636f37b60127439bafce63d7fbcf674d?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jdi3VeQNsf9ZPkj5jFY44ExO06epxnhNCSj3JxOukCwk48~okmdtNy52~9QAgxZJ48pZMSCBWHvSs3q3VIIhqQXycDAIMu4wpqbvp4o5ACokQYwzkjRq8TQOXAYLex5gNHieFrTYJvnxuEC6DZSX47GwBXA9OTPoH9sjN9FR7CMkNVh-BVQhlHBybM23KjDHcVAj2WGt6hQfMEUdQJxAsLzL3OmCmAEwKw3nwv41xlpBijH5VQ0T~NLYJdNcvsjHPG6hPWaaW9JjJG7jH8XtNIid0-IQgy~T3ZhH17NL5tP-fWlU4VbTDwqNUsQzBCRADo15fdGT02XgKQwd8AVBwQ__')",
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
        xs: "0.75rem", // 12px
        sm: "0.875rem", // 14px
        base: "1rem", // 16px
        lg: "1.125rem", // 18px
        xl: "1.25rem", // 20px
        "mobile-xl": "0.6312rem", // 10.1px
        "2xl": "1.5rem", // 24px
        "mobile-2xl": "0.9375rem", // 15px
        "3xl": "1.875rem", // 30px
        "mobile-3xl": "1.25rem", // 20px
        "4xl": "2.25rem", // 36px
        "5xl": "3rem", // 48px
        "mobile-5xl": "1.75rem", // 28px
        "6xl": "4rem", // 64px
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
