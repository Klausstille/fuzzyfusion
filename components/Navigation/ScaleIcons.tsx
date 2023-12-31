import { useWidthContext } from "@/context/WidthContext";
import { useColorThemeStore } from "@/stores/colorTheme";
import GetWindowDimensions from "../shared/getWindowDimensions";

export default function ScaleIcons() {
    const { onWidthChange } = useWidthContext();
    const { width } = useWidthContext();
    const { windowWidth } = GetWindowDimensions();
    const isDarkMode = useColorThemeStore(
        (state: unknown) => (state as any).darkTheme
    );

    return (
        <div className="scaleProjects z-50 gap-3 max-desktop:hidden flex absolute right-36 items-center">
            <span className="pr-4">IMAGE SIZE</span>100px
            <input
                className="w-[200px]"
                style={{ backgroundColor: isDarkMode ? "#F8F8F8" : "#303030" }}
                onChange={(e) => onWidthChange(e)}
                type="range"
                defaultValue={width}
                min="100"
                max={`${windowWidth > 1600 ? 1000 : 800}`}
            />{" "}
            {windowWidth > 1600 ? "1000" : "800"}px
        </div>
    );
}
