import { useState } from "react";
import MenuIcon from "./MenuIcon";
import { useColorThemeStore } from "@/stores/colorTheme";

export default function FilterProjects() {
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => setIsOpen(!isOpen);
    const darkTheme = useColorThemeStore(
        (state: unknown) => (state as any).darkTheme
    );
    return (
        <>
            <section
                className={`filter-projects ${
                    isOpen ? "open" : "closed"
                } fixed w-1/5 top-0 pt-2 pr-2 right-0 px-2 ${
                    darkTheme ? "bg-black" : "bg-light-gray"
                }`}
            >
                <h1
                    className="text-m"
                    onClick={handleClick}
                    style={{ display: isOpen ? "block" : "none" }}
                >
                    MENU
                </h1>
            </section>
            <MenuIcon
                isOpen={isOpen}
                handleClick={handleClick}
                darkTheme={darkTheme}
            />
        </>
    );
}
