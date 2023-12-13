import { ExifTags } from "@/types";
import ProjectItemDetail from "@/components/ProjectShared/ProjectItemDetail";
import BackIcon from "./BackIcon";
import { ImagesCollectionItem, ActiveIndex } from "@/types";
import { useColorThemeStore, DarkTheme } from "@/stores/colorTheme";
import { AssetImage } from "../shared/asset-image/AssetImage";
import GetWindowDimensions from "../shared/getWindowDimensions";
import { useState } from "react";
import CommonImageModuleComponent from "../ProjectShared/CommonImageModuleComponent";

interface ProjectItemImageDetailProps {
    projectItem: ImagesCollectionItem | null;
    exifData: ExifTags;
    setShowImageDetail: (item: boolean) => void;
}

export default function ProjectIconImageDetail({
    projectItem,
    setShowImageDetail,
    exifData,
}: ProjectItemImageDetailProps) {
    const { windowWidth } = GetWindowDimensions();
    const darkTheme = useColorThemeStore(
        (state: unknown) => (state as DarkTheme).darkTheme
    );
    const [moreInfo, setMoreInfo] = useState<boolean>(false);
    const [isShown, setIsShown] = useState(false);
    const [activeIndex, setActiveIndex] = useState<ActiveIndex | number>(-1);
    console.log(activeIndex);

    return (
        projectItem && (
            <>
                {isShown && (
                    <CommonImageModuleComponent
                        setIsShown={setIsShown}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                    />
                )}
                <section
                    className={`fixed top-0 left-0 h-screen w-screen ${
                        darkTheme ? "bg-black" : "bg-gray"
                    } z-50`}
                >
                    <aside className="fixed top-2 left-2 h-[calc(100vh-1rem)] w-[calc(100vw-1rem)] rounded-md overflow-hidden grid grid-cols-12">
                        <>
                            <aside
                                className="col-span-9 pr-2 max-desktop-s:col-span-8 max-tablet:col-span-12 max-tablet:mt-10 max-tablet:pr-0 cursor-zoom-in"
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
                                    alt={projectItem.title}
                                    iconThumbnailPreview
                                    quality="cover"
                                />
                            </aside>
                            <aside className="col-span-3 max-desktop-s:col-span-4">
                                <div
                                    className="fixed bottom-3 max-tablet:top-3 max-tablet:bottom-[auto] right-4 flex items-center gap-2 cursor-pointer font-light max-tablet:font-normal text-xs-heading"
                                    onClick={() => setShowImageDetail(false)}
                                >
                                    <BackIcon darkTheme={darkTheme} /> BACK
                                </div>
                                {(windowWidth > 768 ||
                                    (moreInfo && windowWidth < 768)) && (
                                    <ProjectItemDetail
                                        projectItem={projectItem}
                                        exifData={exifData}
                                        projectIcon
                                    />
                                )}
                            </aside>
                            {windowWidth < 768 && (
                                <h1
                                    className="fixed top-3 left-4 cursor-pointer font-bold max-tablet:text-xs-heading"
                                    onClick={() =>
                                        setMoreInfo((toggle) => !toggle)
                                    }
                                >
                                    {moreInfo ? "CLOSE" : "INFO"}
                                </h1>
                            )}
                        </>
                    </aside>
                </section>
            </>
        )
    );
}
