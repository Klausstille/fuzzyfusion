import Link from "next/link";
interface LogoProps {
    setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
    darkTheme: boolean;
}

export default function Logo({ setDarkTheme, darkTheme }: LogoProps) {
    return (
        <div className="col-span-2">
            <Link
                href="/"
                className="text-sm-heading font-black focus:outline-none pr-2"
            >
                FUZZYFUSION
            </Link>
            <span
                className="text-xs cursor-pointer"
                onClick={() => setDarkTheme((toggle: boolean) => !toggle)}
            >
                / {darkTheme ? "LIGHT" : "DARK"}
            </span>
        </div>
    );
}
