import { useEffect } from "react";
import { CommonImageModule } from "./CommonImageModule";
import { ActiveIndex } from "@/types";

interface CommonImageModuleComponentProps {
    setIsShown: (item: boolean) => void;
    activeIndex: ActiveIndex | number;
    setActiveIndex?: (item: ActiveIndex | number) => void;
}

export default function CommonImageModuleComponent({
    setIsShown,
    activeIndex,
    setActiveIndex,
}: CommonImageModuleComponentProps) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            event.stopPropagation();
            if (event.key === "Escape") {
                setIsShown(false);
                setActiveIndex && setActiveIndex(-1);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [setIsShown, setActiveIndex]);
    return (
        <section
            className="z-[999]"
            onClick={() => {
                setIsShown(false);
                setActiveIndex && setActiveIndex(-1);
            }}
        >
            <CommonImageModule
                srcUrl={typeof activeIndex === "object" ? activeIndex.url : ""}
                altText={typeof activeIndex === "object" ? activeIndex.alt : ""}
                width={typeof activeIndex === "object" ? activeIndex.width : 0}
                height={
                    typeof activeIndex === "object" ? activeIndex.height : 0
                }
            />
        </section>
    );
}
