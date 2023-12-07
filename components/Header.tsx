"use client";
import Logo from "./Logo";
import Nav from "./Nav";
import { useWidthContext } from "@/context/WidthContext";

export default function Header() {
    const { onWidthChange } = useWidthContext();
    return (
        <header className="grid grid-cols-12 fixed left-0 bottom-0 w-full z-30 items-center px-4 py-2 text-m bg-white">
            <Logo />
            <Nav />
            <div className="scaleProjects z-50 gap-3 max-desktop:hidden col-span-5 flex items-center">
                IMAGE SIZE 200px
                <input
                    className="w-[250px]"
                    onChange={(e) => onWidthChange(e)}
                    type="range"
                    defaultValue={200}
                    min="100"
                    max="800"
                />{" "}
                800px
            </div>
        </header>
    );
}
