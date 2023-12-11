import { useState } from "react";
import { ImagesCollectionItem } from "@/types";
import { CommonImageModule } from "@/components/ProjectShared/CommonImageModule";
import { AssetImage } from "../shared/asset-image/AssetImage";

export interface ActiveIndex {
    url: string;
    alt: string;
    width: number;
    height: number;
}
interface ProjectListItemDetailProps {
    projectItem: ImagesCollectionItem;
}

export default function ProjectListImageDetail({
    projectItem,
}: ProjectListItemDetailProps) {
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
                        width={
                            typeof activeIndex === "object"
                                ? activeIndex.width
                                : 0
                        }
                        height={
                            typeof activeIndex === "object"
                                ? activeIndex.height
                                : 0
                        }
                    />
                </section>
            )}
            <aside
                className="col-span-7 h-[calc(100vh-3rem)] w-full object-cover object-left cursor-zoom-in rounded-md max-desktop:col-span-5 max-tablet:hidden"
                onClick={() => {
                    setIsShown(true);
                    setActiveIndex({
                        url: projectItem.url,
                        alt: projectItem.title || "",
                        width: projectItem.width || 0,
                        height: projectItem.height || 0,
                    });
                }}
            >
                <AssetImage
                    image={projectItem}
                    alt={projectItem?.title}
                    quality="cover"
                    className=""
                    priority
                    thumbnailPreview
                />
            </aside>
        </>
    );
}
