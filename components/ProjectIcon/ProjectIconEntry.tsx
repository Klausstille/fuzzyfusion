import { useState } from "react";
import { ProjectEntryProps } from "@/types";
import { useWidthContext } from "@/context/WidthContext";
import ProjectIcon from "./ProjectIcon";
import ProjectIconImageDetail from "./ProjectIconImageDetail";
export default function ProjectIconEntry({
    setProjectItem,
    projectItem,
    dummyData,
    exifData,
}: ProjectEntryProps) {
    const { width } = useWidthContext();
    const [showImageDetail, setShowImageDetail] = useState<boolean>(false);

    function calculateDynamicGap(width: number) {
        const minWidth = 100;
        const maxWidth = 800;

        const dynamicGap =
            40 - Math.pow((width - minWidth) / (maxWidth - minWidth), 2) * 35;

        return Math.max(5, Math.min(40, dynamicGap));
    }

    return (
        <>
            <section
                className="px-2 py-2 grid"
                style={{
                    gridTemplateColumns: `repeat(auto-fill, minmax(${width}px,1fr))`,
                    gap: `${calculateDynamicGap(width)}px`,
                }}
            >
                {dummyData.map((item, idx) => {
                    return (
                        <ProjectIcon
                            key={idx}
                            item={item}
                            setProjectItem={setProjectItem}
                            setShowImageDetail={setShowImageDetail}
                        />
                    );
                })}
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
