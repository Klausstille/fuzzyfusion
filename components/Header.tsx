"use client";
import Logo from "./Logo";
import Nav from "./Nav";
import { useWidthContext } from "@/context/WidthContext";

export default function Header() {
    const { onWidthChange } = useWidthContext();
    return (
        <header className="grid grid-cols-[250px,1fr,1fr] py-1 px-4 fixed bottom-0 w-full z-30 items-center bg-[#e8e8e8] h-10 max-tablet:grid-cols-2">
            <Logo />
            <Nav />
            <div className="scaleProjects px-4 z-50 flex gap-3 max-tablet:hidden">
                IMAGE SIZE 200px
                <input
                    className="w-[150px]"
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
