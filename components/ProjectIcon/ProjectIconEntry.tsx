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

    return (
        <>
            <section
                className="px-2 py-2 grid gap-2"
                style={{
                    gridTemplateColumns: `repeat(auto-fill, minmax(${width}px,1fr))`,
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
