import { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import { ProjectEntryProps } from "@/types";
import { useWidthContext } from "@/context/WidthContext";
import ProjectIcon from "./ProjectIcon";
import ProjectIconImageDetail from "./ProjectIconImageDetail";
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
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const calculateDynamicGap = (width: number) => {
        const minWidth = 100;
        const maxWidth = 800;
        const dynamicGap =
            40 - Math.pow((width - minWidth) / (maxWidth - minWidth), 2) * 35;
        return Math.max(5, Math.min(40, dynamicGap));
    };

    const toggleProject = (idx: number) => {
        setIsOpen((prev) => ({
            ...prev,
            [idx]: !prev[idx],
        }));
    };

    const nodeRef = useRef(null);

    useEffect(() => {
        // Load position from localStorage on component mount
        const savedPosition = localStorage.getItem("draggablePosition");
        if (savedPosition) {
            setPosition(JSON.parse(savedPosition));
        }
    }, []);

    const handleDrag = (e: Event, ui: any) => {
        // Update position in state during dragging
        setPosition({ x: ui.x, y: ui.y });
    };

    const handleDragStop = () => {
        // Save position to localStorage after dragging stops
        localStorage.setItem("draggablePosition", JSON.stringify(position));
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
                            nodeRef={nodeRef}
                            onDrag={handleDrag as any}
                            onStop={handleDragStop}
                            position={position}
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
                                ref={nodeRef}
                            >
                                <Image
                                    draggable="false"
                                    src="/folder.svg"
                                    alt="folderIcon"
                                    width={1000}
                                    height={1000}
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
                            <div
                                className="px-2 py-2 grid"
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
                                            onClick={() => setProjectItem(item)}
                                        >
                                            <ProjectIcon
                                                item={item}
                                                setProjectItem={setProjectItem}
                                                setShowImageDetail={
                                                    setShowImageDetail
                                                }
                                            />
                                        </div>
                                    )
                                )}
                            </div>
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
