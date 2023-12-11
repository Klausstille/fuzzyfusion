import type { Config } from "tailwindcss";
const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        screens: {
            tablet: "768px",
            desktop: "1150px",
            "desktop-s": "1250px",
            "desktop-m": "1400px",
            "desktop-l": "1600px",
            "desktop-xl": "1800px",
        },
        colors: {
            white: "#ffffff",
            black: "#303030",
            "real-black": "#252525",
            gray: "#e4e4e4",
            "dark-gray": "#b4b4b4",
            "light-gray": "#F8F8F8",
            accent: "tomato",
            lime: "lime",
            yellow: "#FFD15D",
            red: "#E32250",
            blue: "blue",
        },
        fontSize: {
            "rating-xxl": [
                "5.5rem",
                {
                    letterSpacing: "1px",
                    lineHeight: "6.25rem",
                    fontWeight: 600,
                },
            ], // 88px, 100px
            "xxl-heading": [
                "5.5rem", // 120px
                {
                    letterSpacing: "1px",
                    lineHeight: "4rem",
                    fontWeight: 100,
                }, // 148px
            ],
            "xl-heading": [
                "3.75rem",
                { letterSpacing: "0", lineHeight: "4.375rem", fontWeight: 300 },
            ], // 60px, 70px
            "l-heading": [
                "2.8125rem",
                {
                    letterSpacing: "1px",
                    lineHeight: "3.4375rem",
                    fontWeight: 400,
                },
            ], // 45px, 55px
            "m-heading": [
                "2.1875rem",
                {
                    letterSpacing: "1px",
                    lineHeight: "2.6875rem",
                    fontWeight: 400,
                },
            ], // 35px, 43px
            "s-heading": [
                "1.75rem",
                {
                    letterSpacing: "1px",
                    lineHeight: "2.125rem",
                    fontWeight: 200,
                },
            ], // 28px, 34px
            "xs-heading": [
                "1.5625rem",
                {
                    letterSpacing: "1px",
                    lineHeight: "1.9375rem",
                    fontWeight: 400,
                },
            ], // 25px, 31px

            m: [
                "1rem",
                { letterSpacing: "0", lineHeight: "1.325rem", fontWeight: 400 },
            ], // 18px, 26px
            "m-bold": [
                "1.125rem",
                { letterSpacing: "0", lineHeight: "1.625rem", fontWeight: 400 },
            ], // 18px, 26px
            s: [
                "0.85rem",
                { letterSpacing: "0", lineHeight: "1.1rem", fontWeight: 400 },
            ], // 16px, 24px
            "s-bold": [
                "0.85rem",
                { letterSpacing: "0", lineHeight: "1.1rem", fontWeight: 400 },
            ], // 16px, 24px
            xs: ["0.7rem", { letterSpacing: "0", fontWeight: 400 }], // 14px, 20px
            "html-default": "16px",
            "html-xs": "12px",
            "html-s": "13px",
            "html-m": "14px",
            "html-l": "15px",
        },
        extend: {
            aspectRatio: {
                "16/9": "16 / 9",
                "6/4": "6 / 4",
                "3/4": "3 / 4",
            },
            padding: {
                "100%": "100%",
                "125%": "125%",
                "50%": "50%", // used for 1:2 aspect ratio
                "56%": "56%", // used for 1:1.8 aspect ratio
                "26px": "1.625rem",
                header: "1rem",
                "header-desktop": "6rem",
                "button-x": "2.5rem", // 40px
                "content-x": ".75rem", // 48px
                "content-x-desktop": "12.5rem", // 200px
                "content-y": "1.75rem", // 60px
                "content-y-desktop": "5rem", // 80px
            },
        },
    },
    plugins: [],
};
export default config;
