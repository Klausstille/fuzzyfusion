"use client";
import useSWR from "swr";
import Image from "next/image";
import { useState, useEffect } from "react";
import FilterProjects from "@/components/FilterProjects/FilterProjects";
import ProjectListEntry from "@/components/ProjectList/ProjectListEntry";
import ProjectIconEntry from "@/components/ProjectIcon/ProjectIconEntry";
import { useProjectLayoutStore, setLayoutProps } from "@/stores/projectLayout";
import { ImagesCollectionItem } from "@/types";
import { useFavoritesStore } from "@/stores/favorites";
import { useProjectStore, ProjectStore } from "@/stores/projects";
import { useColorThemeStore, DarkTheme } from "@/stores/colorTheme";
import GetWindowDimensions from "@/components/shared/getWindowDimensions";
import {
    useFilterProjectStore,
    FilterProjectStore,
} from "@/stores/filterProject";
import { getProjects } from "@/contentful/api";
import { useFetchExifData } from "@/helpers/useFetchExifData";
import { useKeyboardEvents } from "@/helpers/useKeyboardEvents";
import Button from "@/components/Button";

export default function Index() {
    const { data, isLoading, error } = useSWR("projects", getProjects);
    const { windowWidth } = GetWindowDimensions();
    const { layout } = useProjectLayoutStore() as setLayoutProps;
    const isFavorite = useFavoritesStore(
        (state: any) => state.isFavorite as string[]
    );
    const [hasLoaded, setHasLoaded] = useState(false);
    const [exifData, setExifData] = useState([]);
    const [projectItem, setProjectItem] = useState<ImagesCollectionItem | null>(
        null
    );
    const { darkTheme } = useColorThemeStore() as DarkTheme;
    const { setProjects } = useProjectStore() as ProjectStore;
    const { projects } = useProjectStore() as ProjectStore;
    const { setTags } = useFilterProjectStore() as FilterProjectStore;
    const { activeFilters } = useFilterProjectStore() as FilterProjectStore;
    const { setActiveFilters } = useFilterProjectStore((state: any) => state);
    const [delayPassed, setDelayPassed] = useState(false);

    useEffect(() => {
        setHasLoaded(true);
    }, [hasLoaded]);

    useEffect(() => {
        const delayTimer = setTimeout(() => {
            setDelayPassed(true);
        }, 2000);
        return () => clearTimeout(delayTimer);
    }, []);

    useEffect(() => {
        if (data) {
            const sortedProjects = data.projects.map((project) => {
                const sortedItems = project.imagesCollection.items.sort(
                    (a, b) => {
                        const aTitle = a.title.toLowerCase();
                        const bTitle = b.title.toLowerCase();
                        if (aTitle < bTitle) {
                            return -1;
                        }
                        if (aTitle > bTitle) {
                            return 1;
                        }
                        return 0;
                    }
                );
                return {
                    ...project,
                    imagesCollection: {
                        items: sortedItems,
                    },
                };
            });
            setProjects(sortedProjects);
            setTags(data.tags);
        }
    }, [data, activeFilters, setProjects, setTags]);

    useFetchExifData({ projectItem, setExifData });
    useKeyboardEvents({ projectItem, setProjectItem, projects });

    useEffect(() => {
        if (activeFilters.length > 0) {
            const filteredProjects = projects.map((project) => {
                const filteredItems = project.imagesCollection.items.filter(
                    (item) => {
                        if (activeFilters.includes("Favorites")) {
                            return isFavorite.includes(item.id);
                        } else {
                            const values = Object.values(item.tags);
                            return activeFilters.every((filter) =>
                                values.some(
                                    (value: string[] | null) =>
                                        value !== null && value.includes(filter)
                                )
                            );
                        }
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

    if (isLoading || !delayPassed) {
        return (
            <div className="spinner">
                <Image
                    className="logo object-contain object-center"
                    src={darkTheme ? "/logo-w.png" : "/logo-b.png"}
                    alt="logo"
                    width={1000}
                    height={1000}
                    priority
                />
            </div>
        );
    }
    if (error) return <div>Error fetching projects</div>;

    return (
        <>
            {activeFilters.length > 0 && (
                <div
                    className="menu-button fixed top-0 right-0 py-6 px-6 max-tablet:right-[50%] max-tablet:translate-x-[50%] opacity-50 hover:opacity-100 transition-all duration-200 ease-in-out max-tablet:py-4 z-40"
                    onClick={() => setActiveFilters([])}
                >
                    <Button>CLEAR FILTERS</Button>
                </div>
            )}
            {hasLoaded && (
                <>
                    <div
                        className={`fixed -z-10 top-0 right-0 h-screen w-screen flex justify-center text-[black]`}
                    >
                        <Image
                            className="h-screen object-contain object-center"
                            src={darkTheme ? "/logo-w.png" : "/logo-b.png"}
                            alt="logo"
                            width={1000}
                            height={1000}
                            priority
                        />
                    </div>
                    {windowWidth > 768 ? (
                        layout === "LIST" ? (
                            <ProjectListEntry
                                exifData={exifData}
                                setProjectItem={setProjectItem}
                                projectItem={projectItem}
                                projects={projects}
                            />
                        ) : (
                            <ProjectIconEntry
                                exifData={exifData}
                                setProjectItem={setProjectItem}
                                projectItem={projectItem}
                                projects={projects}
                            />
                        )
                    ) : (
                        <ProjectIconEntry
                            exifData={exifData}
                            setProjectItem={setProjectItem}
                            projectItem={projectItem}
                            projects={projects}
                        />
                    )}
                    <FilterProjects />
                </>
            )}
        </>
    );
}
