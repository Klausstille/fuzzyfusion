import { useState } from "react";
import { useColorThemeStore } from "@/stores/colorTheme";
import FilterEntryComponent from "./FilterEntryComponent";

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
    return (
        <>
            <section
                className={`${
                    isOpen ? "opacity-100" : "opacity-0"
                } transition-opacity duration-[.2s] ease-in-out fixed w-1/5 bottom-0 pr-2 right-0 py-2 px-2 ${
                    darkTheme ? "bg-real-black" : "bg-white"
                } h-full overflow-scroll`}
            >
                <FilterEntryComponent
                    darkTheme={darkTheme}
                    onFilterFavorites={onFilterFavorites}
                    setFilterIsActive={setFilterIsActive}
                />
            </section>
            <h1
                className={`fixed bottom-0 right-0 py-2 px-2 z-50 text-m cursor-pointer`}
                onClick={handleClick}
            >
                MENU
            </h1>
            {/* <MenuIcon
                isOpen={isOpen}
                handleClick={handleClick}
                darkTheme={darkTheme}
            /> */}
        </>
    );
}
