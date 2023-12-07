import { useWidthContext } from "@/context/WidthContext";

export default function ScaleIcons() {
    const { onWidthChange } = useWidthContext();
    return (
        // <div className="scaleProjects z-50 gap-3 max-desktop:hidden col-span-5 flex items-center">
        <div className="scaleProjects z-50 gap-3 max-desktop:hidden flex absolute right-2 items-center">
            <span className="pr-4">IMAGE SIZE</span>200px
            <input
                className="w-[200px]"
                onChange={(e) => onWidthChange(e)}
                type="range"
                defaultValue={250}
                min="100"
                max="800"
            />{" "}
            800px
        </div>
    );
}
