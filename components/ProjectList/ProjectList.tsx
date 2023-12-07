import Image from "next/image";
import FavoriteButton from "@/components/FavoriteButton/FavoriteButton";
import ProjectListItem from "./ProjectListItem";

export default function ProjectList({
    active,
    url,
    title,
    isFavorite,
}: {
    active?: boolean;
    url: string;
    isFavorite?: boolean;
    title?: string;
}) {
    return (
        <ProjectListItem active={active}>
            <aside className="mt-[-3px] h-3 bg-black aspect-16/9 object-cover mr-4">
                <Image
                    className="aspect-16/9 object-cover"
                    src={url}
                    alt="DSCF5143.JPG"
                    width={500}
                    height={500}
                />
            </aside>
            <p className="min-w-[150px]">{title}</p>
            <FavoriteButton isFavorite={isFavorite} />
        </ProjectListItem>
    );
}
