import React, { useState } from "react";
import { ProjectEntryProps } from "@/types";
import { useWidthContext } from "@/context/WidthContext";
import ProjectIcon from "./ProjectIcon";
import ProjectIconImageDetail from "./ProjectIconImageDetail";
import { calculateDynamicGap } from "@/utils/helper";
import BackIcon from "./BackIcon";
import { useColorThemeStore, DarkTheme } from "@/stores/colorTheme";
import GetWindowDimensions from "../shared/getWindowDimensions";
import DraggableItem from "./DraggableItem";

export default function ProjectIconEntry({
    setProjectItem,
    projectItem,
    projects,
    exifData,
}: ProjectEntryProps) {
    const { windowWidth } = GetWindowDimensions();
    const { width } = useWidthContext();
    const [showImageDetail, setShowImageDetail] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<{ [key: number]: boolean }>({});
    const darkTheme = useColorThemeStore(
        (state: unknown) => (state as DarkTheme).darkTheme
    );

    return (
        <>
            <section
                className="px-2 py-2 grid grid-cols-12 gap-2 max-tablet:grid-cols-3 h-screen overflow-scroll overflow-x-hidden"
                style={{
                    gap: `${calculateDynamicGap(width)}px`,
                    display: Object.values(isOpen).some((open) => open)
                        ? "block"
                        : "grid",
                }}
            >
                {projects.map((item, idx) => (
                    <div key={idx}>
                        <DraggableItem
                            setIsOpen={setIsOpen}
                            idx={idx}
                            title={item.title}
                            isOpen={isOpen}
                        />
                        {isOpen[idx] && (
                            <>
                                <div className="fixed top-2 left-2 w-full flex items-center gap-6 max-tablet:justify-between">
                                    <div
                                        className="flex gap-2 items-center font-bold cursor-pointer max-tablet:text-xs-heading"
                                        onClick={() => setIsOpen({})}
                                    >
                                        <BackIcon darkTheme={darkTheme} /> BACK
                                    </div>
                                    <p className="text-dark-gray max-tablet:self-end max-tablet:pb-[2px] max-tablet:pr-4">
                                        ../{projects[idx].title}
                                    </p>
                                </div>
                                <div
                                    className="py-8 grid"
                                    style={{
                                        gridTemplateColumns: `repeat(auto-fill, minmax(${
                                            windowWidth > 768 ? width : 300
                                        }px,1fr))`,
                                        gap: `${calculateDynamicGap(width)}px`,
                                    }}
                                    key={idx}
                                >
                                    {item.imagesCollection.items.map(
                                        (item, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() =>
                                                    setProjectItem(item)
                                                }
                                            >
                                                <ProjectIcon
                                                    item={item}
                                                    setProjectItem={
                                                        setProjectItem
                                                    }
                                                    setShowImageDetail={
                                                        setShowImageDetail
                                                    }
                                                />
                                            </div>
                                        )
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </section>
            {showImageDetail && (
                <ProjectIconImageDetail
                    projectItem={projectItem}
                    setShowImageDetail={setShowImageDetail}
                    exifData={exifData}
                />
            )}
        </>
    );
}
