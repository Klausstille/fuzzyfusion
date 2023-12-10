import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
interface LogoProps {
    setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
    darkTheme: boolean;
}

export default function Logo({ setDarkTheme, darkTheme }: LogoProps) {
    const [hasLoaded, setHasLoaded] = useState(false);
    useEffect(() => {
        setHasLoaded(true);
    }, [hasLoaded]);

    return (
        <div className="col-span-2 flex items-center h-6">
            <Link
                href="/"
                className="text-sm-heading font-black focus:outline-none pr-2"
            >
                <Image
                    src={darkTheme ? "/logo-w.png" : "/logo-b.png"}
                    alt="logo"
                    width={150}
                    height={10}
                />
            </Link>
            <span
                className="text-xs cursor-pointer"
                onClick={() => setDarkTheme((toggle: boolean) => !toggle)}
            >
                / {darkTheme && hasLoaded ? "LIGHT" : "DARK"}
            </span>
        </div>
    );
}
