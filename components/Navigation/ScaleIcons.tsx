import { useWidthContext } from "@/context/WidthContext";
import { useColorThemeStore } from "@/stores/colorTheme";

export default function ScaleIcons() {
    const { onWidthChange } = useWidthContext();

    const isDarkMode = useColorThemeStore(
        (state: unknown) => (state as any).darkTheme
    );

    return (
        <div className="scaleProjects z-50 gap-3 max-desktop:hidden flex absolute right-2 items-center">
            <span className="pr-4">IMAGE SIZE</span>200px
            <input
                className="w-[200px]"
                style={{ backgroundColor: isDarkMode ? "#F8F8F8" : "#303030" }}
                onChange={(e) => onWidthChange(e)}
                type="range"
                defaultValue={100}
                min="100"
                max="800"
            />{" "}
            800px
        </div>
    );
}
