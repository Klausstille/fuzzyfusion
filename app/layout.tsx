"use client";
import type { Metadata } from "next";
import Head from "next/head";
import { Inter } from "next/font/google";
import Header from "@/components/Navigation/Header";
import { WidthProvider } from "@/context/WidthContext";
import { useColorThemeStore, DarkTheme } from "@/stores/colorTheme";
import { useEffect, useState } from "react";
import "../styles/index.css";

const metadata: Metadata = {
    title: "FUZZYFUSION",
    description: "A FUZZY FUSION of art and technology",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [hasLoaded, setHasLoaded] = useState(false);
    const { darkTheme } = useColorThemeStore(
        (state: unknown) => state as DarkTheme
    );
    useEffect(() => {
        setHasLoaded(true);
    }, [hasLoaded]);
    return (
        <html lang="en">
            <Head>
                <title>{metadata.title as string}</title>
                <meta
                    name="description"
                    content={metadata.description as string}
                />
            </Head>
            <body
                className={`flex flex-col h-screen ${inter.className} ${
                    hasLoaded && darkTheme
                        ? "bg-black text-white "
                        : "bg-light-gray text-black "
                }`}
            >
                <WidthProvider>
                    <Header />
                    <main className="flex flex-col text-xs">{children}</main>
                </WidthProvider>
            </body>
        </html>
    );
}
