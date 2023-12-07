import Image from "next/image";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { AssetImage } from "@/components/shared/asset-image/AssetImage";

interface ProjectIconProps {
    item: {
        id: number;
        url: string;
        title: string;
        isFavorite: boolean;
    };
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
                <Image
                    className={`hover:object-contain aspect-6/4 object-cover transition-all duration-500 ease-in-out`}
                    style={{ width: "100%" }}
                    src={item.url}
                    alt="DSCF5143.JPG"
                    width={1000}
                    height={1000}
                />
                {/* <AssetImage
                    // className="aspect-16/9 object-cover"
                    style={{ width: "100%" }}
                    imageSrc={item.url}
                    alt="DSCF5143.JPG"
                /> */}
            </div>
            <aside className="flex justify-between w-full items-center h-6">
                <p>{item.title}</p>
                <FavoriteButton isFavorite={item.isFavorite} iconEntry />
            </aside>
        </article>
    );
}
