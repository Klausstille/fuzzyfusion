import Image from "next/image";
import { useState } from "react";
import { ProjectItemProps } from "@/types";
import { CommonImageModule } from "@/components/ProjectShared/CommonImageModule";
export interface ActiveIndex {
    url: string;
    alt: string;
}
export default function ProjectListImageDetail({
    projectItem,
}: ProjectItemProps) {
    const [isShown, setIsShown] = useState(false);
    const [activeIndex, setActiveIndex] = useState<ActiveIndex | number>(-1);

    return (
        <>
            {isShown && (
                <section
                    className="z-50"
                    onClick={() => {
                        setIsShown(false);
                        setActiveIndex && setActiveIndex(-1);
                    }}
                >
                    <CommonImageModule
                        srcUrl={
                            typeof activeIndex === "object"
                                ? activeIndex.url
                                : ""
                        }
                        altText={
                            typeof activeIndex === "object"
                                ? activeIndex.alt
                                : ""
                        }
                    />
                </section>
            )}
            <aside className="col-span-7 rounded-md">
                <Image
                    src={projectItem?.url}
                    width={1000}
                    height={1000}
                    alt={projectItem?.title}
                    className="h-[calc(100vh-1rem)] w-full object-cover object-left cursor-zoom-in rounded-md"
                    priority
                    onClick={() => {
                        setIsShown(true);
                        setActiveIndex({
                            url: projectItem.url,
                            alt: projectItem.title || "",
                        });
                    }}
                />
            </aside>
        </>
    );
}
