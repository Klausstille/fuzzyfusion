import React, { useState, useRef, useEffect } from "react";
import FolderIcon from "@/components/ProjectShared/folderIcon";
import { DraggableEvent, DraggableData } from "react-draggable";
import { handleDrag, handleDragStop } from "@/utils/dragUtils";
import Draggable from "react-draggable";
import { useColorThemeStore, DarkTheme } from "@/stores/colorTheme";
import { useProjectStore, ProjectStore } from "@/stores/projects";
import { useWidthContext } from "@/context/WidthContext";
import GetWindowDimensions from "../shared/getWindowDimensions";

interface DraggableItemProps {
    setIsOpen: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
    idx: number;
    title: string;
    isOpen: { [key: number]: boolean };
}

export default function DraggableItem({
    setIsOpen,
    idx,
    title,
    isOpen,
}: DraggableItemProps) {
    const { width } = useWidthContext();
    const { windowWidth } = GetWindowDimensions();
    const { darkTheme } = useColorThemeStore() as DarkTheme;
    const { projects } = useProjectStore() as ProjectStore;
    const [positions, setPositions] = useState<{ x: number; y: number }[]>(
        Array(projects.length).fill({ x: 0, y: 0 })
    );

    const toggleProject = (idx: number) => {
        setIsOpen((prev: any) => ({
            ...prev,
            [idx]: !prev[idx],
        }));
    };

    const nodeRefs = useRef<Array<React.RefObject<HTMLElement>>>(
        projects.map(() => React.createRef())
    );

    useEffect(() => {
        const savedPositions = JSON.parse(
            localStorage.getItem("draggablePositions") || "[]"
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
    return windowWidth > 768 ? (
        <Draggable
            nodeRef={nodeRefs.current[idx]}
            onDrag={(e: any, ui: any) => handleDragWrapper(e, ui, idx)}
            onStop={(e: DraggableEvent, ui: DraggableData) =>
                handleDragStopWrapper()
            }
            position={positions[idx]}
        >
            <div
                className="active:cursor-grabbing hover:cursor-grab min-w-[50px]"
                onDoubleClick={() => toggleProject(idx)}
                style={{
                    display: Object.values(isOpen).some((open) => open)
                        ? "none"
                        : "block",
                }}
                ref={nodeRefs.current[idx] as any}
            >
                <FolderIcon darkTheme={darkTheme} />
                <div
                    className="w-[150px] pt-2"
                    style={{
                        lineHeight: "1rem",
                        textShadow: `0.5px 0.5px 1.5px ${
                            darkTheme ? "#303030" : "white"
                        }`,
                    }}
                >
                    <h1
                        style={{
                            width: `${width - 10}px`,
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                        }}
                    >
                        {title}
                    </h1>
                    <h1 className="text-dark-gray">
                        {projects[idx].imagesCollection.items.length} item
                        {projects[idx].imagesCollection.items.length > 1 && "s"}
                    </h1>
                </div>
            </div>
        </Draggable>
    ) : (
        <div
            className="active:cursor-grabbing hover:cursor-grab min-w-[50px]"
            onClick={() => toggleProject(idx)}
            style={{
                display: Object.values(isOpen).some((open) => open)
                    ? "none"
                    : "block",
            }}
            ref={nodeRefs.current[idx] as any}
        >
            <FolderIcon darkTheme={darkTheme} />
            <div
                className="w-[150px] pt-2"
                style={{
                    lineHeight: "1rem",
                    textShadow: `0.5px 0.5px 1.5px ${
                        darkTheme ? "#303030" : "white"
                    }`,
                }}
            >
                <h1
                    style={{
                        width: `${width - 10}px`,
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                    }}
                >
                    {title}
                </h1>
                <h1 className="text-dark-gray">
                    {projects[idx].imagesCollection.items.length} item
                    {projects[idx].imagesCollection.items.length > 1 && "s"}
                </h1>
            </div>
        </div>
    );
}
