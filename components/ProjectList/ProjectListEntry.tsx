import { useState } from "react";
import ProjectItemDetail from "@/components/ProjectShared/ProjectItemDetail";
import ProjectListImageDetail from "@/components/ProjectList/ProjectListImageDetail";
import ProjectList from "@/components/ProjectList/ProjectList";
import { ProjectEntryProps } from "@/types";
import ToggleIcon from "@/components/ProjectList/ToggleIcon";
import FolderIcon from "@/components/ProjectShared/folderIcon";
import { useColorThemeStore } from "@/stores/colorTheme";

export default function ProjectListEntry({
    setProjectItem,
    projectItem,
    dummyData,
    exifData,
}: ProjectEntryProps) {
    const [isOpen, setIsOpen] = useState<{ [key: number]: boolean }>({});
    const darkTheme = useColorThemeStore(
        (state: unknown) => (state as any).darkTheme
    );
    const toggleProject = (idx: number) => {
        setIsOpen((prev) => ({
            ...prev,
            [idx]: !prev[idx],
        }));
    };
    return (
        <section className="px-2 py-2 grid grid-cols-12">
            <div className="col-span-2 h-[calc(100vh-30px)] overflow-scroll pb-4">
                {dummyData.map((item, idx) => (
                    <div key={idx} className="pb-2">
                        <div
                            className="text-s-bold top-2 right-2 flex items-center gap-2 cursor-pointer pb-2"
                            onClick={() => toggleProject(idx)}
                        >
                            <ToggleIcon
                                isOpen={isOpen[idx]}
                                darkTheme={darkTheme}
                            />
                            <aside className="w-3">
                                <FolderIcon darkTheme={darkTheme} />
                            </aside>
                            <h1
                                className="w-[150px]"
                                style={{
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                }}
                            >
                                {item.title}
                            </h1>
                        </div>
                        {!isOpen[idx] &&
                            item.imagesCollection.items.map((item, idx) => (
                                <section
                                    key={idx}
                                    onClick={() => setProjectItem(item)}
                                >
                                    <ProjectList
                                        active={item.id === projectItem.id}
                                        key={idx}
                                        item={item}
                                    />
                                </section>
                            ))}
                    </div>
                ))}
            </div>
            {exifData && (
                <ProjectItemDetail
                    exifData={exifData as any}
                    projectItem={projectItem}
                />
            )}
            <ProjectListImageDetail projectItem={projectItem} />
        </section>
    );
}
