"use client";
// import type { Metadata } from "next";
import Head from "next/head";
import { Inter } from "next/font/google";
import Header from "@/components/Navigation/Header";
import { WidthProvider } from "@/context/WidthContext";
import { useColorThemeStore } from "@/stores/colorTheme";
import "../styles/index.css";

// export const metadata: Metadata = {
//     title: "FUZZYFUSION",
//     description: "A FUZZY FUSION of art and technology",
// };

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const darkTheme = useColorThemeStore(
        (state: unknown) => (state as any).darkTheme
    );
    return (
        <html lang="en">
            <Head>
                <title>FUZZYFUSION</title>
                <meta
                    name="description"
                    content="A FUZZY FUSION of art and technology"
                />
                <link rel="icon" href="/SOMEICOOOONN.ico" />
            </Head>
            <body
                className={`flex flex-col h-screen ${inter.className} ${
                    darkTheme
                        ? "bg-black text-white "
                        : "bg-light-gray text-black "
                }`}
            >
                <WidthProvider>
                    <Header />
                    <main className="flex flex-col flex-grow text-xs">
                        {children}
                    </main>
                </WidthProvider>
            </body>
        </html>
    );
}
