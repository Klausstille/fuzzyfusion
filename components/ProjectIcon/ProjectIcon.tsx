import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { ImagesCollectionItem } from "@/types";
import { AssetImage } from "@/components/shared/asset-image/AssetImage";
import { useWidthContext } from "@/context/WidthContext";
import GetWindowDimensions from "../shared/getWindowDimensions";

interface ProjectIconProps {
    item: ImagesCollectionItem;
    setProjectItem: (item: any) => void;
    setShowImageDetail: (item: boolean) => void;
}

export default function ProjectIcon({
    item,
    setProjectItem,
    setShowImageDetail,
}: ProjectIconProps) {
    const { width } = useWidthContext();
    const { windowWidth } = GetWindowDimensions();
    return (
        <>
            <div
                onClick={() => {
                    setProjectItem(item);
                    setShowImageDetail(true);
                }}
            >
                <AssetImage
                    image={item}
                    alt={item?.title}
                    iconThumbnails
                    quality={
                        width > 700
                            ? "cover"
                            : width > 500
                              ? "high"
                              : width > 300
                                ? "medium"
                                : width > 200
                                  ? "low"
                                  : width <= 300 && windowWidth < 600
                                    ? "high"
                                    : "small"
                    }
                />
            </div>
            <aside className="flex flex-row-reverse justify-center gap-2 w-full items-center h-6 text-s-bold max-desktop-s:text-xs pt-2">
                <p>{item.title}.JPG</p>
                <FavoriteButton id={item.id} iconEntry />
            </aside>
        </>
    );
}
