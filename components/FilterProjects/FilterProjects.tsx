import { useState, useEffect, useRef } from "react";
import { useColorThemeStore } from "@/stores/colorTheme";
import FilterEntryComponent from "./FilterEntryComponent";
import MenuIcon from "./MenuIcon";

export interface FilterProjectsProps {
    onFilterFavorites: () => void;
    setFilterIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FilterProjects({
    onFilterFavorites,
    setFilterIsActive,
}: FilterProjectsProps) {
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => setIsOpen(!isOpen);
    const darkTheme = useColorThemeStore(
        (state: unknown) => (state as any).darkTheme
    );
    const menuRef = useRef<HTMLDivElement>(null);

    const handleBackgroundClick = (event: MouseEvent) => {
        const clickedElement = event.target as HTMLElement;

        if (
            menuRef.current &&
            !menuRef.current.contains(event.target as Node) &&
            !clickedElement.classList.contains("menu-button")
        ) {
            setIsOpen(false);
            console.log("click outside");
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleBackgroundClick);
        return () => {
            document.removeEventListener("click", handleBackgroundClick);
        };
    }, []);

    return (
        <>
            <h1
                className={`menu-button fixed bottom-0 right-0 py-2 px-2 z-40 text-m cursor-pointer`}
                onClick={handleClick}
            >
                MENU
            </h1>
            <section
                className={`${
                    isOpen ? "menu-open" : "menu-closed"
                } transition-opacity duration-[.2s] ease-in-out fixed w-1/5 bottom-2 pr-2 right-2 py-2 px-2 ${
                    darkTheme ? "bg-real-black" : "bg-white"
                } h-[calc(100vh-1rem)] overflow-scroll z-40 rounded-md`}
                ref={menuRef}
            >
                <MenuIcon
                    isOpen={isOpen}
                    handleClick={handleClick}
                    darkTheme={darkTheme}
                />
                <FilterEntryComponent
                    darkTheme={darkTheme}
                    onFilterFavorites={onFilterFavorites}
                    setFilterIsActive={setFilterIsActive}
                />
            </section>
        </>
    );
}
