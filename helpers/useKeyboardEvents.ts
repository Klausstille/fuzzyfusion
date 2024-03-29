import { useEffect } from "react";
import { ImagesCollectionItem, ProjectItem } from "@/types";

interface useKeyboardEventsProps {
    projectItem: ImagesCollectionItem | null;
    setProjectItem: React.Dispatch<any>;
    projects: ProjectItem[];
}

export const useKeyboardEvents = ({
    projectItem,
    setProjectItem,
    projects,
}: useKeyboardEventsProps) => {
    useEffect(() => {
        const handleKeyDown = (e: any) => {
            if (
                e.key === "ArrowDown" ||
                e.key === "ArrowUp" ||
                e.key === "ArrowLeft" ||
                e.key === "ArrowRight"
            ) {
                e.preventDefault();
                const projectIdx = projects.findIndex((item) =>
                    item.imagesCollection.items.some(
                        (imageItem) => imageItem.id === projectItem?.id
                    )
                );

                const imageIdx = projects[
                    projectIdx
                ].imagesCollection.items.findIndex(
                    (item) => item.id === projectItem?.id
                );

                const moveDirection =
                    e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;

                handleMoveItem(projectIdx, imageIdx, moveDirection);
            }
        };

        const handleMoveItem = (
            projectIdx: number,
            currentIdx: number,
            direction: number
        ) => {
            const nextIdx = currentIdx + direction;

            if (
                nextIdx >= 0 &&
                nextIdx < projects[projectIdx].imagesCollection.items.length
            ) {
                const nextItem =
                    projects[projectIdx].imagesCollection.items[nextIdx];
                setProjectItem(nextItem);
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [projectItem, setProjectItem, projects]);
};
