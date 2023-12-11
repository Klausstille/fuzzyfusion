"use client";
import useSWR from "swr";
import Image from "next/image";
import { useState, useEffect } from "react";
import FilterProjects from "@/components/FilterProjects/FilterProjects";
import ProjectListEntry from "@/components/ProjectList/ProjectListEntry";
import ProjectIconEntry from "@/components/ProjectIcon/ProjectIconEntry";
import { useProjectLayoutStore, setLayoutProps } from "@/stores/projectLayout";
import { ImagesCollectionItem, ProjectItem } from "@/types";
import { useFavoritesStore } from "@/stores/favorites";
import { useProjectStore, ProjectStore } from "@/stores/projects";
import { useColorThemeStore, DarkTheme } from "@/stores/colorTheme";
import {
    useFilterProjectStore,
    FilterProjectStore,
} from "@/stores/filterProject";
import { getProjects } from "@/contentful/api";
import RingLoader from "react-spinners/RingLoader";
import EXIF from "exif-js";

export default function Index() {
    const { data, isLoading, error } = useSWR("projects", getProjects);
    const [hasLoaded, setHasLoaded] = useState(false);
    const { layout } = useProjectLayoutStore() as setLayoutProps;
    const isFavorite = useFavoritesStore(
        (state: any) => state.isFavorite as string[]
    );

    const [filteredData, setFilteredData] = useState<ProjectItem[]>([]);
    const [filterIsActive, setFilterIsActive] = useState(false);
    const [exifData, setExifData] = useState([]);
    const [projectItem, setProjectItem] = useState<ImagesCollectionItem | null>(
        null
    );

    const { darkTheme } = useColorThemeStore() as DarkTheme;
    const { setProjects } = useProjectStore() as ProjectStore;
    const { projects } = useProjectStore() as ProjectStore;
    const { setTags } = useFilterProjectStore() as FilterProjectStore;
    const { activeFilters } = useFilterProjectStore() as FilterProjectStore;

    useEffect(() => {
        if (data) {
            setProjects(data.projects);
            setTags(data.tags);
        }
    }, [data, activeFilters]);

    useEffect(() => {
        setHasLoaded(true);
    }, [hasLoaded]);

    useEffect(() => {
        if (projectItem) {
            const url: string = projectItem.url;
            fetch(url)
                .then((response) => response.blob())
                .then((blob: any) => {
                    EXIF.getData(blob, function (this: any) {
                        const exifData = EXIF.getAllTags(this);
                        if (exifData && Object.keys(exifData).length > 0) {
                            setExifData(exifData);
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
    }, [projectItem, projects]);

    const onFilterFavorites = () => {
        const filteredFavorites = projects.map((project) => {
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
        if (activeFilters.length > 0) {
            const filteredProjects = projects.map((project) => {
                const filteredItems = project.imagesCollection.items.filter(
                    (item) => {
                        const values = Object.values(item.tags);
                        return activeFilters.every((filter) =>
                            values.includes(filter)
                        );
                    }
                );
                return {
                    ...project,
                    imagesCollection: {
                        items: filteredItems,
                    },
                };
            });
            setProjects(filteredProjects);
        } else {
            if (data) {
                setProjects(data.projects);
            }
        }
    }, [activeFilters]);

    useEffect(() => {
        if (filterIsActive) {
            onFilterFavorites();
        }
        if (isFavorite.length === 0) {
            setProjectItem(null);
        }
    }, [isFavorite]);

    if (isLoading || !projects) {
        setTimeout(() => {
            return (
                <div className="spinner">
                    <RingLoader color="white" />
                </div>
            );
        }, 500);
    }

    if (error) return <div>Error fetching projects</div>;
    return (
        hasLoaded && (
            <>
                <div
                    className={`fixed -z-10 top-0 right-0 h-screen w-screen text-[black]`}
                >
                    <Image
                        className="h-screen object-contain object-center"
                        src={
                            darkTheme && hasLoaded
                                ? "/logo-w.png"
                                : "/logo-b.png"
                        }
                        alt="logo"
                        width={3000}
                        height={1000}
                        priority
                    />
                </div>
                {layout === "LIST" ? (
                    <ProjectListEntry
                        exifData={exifData}
                        setProjectItem={setProjectItem}
                        projectItem={projectItem}
                        projects={filterIsActive ? filteredData : projects}
                    />
                ) : (
                    <ProjectIconEntry
                        exifData={exifData}
                        setProjectItem={setProjectItem}
                        projectItem={projectItem}
                        projects={filterIsActive ? filteredData : projects}
                    />
                )}
                <FilterProjects
                    onFilterFavorites={onFilterFavorites}
                    setFilterIsActive={setFilterIsActive}
                />
            </>
        )
    );
}
