import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { WidthProvider } from "@/context/WidthContext";
import "../styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "FUZZYFUSION",
    description: "",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <WidthProvider>
            <html lang="en">
                <body
                    className={`flex flex-col h-screen ${inter.className} text-black`}
                >
                    <Header />
                    <main className="flex flex-col flex-grow text-xs">
                        {children}
                    </main>
                </body>
            </html>
        </WidthProvider>
    );
}
