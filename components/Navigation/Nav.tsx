import { useProjectLayoutStore, setLayoutProps } from "@/stores/projectLayout";
import { useColorThemeStore, DarkTheme } from "@/stores/colorTheme";

export default function Nav() {
    const { setLayout, layout } = useProjectLayoutStore() as setLayoutProps;
    const { darkTheme } = useColorThemeStore() as DarkTheme;
    const renderNavItem = (type: "LIST" | "ICONS") => (
        <li
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setLayout(type)}
        >
            <button
                className={`dot ${
                    layout === type
                        ? darkTheme
                            ? "bg-white"
                            : "bg-black"
                        : darkTheme
                        ? "bg-black border-real-black border-[1px]"
                        : "bg-white border-gray border-[1px]"
                }`}
            />
            <p>{type}</p>
        </li>
    );

    return (
        <nav className="col-span-7">
            <ul className="flex gap-8">
                SHOW ITEMS AS
                {renderNavItem("LIST")}
                {renderNavItem("ICONS")}
            </ul>
        </nav>
    );
}
