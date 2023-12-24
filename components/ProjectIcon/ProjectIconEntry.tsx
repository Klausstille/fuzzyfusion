import { useState, useEffect } from "react";
import { ProjectEntryProps } from "@/types";
import { useWidthContext } from "@/context/WidthContext";
import ProjectIcon from "./ProjectIcon";
import ProjectIconImageDetail from "./ProjectIconImageDetail";
import { calculateDynamicGap } from "@/utils/helper";
import BackIcon from "./BackIcon";
import { useColorThemeStore, DarkTheme } from "@/stores/colorTheme";
import GetWindowDimensions from "../shared/getWindowDimensions";
import DraggableItem from "./DraggableItem";
import Image from "next/image";

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
    const [showFolder, setShowFolder] = useState<{ [key: number]: boolean }>(
        {}
    );
    const darkTheme = useColorThemeStore(
        (state: unknown) => (state as DarkTheme).darkTheme
    );

    const isAnyProjectOpen = Object.values(isOpen).some((open) => open);

    return (
        <>
            <section
                className="px-2 py-2 flex gap-2 content-start flex-wrap h-[calc(100vh-2rem)] overflow-scroll overflow-x-hidden"
                style={{
                    gap: `${calculateDynamicGap(width)}px`,
                    display: Object.values(isOpen).some((open) => open)
                        ? "block"
                        : "flex",
                }}
                onClick={() => setShowFolder({})}
            >
                {!isAnyProjectOpen && (
                    <div
                        className={`fixed top-0 right-0 h-screen w-screen flex justify-center text-[black] pointer-events-none`}
                    >
                        <Image
                            className="h-screen object-contain object-center"
                            src={darkTheme ? "/logo-w.png" : "/logo-b.png"}
                            alt="logo"
                            width={1000}
                            height={1000}
                            priority
                        />
                        <p className="fixed top-3 w-full flex justify-center text-[9px] pointer-events-none text-dark-gray max-tablet:hidden">
                            Built with much {darkTheme ? "🤍" : "🖤"} by Klaus
                            Stille
                        </p>
                    </div>
                )}
                {projects.map((item, idx) => (
                    <div key={idx}>
                        <DraggableItem
                            setIsOpen={setIsOpen}
                            idx={idx}
                            title={item.title}
                            isOpen={isOpen}
                            setShowFolder={setShowFolder}
                            showFolder={showFolder}
                        />
                        {isOpen[idx] && (
                            <>
                                <div className="fixed max-tablet:top-3 top-2 left-2 w-full flex items-center gap-6 max-tablet:justify-between">
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
                                    className={`${
                                        darkTheme ? "bg-black" : "bg-light-gray"
                                    } px-2 py-8 max-tablet:py-10 grid h-full min-h-[calc(100vh-3rem)] content-start`}
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
