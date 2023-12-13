import Image from "next/image";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { ImagesCollectionItem } from "@/types";
import { AssetImage } from "@/components/shared/asset-image/AssetImage";
import { useWidthContext } from "@/context/WidthContext";

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
    return (
        <article>
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
                                  : "small"
                    }
                />
            </div>
            <aside className="flex justify-between w-full items-center h-6">
                <p>{item.title}.JPG</p>
                <FavoriteButton id={item.id} iconEntry />
            </aside>
        </article>
    );
}
