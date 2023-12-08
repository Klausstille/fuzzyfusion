import React, { useState, useRef, useEffect } from "react";
import { DraggableEvent, DraggableData } from "react-draggable";
import Draggable from "react-draggable";
import { ProjectEntryProps } from "@/types";
import { useWidthContext } from "@/context/WidthContext";
import ProjectIcon from "./ProjectIcon";
import ProjectIconImageDetail from "./ProjectIconImageDetail";
import { handleDrag, handleDragStop } from "@/utils/dragUtils";
import { calculateDynamicGap } from "@/utils/helper";
import BackIcon from "./BackIcon";
import Image from "next/image";

export default function ProjectIconEntry({
    setProjectItem,
    projectItem,
    dummyData,
    exifData,
}: ProjectEntryProps) {
    const { width } = useWidthContext();
    const [showImageDetail, setShowImageDetail] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<{ [key: number]: boolean }>({});
    const [positions, setPositions] = useState<{ x: number; y: number }[]>(
        Array(dummyData.length).fill({ x: 0, y: 0 })
    );

    const toggleProject = (idx: number) => {
        setIsOpen((prev) => ({
            ...prev,
            [idx]: !prev[idx],
        }));
    };

    const nodeRefs = useRef<Array<React.RefObject<HTMLElement>>>(
        dummyData.map(() => React.createRef())
    );

    useEffect(() => {
        const savedPositions = JSON.parse(
            localStorage.getItem("draggablePositions") || ""
        ) as { x: number; y: number }[];
        if (savedPositions) {
            setPositions(savedPositions);
        }
    }, []);

    const handleDragWrapper = (e: Event, ui: any, idx: number) => {
        handleDrag(positions, setPositions, ui, idx);
    };
    const handleDragStopWrapper = () => {
        handleDragStop(positions);
    };

    return (
        <>
            <section
                className="px-2 py-2"
                style={{
                    gridTemplateColumns: `repeat(auto-fill, minmax(${width}px,1fr))`,
                    gap: `${calculateDynamicGap(width)}px`,
                    display: Object.values(isOpen).some((open) => open)
                        ? "block"
                        : "grid",
                }}
            >
                {dummyData.map((item, idx) => (
                    <div key={idx}>
                        <Draggable
                            nodeRef={nodeRefs.current[idx]}
                            onDrag={(e: any, ui: any) =>
                                handleDragWrapper(e, ui, idx)
                            }
                            onStop={(e: DraggableEvent, ui: DraggableData) =>
                                handleDragStopWrapper()
                            }
                            position={positions[idx]}
                        >
                            <div
                                className="active:cursor-grabbing hover:cursor-grab"
                                onDoubleClick={() => toggleProject(idx)}
                                style={{
                                    display: Object.values(isOpen).some(
                                        (open) => open
                                    )
                                        ? "none"
                                        : "block",
                                }}
                                ref={nodeRefs.current[idx] as any}
                            >
                                <Image
                                    draggable="false"
                                    src="/folder.svg"
                                    alt="folderIcon"
                                    width={1000}
                                    height={1000}
                                    priority
                                />
                                <h1
                                    className="w-[150px]"
                                    style={{
                                        width: `${width}px`,
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                    }}
                                >
                                    {item.title}
                                </h1>
                            </div>
                        </Draggable>
                        {isOpen[idx] && (
                            <>
                                <div className="fixed top-0 left-0 w-full h-8 pt-2 pl-4 flex items-center gap-6">
                                    <div
                                        className="flex gap-2 items-center font-bold cursor-pointer"
                                        onClick={() => setIsOpen({})}
                                    >
                                        <BackIcon /> BACK
                                    </div>
                                    <p className="text-dark-gray">
                                        ../{dummyData[idx].title}
                                    </p>
                                </div>
                                <div
                                    className="px-2 py-10 grid"
                                    style={{
                                        gridTemplateColumns: `repeat(auto-fill, minmax(${width}px,1fr))`,
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
