import Image from "next/image";
import FavoriteButton from "@/components/FavoriteButton/FavoriteButton";
import ProjectListItem from "./ProjectListItem";
import { ImagesCollectionItem } from "@/types";
import { AssetImage } from "../shared/asset-image/AssetImage";
export default function ProjectList({
    active,
    item,
}: {
    active?: boolean;
    item: ImagesCollectionItem;
}) {
    return (
        <ProjectListItem active={active}>
            <aside className="mt-[-3px] h-3 aspect-16/9 object-cover mr-4">
                <AssetImage
                    image={item}
                    alt={item.title}
                    quality="small"
                    priority
                    thumbnails
                />
            </aside>
            <p className="min-w-[130px]">{item.title}</p>
            <FavoriteButton id={item.id} />
        </ProjectListItem>
    );
}
