import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Header from "@/components/Navigation/Header";
import { WidthProvider } from "@/context/WidthContext";
import "../styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "FUZZYFUSION",
    description:
        "Crafting exposures that resonate deeply with human emotions, we strive to capture the essence of genuine connection and shared experiences.",
};
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={`flex flex-col h-screen bg-light-gray ${inter.className}`}
            >
                <WidthProvider>
                    <Header />
                    <main className="flex flex-col text-xs">{children}</main>
                </WidthProvider>
            </body>
        </html>
    );
}
