import { ExifTags } from "@/types";
import ProjectItemDetail from "@/components/ProjectShared/ProjectItemDetail";
import BackIcon from "./BackIcon";
import { ImagesCollectionItem } from "@/types";
import { useColorThemeStore, DarkTheme } from "@/stores/colorTheme";
import { AssetImage } from "../shared/asset-image/AssetImage";
import GetWindowDimensions from "../shared/getWindowDimensions";
import { useState } from "react";

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
    console.log("moreInfo", moreInfo);
    return (
        projectItem && (
            <section
                className={`fixed top-0 left-0 h-screen w-screen ${
                    darkTheme ? "bg-black" : "bg-gray"
                } z-50`}
            >
                <aside className="fixed top-2 left-2 h-[calc(100vh-1rem)] w-[calc(100vw-1rem)] rounded-md overflow-hidden grid grid-cols-12">
                    <>
                        <aside
                            onClick={() => setShowImageDetail(false)}
                            className="col-span-9 pr-2 max-desktop-s:col-span-8 max-tablet:col-span-12 max-tablet:pr-0"
                        >
                            <AssetImage
                                image={projectItem}
                                alt={projectItem.title}
                                iconThumbnailPreview
                                priority
                            />
                        </aside>
                        <aside className="col-span-3 max-desktop-s:col-span-4">
                            <h1
                                className="fixed top-3 right-4 flex items-center gap-2 cursor-pointer font-bold"
                                onClick={() => setShowImageDetail(false)}
                            >
                                <BackIcon darkTheme={darkTheme} /> BACK
                            </h1>
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
                                className="fixed top-3 left-4 cursor-pointer font-bold"
                                onClick={() => setMoreInfo((toggle) => !toggle)}
                            >
                                {moreInfo ? "CLOSE" : "INFO"}
                            </h1>
                        )}
                    </>
                </aside>
            </section>
        )
    );
}
