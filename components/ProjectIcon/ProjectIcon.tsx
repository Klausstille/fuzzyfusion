import FavoriteButton from "../FavoriteButton/FavoriteButton";
import Image from "next/image";

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
            <Image
                style={{ width: "100%" }}
                src={item.url}
                alt="DSCF5143.JPG"
                width={1000}
                height={1000}
                onClick={() => {
                    setProjectItem(item);
                    setShowImageDetail(true);
                }}
            />
            <aside className="flex justify-between w-full items-center h-6">
                <p>{item.title}</p>
                <FavoriteButton isFavorite={item.isFavorite} iconEntry />
            </aside>
        </article>
    );
}
