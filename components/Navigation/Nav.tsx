import { useProjectLayoutStore, setLayoutProps } from "@/stores/projectLayout";
import { useColorThemeStore, DarkTheme } from "@/stores/colorTheme";
import { useEffect, useState } from "react";

export default function Nav() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const { setLayout, layout } = useProjectLayoutStore() as setLayoutProps;
    const { darkTheme } = useColorThemeStore() as DarkTheme;
    useEffect(() => {
        setHasLoaded(true);
    }, [hasLoaded]);
    const renderNavItem = (type: "LIST" | "ICONS") => (
        <li
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setLayout(type)}
        >
            <button
                className={`dot ${
                    layout === type
                        ? darkTheme && hasLoaded
                            ? "bg-white"
                            : "bg-black"
                        : darkTheme && hasLoaded
                        ? "bg-black border-real-black border-[1px]"
                        : "bg-white border-gray border-[1px]"
                }`}
            />
            <p>{type}</p>
        </li>
    );

    return (
        <nav className="col-span-7 max-tablet:hidden">
            <ul className="flex gap-8 max-desktop:text-xs">
                SHOW ITEMS AS
                {renderNavItem("LIST")}
                {renderNavItem("ICONS")}
            </ul>
        </nav>
    );
}
