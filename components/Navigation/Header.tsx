"use client";
import Logo from "./Logo";
import Nav from "./Nav";
import ScaleIcons from "./ScaleIcons";
import { useProjectLayoutStore, setLayoutProps } from "@/stores/projectLayout";
import { useColorThemeStore, DarkTheme } from "@/stores/colorTheme";

export default function Header() {
    const darkTheme = useColorThemeStore(
        (state: unknown) => (state as DarkTheme).darkTheme
    );
    const toggleDarkTheme = useColorThemeStore(
        (state: unknown) => (state as DarkTheme).toggleDarkTheme
    );
    const { layout } = useProjectLayoutStore() as setLayoutProps;
    return (
        <header
            className={`${
                darkTheme ? "bg-black text-white" : "bg-light-gray text-black"
            } grid grid-cols-12 fixed left-0 bottom-0 w-full z-30 items-center px-2 py-2 text-m 
            `}
        >
            <Logo toggleDarkTheme={toggleDarkTheme} darkTheme={darkTheme} />
            <Nav />
            {layout === "ICONS" && <ScaleIcons />}
        </header>
    );
}
