import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Navigation/Header";
import { WidthProvider } from "@/context/WidthContext";
import "../styles/index.css";

export const metadata: Metadata = {
    title: "FUZZYFUSION",
    description: "A FUZZY FUSION of art and technology",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={`flex flex-col h-screen ${inter.className} text-black`}
            >
                <WidthProvider>
                    <Header />
                    <main className="flex flex-col flex-grow text-xs bg-light-gray">
                        {children}
                    </main>
                </WidthProvider>
            </body>
        </html>
    );
}
