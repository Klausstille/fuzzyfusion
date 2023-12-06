import Image from "next/image";
import FavoriteButton from "@/components/FavoriteButton/FavoriteButton";
import ProjectListItem from "./ProjectListItem";

export default function ProjectList({ active }: { active?: boolean }) {
    return (
        <ProjectListItem active={active}>
            <aside className="mt-[-3px] h-4 bg-black aspect-16/9 object-cover mr-4">
                <Image
                    src="/DSCF5143.JPG"
                    alt="DSCF5143.JPG"
                    width={500}
                    height={500}
                />
            </aside>
            <p>DSCF4852.JPG</p>
            <FavoriteButton />
        </ProjectListItem>
    );
}
