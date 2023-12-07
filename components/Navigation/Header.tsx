"use client";
import Logo from "./Logo";
import Nav from "./Nav";
import ScaleIcons from "./ScaleIcons";
import { useProjectLayoutStore, setLayoutProps } from "@/stores/projectLayout";

export default function Header() {
    const { layout } = useProjectLayoutStore() as setLayoutProps;
    return (
        <header className="grid grid-cols-12 fixed left-0 bottom-0 w-full z-30 items-center px-4 py-2 text-m bg-white">
            <Logo />
            <Nav />
            {layout === "ICONS" && <ScaleIcons />}
        </header>
    );
}
