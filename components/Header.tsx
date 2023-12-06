"use client";
import Logo from "./Logo";
import Nav from "./Nav";
import { useWidthContext } from "@/context/WidthContext";

export default function Header() {
    const { onWidthChange } = useWidthContext();
    return (
        <header className="grid grid-cols-10 fixed left-0 bottom-0 w-full z-30 items-center px-4 py-2 text-m ">
            <Logo />
            <Nav />
            <div className="scaleProjects z-50 gap-3 max-desktop:hidden flex justify-self-end col-span-5">
                IMAGE SIZE 200px
                <input
                    className="w-[300px]"
                    onChange={(e) => onWidthChange(e)}
                    type="range"
                    defaultValue={200}
                    min="200"
                    max="700"
                />{" "}
                700px
            </div>
        </header>
    );
}
