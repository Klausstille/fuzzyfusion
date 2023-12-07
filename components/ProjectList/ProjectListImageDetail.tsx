import Image from "next/image";
import { ProjectItemProps } from "@/types";
export default function ProjectListImageDetail({
    projectItem,
}: ProjectItemProps) {
    return (
        <aside className="col-span-7">
            <Image
                src={projectItem.url}
                width={1000}
                height={1000}
                alt={projectItem.title}
                className="h-[calc(100vh-18px)] w-full object-cover object-left"
                priority
            />
        </aside>
    );
}
