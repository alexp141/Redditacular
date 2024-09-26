import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";
//["010400","30332e","fffbfc","62bbc1","ec058e"]

const config = withUt({
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: "true",
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        black: {
          DEFAULT: "#010400",
          100: "#000100",
          200: "#010200",
          300: "#010300",
          400: "#010400",
          500: "#010400",
          600: "#1b6a00",
          700: "#34cf00",
          800: "#68ff35",
          900: "#b3ff9a",
        },
        black_olive: {
          DEFAULT: "#30332e",
          100: "#0a0a09",
          200: "#131412",
          300: "#1d1f1c",
          400: "#262925",
          500: "#30332e",
          600: "#595e55",
          700: "#82897d",
          800: "#acb1a8",
          900: "#d5d8d4",
        },
        snow: {
          DEFAULT: "#fffbfc",
          100: "#650019",
          200: "#ca0032",
          300: "#ff3064",
          400: "#ff95af",
          500: "#fffbfc",
          600: "#fffbfc",
          700: "#fffcfd",
          800: "#fffdfd",
          900: "#fffefe",
        },
        verdigris: {
          DEFAULT: "#62bbc1",
          100: "#11282a",
          200: "#215053",
          300: "#32787d",
          400: "#42a0a6",
          500: "#62bbc1",
          600: "#82c8cd",
          700: "#a1d6d9",
          800: "#c0e3e6",
          900: "#e0f1f2",
        },
        hollywood_cerise: {
          DEFAULT: "#ec058e",
          100: "#2f011d",
          200: "#5e0239",
          300: "#8d0356",
          400: "#bc0472",
          500: "#ec058e",
          600: "#fb2ba8",
          700: "#fc60bd",
          800: "#fd95d3",
          900: "#fecae9",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}) satisfies Config;

export default config;
