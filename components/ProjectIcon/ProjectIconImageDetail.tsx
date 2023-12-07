import Image from "next/image";
import { ExifTags } from "@/types";
import ProjectItemDetail from "@/components/ProjectShared/ProjectItemDetail";
import BackIcon from "./BackIcon";

interface ProjectItemImageDetailProps {
    projectItem: {
        id: number;
        url: string;
        title: string;
        isFavorite: boolean;
    };
    exifData: ExifTags;
    setShowImageDetail: (item: boolean) => void;
}

export default function ProjectIconImageDetail({
    projectItem,
    setShowImageDetail,
    exifData,
}: ProjectItemImageDetailProps) {
    return (
        <aside className="fixed top-0 left-0 w-screen grid grid-cols-12 z-50">
            <Image
                src={projectItem.url}
                width={1000}
                height={1000}
                alt={projectItem.title}
                className="h-screen w-full object-cover object-left col-span-9"
                priority
                onClick={() => setShowImageDetail(false)}
            />
            <aside className="col-span-3">
                <h1
                    className="text-s-bold fixed top-2 right-2 flex items-center gap-2 cursor-pointer"
                    onClick={() => setShowImageDetail(false)}
                >
                    <BackIcon /> BACK
                </h1>
                <ProjectItemDetail
                    projectItem={projectItem}
                    exifData={exifData}
                    projectIcon
                />
            </aside>
        </aside>
    );
}