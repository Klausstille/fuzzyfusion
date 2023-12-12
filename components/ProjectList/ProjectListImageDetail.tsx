import { useState } from "react";
import { ImagesCollectionItem, ActiveIndex } from "@/types";
import CommonImageModuleComponent from "../ProjectShared/CommonImageModuleComponent";
import { AssetImage } from "../shared/asset-image/AssetImage";

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
                <CommonImageModuleComponent
                    setIsShown={setIsShown}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                />
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
                    priority
                    thumbnailPreview
                />
            </aside>
        </>
    );
}
