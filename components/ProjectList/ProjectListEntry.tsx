import ProjectItemDetail from "@/components/ProjectShared/ProjectItemDetail";
import ProjectListImageDetail from "@/components/ProjectList/ProjectListImageDetail";
import ProjectList from "@/components/ProjectList/ProjectList";
import { ProjectEntryProps } from "@/types";

export default function ProjectListEntry({
    setProjectItem,
    projectItem,
    dummyData,
    exifData,
}: ProjectEntryProps) {
    return (
        <section className="px-2 py-2 grid grid-cols-12">
            <div className="col-span-2 h-[calc(100vh-30px)] overflow-scroll pb-4">
                {dummyData.map((item, idx) => {
                    return (
                        <section key={idx} onClick={() => setProjectItem(item)}>
                            <ProjectList
                                active={item.id === projectItem.id}
                                key={idx}
                                url={item.url}
                                title={item.title}
                                isFavorite={item.isFavorite}
                            />
                        </section>
                    );
                })}
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
