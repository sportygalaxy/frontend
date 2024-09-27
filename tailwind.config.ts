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
          "linear-gradient(264.39deg, rgba(0, 0, 0, 0) 35.33%, #000000 90.47%), url('https://s3-alpha-sig.figma.com/img/2761/03b9/636f37b60127439bafce63d7fbcf674d?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SXI~Dsv~8XZOGkuO5K3h7vbuacDKxtN7QKmbP7AzKkq7W5lPMAHkfP0NDE3VgRhtLUg2UajijsW2lWOZPlRDg5gUkteLtj5XbfS7U8n~M4HInRT-UqwCSgBGlgkD-Pl8FUQauAjhzRuig7nbubb9v7k~t-TbJRp5eAF8LDUbBC8WkOdPwBP5msCxnaKUK9sAFohjsvkgRVvvnRqukceO0REyLuKXCrJxMv2gWixRa~gEriErTccR47XnfF0pX5HT~XCh79Haap5bC4A3WuGYqR~xWvz0sDQzcU-raQEzZXtXidSgOnJnj1D94YTXVYI1aRILz5A98Jh4FAXTV49SfQ__')",
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
  plugins: [require("tailwindcss-animate"), flowbite.plugin()],
} satisfies Config;

export default config;
