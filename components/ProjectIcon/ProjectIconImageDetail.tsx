import Image from "next/image";
import { ExifTags } from "@/types";
import ProjectItemDetail from "@/components/ProjectShared/ProjectItemDetail";
import BackIcon from "./BackIcon";
import { ImagesCollectionItem } from "@/types";
import { useColorThemeStore, DarkTheme } from "@/stores/colorTheme";
import { AssetImage } from "../shared/asset-image/AssetImage";

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
    const darkTheme = useColorThemeStore(
        (state: unknown) => (state as DarkTheme).darkTheme
    );
    return (
        <aside className="fixed top-0 left-0 w-screen grid grid-cols-12 z-50">
            {projectItem && (
                <>
                    <aside
                        onClick={() => setShowImageDetail(false)}
                        className="col-span-9"
                    >
                        <AssetImage
                            image={projectItem}
                            alt={projectItem.title}
                            iconThumbnailPreview
                            priority
                        />
                    </aside>
                    <aside className="col-span-3">
                        <h1
                            className="text-s-bold fixed top-2 right-2 flex items-center gap-2 cursor-pointer"
                            onClick={() => setShowImageDetail(false)}
                        >
                            <BackIcon darkTheme={darkTheme} /> BACK
                        </h1>
                        <ProjectItemDetail
                            projectItem={projectItem}
                            exifData={exifData}
                            projectIcon
                        />
                    </aside>
                </>
            )}
        </aside>
    );
}
