"use client";
import { useState, useEffect } from "react";
import FilterProjects from "@/components/FilterProjects/FilterProjects";
import ProjectListEntry from "@/components/ProjectList/ProjectListEntry";
import ProjectIconEntry from "@/components/ProjectIcon/ProjectIconEntry";
import { useProjectLayoutStore, setLayoutProps } from "@/stores/projectLayout";
import EXIF from "exif-js";
interface ProjectItem {
    id: number;
    url: string;
    title: string;
    isFavorite: boolean;
}
export default function Index() {
    const { layout } = useProjectLayoutStore() as setLayoutProps;

    const dummyData = [
        {
            id: 1,
            url: "/DSCF5143.JPG",
            title: "DSCF5143.JPG",
            isFavorite: false,
        },
        {
            id: 2,
            url: "/DSCF4966.JPG",
            title: "DSCF4966.JPG",
            isFavorite: true,
        },
        {
            id: 3,
            url: "/DSCF5143.JPG",
            title: "DSCF5143.JPG",
            isFavorite: true,
        },
        {
            id: 4,
            url: "/DSCF4858.JPG",
            title: "DSCF4858.JPG",
            isFavorite: false,
        },
        {
            id: 5,
            url: "/DSCF5143.JPG",
            title: "DSCF5143.JPG",
            isFavorite: false,
        },
        {
            id: 6,
            url: "/DSCF4858.JPG",
            title: "DSCF4858.JPG",
            isFavorite: true,
        },
        {
            id: 7,
            url: "/DSCF5143.JPG",
            title: "DSCF5143.JPG",
            isFavorite: true,
        },
        {
            id: 8,
            url: "/DSCF4966.JPG",
            title: "DSCF4966.JPG",
            isFavorite: true,
        },
        {
            id: 9,
            url: "/DSCF5143.JPG",
            title: "DSCF5143.JPG",
            isFavorite: false,
        },
        {
            id: 10,
            url: "/DSCF4858.JPG",
            title: "DSCF4858.JPG",
            isFavorite: true,
        },
        {
            id: 11,
            url: "/DSCF5143.JPG",
            title: "DSCF5143.JPG",
            isFavorite: true,
        },
        {
            id: 12,
            url: "/DSCF4858.JPG",
            title: "DSCF4858.JPG",
            isFavorite: false,
        },
        {
            id: 13,
            url: "/DSCF5143.JPG",
            title: "DSCF5143.JPG",
            isFavorite: false,
        },
        {
            id: 14,
            url: "/DSCF4858.JPG",
            title: "DSCF4858.JPG",
            isFavorite: true,
        },
        {
            id: 15,
            url: "/DSCF4966.JPG",
            title: "DSCF4966.JPG",
            isFavorite: true,
        },
        {
            id: 16,
            url: "/DSCF4858.JPG",
            title: "DSCF4858.JPG",
            isFavorite: false,
        },
    ];

    const [exifData, setExifData] = useState([]);
    const [projectItem, setProjectItem] = useState<ProjectItem>({
        id: 1,
        url: "/DSCF5143.JPG",
        title: "DSCF5143.JPG",
        isFavorite: false,
    });

    useEffect(() => {
        const url: string = projectItem.url;
        // "https://images.ctfassets.net/rbwa20kawb52/1PzHTL0qaQcsYGUWRipV9F/a107ee82cc8a523ff3ba6b4cbfa8c8d3/EA932281-3929-4849-86AF-C4475B80DC3B-643-00000019658FFFD4.JPG";
        fetch(url)
            .then((response) => response.blob())
            .then((blob: any) => {
                EXIF.getData(blob, function (this: any) {
                    const exifData = EXIF.getAllTags(this);
                    if (exifData && Object.keys(exifData).length > 0) {
                        setExifData(exifData);
                        console.log("Extracted EXIF data:", exifData);
                    } else {
                        console.warn("No EXIF data found in the image.");
                    }
                });
            })
            .catch((error) => {
                console.error("Error fetching or processing the image:", error);
            });
    }, [projectItem]);

    return (
        <>
            {layout === "LIST" ? (
                <ProjectListEntry
                    exifData={exifData}
                    setProjectItem={setProjectItem}
                    projectItem={projectItem}
                    dummyData={dummyData}
                />
            ) : (
                <ProjectIconEntry
                    exifData={exifData}
                    setProjectItem={setProjectItem}
                    projectItem={projectItem}
                    dummyData={dummyData}
                />
            )}
            <FilterProjects />
        </>
    );
}
