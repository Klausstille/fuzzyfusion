import Image from "next/image";
import FavoriteButton from "@/components/FavoriteButton/FavoriteButton";
import ProjectListItem from "./ProjectListItem";
import { ImagesCollectionItem } from "@/types";

export default function ProjectList({
    active,
    item,
}: {
    active?: boolean;
    item: ImagesCollectionItem;
}) {
    return (
        <ProjectListItem active={active}>
            <aside className="h-3 aspect-16/9 object-cover mr-4">
                <Image
                    className="aspect-16/9 object-cover"
                    src={item.url}
                    alt={item.title}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    placeholder={item?.blurDataURL ? "blur" : "empty"}
                    blurDataURL={item?.blurDataURL || ""}
                />
            </aside>
            <p className="min-w-[100px] max-desktop-s:min-w-[90px] max-desktop-s:text-xs">
                {item.title}.JPG
            </p>
            <FavoriteButton id={item.id} />
        </ProjectListItem>
    );
}
