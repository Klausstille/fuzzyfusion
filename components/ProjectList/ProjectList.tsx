import Image from "next/image";
import FavoriteButton from "@/components/FavoriteButton/FavoriteButton";
import ProjectListItem from "./ProjectListItem";

export default function ProjectList({
    active,
    item,
}: {
    active?: boolean;
    item: {
        id: number;
        url: string;
        title: string;
        isFavorite: boolean;
    };
}) {
    return (
        <ProjectListItem active={active}>
            <aside className="mt-[-3px] h-3 bg-black aspect-16/9 object-cover mr-4">
                <Image
                    className="aspect-16/9 object-cover"
                    src={item.url}
                    alt="DSCF5143.JPG"
                    width={500}
                    height={500}
                />
            </aside>
            <p className="min-w-[150px]">{item.title}</p>
            <FavoriteButton id={item.id} />
        </ProjectListItem>
    );
}
