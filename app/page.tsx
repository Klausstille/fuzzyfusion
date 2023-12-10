"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import FilterProjects from "@/components/FilterProjects/FilterProjects";
import ProjectListEntry from "@/components/ProjectList/ProjectListEntry";
import ProjectIconEntry from "@/components/ProjectIcon/ProjectIconEntry";
import { useProjectLayoutStore, setLayoutProps } from "@/stores/projectLayout";
import { ImagesCollectionItem, ProjectItem } from "@/types";
import { useFavoritesStore } from "@/stores/favorites";
import { useColorThemeStore, DarkTheme } from "@/stores/colorTheme";
import EXIF from "exif-js";

export default function Index() {
    const { layout } = useProjectLayoutStore() as setLayoutProps;
    const isFavorite = useFavoritesStore(
        (state: any) => state.isFavorite as number[]
    );
    const [dummyData, setDummyData] = useState<ProjectItem[]>([
        {
            id: 13,
            title: "2023-09-BDX-DOR-TLS",
            imagesCollection: {
                items: [
                    {
                        id: 1,
                        title: "DSCF5143.JPG",
                        url: "/DSCF5143.JPG",
                        width: 1000,
                        height: 1000,
                    },
                    {
                        id: 2,
                        title: "DSCF4966.JPG",
                        url: "/DSCF4966.JPG",
                        width: 1000,
                        height: 1000,
                    },
                    {
                        id: 3,
                        url: "/DSCF4858.JPG",
                        title: "DSCF4858.JPG",
                        width: 1000,
                        height: 1000,
                    },
                    {
                        id: 4,
                        title: "DSCF5143.JPG",
                        url: "/DSCF5143.JPG",
                        width: 1000,
                        height: 1000,
                    },
                    {
                        id: 5,
                        title: "DSCF4966.JPG",
                        url: "/DSCF4966.JPG",
                        width: 1000,
                        height: 1000,
                    },
                    {
                        id: 6,
                        url: "/DSCF4858.JPG",
                        title: "DSCF4858.JPG",
                        width: 1000,
                        height: 1000,
                    },
                ],
            },
        },
        {
            id: 14,
            title: "2022-10-TLS-BCN",
            imagesCollection: {
                items: [
                    {
                        id: 7,
                        title: "DSCF5143.JPG",
                        url: "/DSCF5143.JPG",
                        width: 1000,
                        height: 1000,
                    },
                    {
                        id: 8,
                        title: "DSCF4966.JPG",
                        url: "/DSCF4966.JPG",
                        width: 1000,
                        height: 1000,
                    },
                    {
                        id: 9,
                        url: "/DSCF4858.JPG",
                        title: "DSCF4858.JPG",
                        width: 1000,
                        height: 1000,
                    },
                    {
                        id: 10,
                        title: "DSCF5143.JPG",
                        url: "/DSCF5143.JPG",
                        width: 1000,
                        height: 1000,
                    },
                    {
                        id: 11,
                        title: "DSCF4966.JPG",
                        url: "/DSCF4966.JPG",
                        width: 1000,
                        height: 1000,
                    },
                    {
                        id: 12,
                        url: "/DSCF4858.JPG",
                        title: "DSCF4858.JPG",
                        width: 1000,
                        height: 1000,
                    },
                ],
            },
        },
    ]);
    const darkTheme = useColorThemeStore(
        (state: unknown) => (state as DarkTheme).darkTheme
    );
    const [filteredData, setFilteredData] = useState<ProjectItem[]>([]);
    const [filterIsActive, setFilterIsActive] = useState(false);
    const [exifData, setExifData] = useState([]);
    const [projectItem, setProjectItem] = useState<ImagesCollectionItem | null>(
        null
    );

    useEffect(() => {
        if (projectItem) {
            const url: string = projectItem.url;
            // "https://images.ctfassets.net/rbwa20kawb52/1PzHTL0qaQcsYGUWRipV9F/a107ee82cc8a523ff3ba6b4cbfa8c8d3/EA932281-3929-4849-86AF-C4475B80DC3B-643-00000019658FFFD4.JPG";
            fetch(url)
                .then((response) => response.blob())
                .then((blob: any) => {
                    EXIF.getData(blob, function (this: any) {
                        const exifData = EXIF.getAllTags(this);
                        if (exifData && Object.keys(exifData).length > 0) {
                            setExifData(exifData);
                            // console.log("Extracted EXIF data:", exifData);
                        } else {
                            console.warn("No EXIF data found in the image.");
                        }
                    });
                })
                .catch((error) => {
                    console.error(
                        "Error fetching or processing the image:",
                        error
                    );
                });
        }
    }, [projectItem, dummyData]);

    const onFilterFavorites = () => {
        const filteredFavorites = dummyData.map((project) => {
            const filteredItems = project.imagesCollection.items.filter(
                (item) => isFavorite.includes(item.id)
            );

            return {
                ...project,
                imagesCollection: {
                    items: filteredItems,
                },
            };
        });
        setFilterIsActive(true);
        setFilteredData(filteredFavorites);
    };

    useEffect(() => {
        if (filterIsActive) {
            onFilterFavorites();
        }
        if (isFavorite.length === 0) {
            setProjectItem(null);
        }
    }, [isFavorite]);

    return (
        <>
            <div
                className={`fixed -z-10 top-0 right-0 h-screen w-screen text-[black]`}
            >
                <Image
                    className="h-screen object-contain object-center"
                    src={darkTheme ? "/logo-w.png" : "/logo-b.png"}
                    alt="logo"
                    width={3000}
                    height={1000}
                />
            </div>
            {layout === "LIST" ? (
                <ProjectListEntry
                    exifData={exifData}
                    setProjectItem={setProjectItem}
                    projectItem={projectItem}
                    dummyData={filterIsActive ? filteredData : dummyData}
                />
            ) : (
                <ProjectIconEntry
                    exifData={exifData}
                    setProjectItem={setProjectItem}
                    projectItem={projectItem}
                    dummyData={filterIsActive ? filteredData : dummyData}
                />
            )}
            <FilterProjects
                onFilterFavorites={onFilterFavorites}
                setFilterIsActive={setFilterIsActive}
            />
        </>
    );
}
