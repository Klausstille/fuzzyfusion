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
            <aside className="mt-[-3px] h-3 aspect-16/9 object-cover mr-4">
                <Image
                    className="aspect-16/9 object-cover"
                    src={item.url}
                    alt={item.title}
                    width={25}
                    height={25}
                />
            </aside>
            <p className="min-w-[130px]">{item.title}</p>
            <FavoriteButton id={item.id} />
        </ProjectListItem>
    );
}
