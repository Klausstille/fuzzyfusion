import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
interface LogoProps {
    toggleDarkTheme: () => void;
    darkTheme: boolean;
}

export default function Logo({ toggleDarkTheme, darkTheme }: LogoProps) {
    const [hasLoaded, setHasLoaded] = useState(false);
    useEffect(() => {
        setHasLoaded(true);
    }, [hasLoaded]);

    return (
        <div className="col-span-2 max-desktop:col-span-3 max-tablet:col-span-12 flex items-center h-6">
            <Link
                href="/"
                className="text-sm-heading font-black focus:outline-none pr-2"
            >
                <Image
                    src={darkTheme && hasLoaded ? "/logo-w.png" : "/logo-b.png"}
                    alt="logo"
                    width={150}
                    height={10}
                />
            </Link>
            <span
                className="text-xs cursor-pointer"
                onClick={toggleDarkTheme}
                style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                }}
            >
                / {darkTheme && hasLoaded ? "LIGHT" : "DARK"}
            </span>
        </div>
    );
}
