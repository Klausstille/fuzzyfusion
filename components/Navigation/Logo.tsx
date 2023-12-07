import Link from "next/link";

export default function Logo() {
    return (
        <Link
            href="/"
            className="text-sm-heading font-black col-span-2 focus:outline-none"
        >
            FUZZYFUSION
        </Link>
    );
}
