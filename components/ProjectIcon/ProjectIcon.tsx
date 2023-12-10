import Image from "next/image";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { ImagesCollectionItem } from "@/types";
import { AssetImage } from "@/components/shared/asset-image/AssetImage";

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
    return (
        <article>
            <div
                onClick={() => {
                    setProjectItem(item);
                    setShowImageDetail(true);
                }}
            >
                <AssetImage image={item} alt={item?.title} iconThumbnails />
            </div>
            <aside className="flex justify-between w-full items-center h-6">
                <p>{item.title}</p>
                <FavoriteButton id={item.id} iconEntry />
            </aside>
        </article>
    );
}
