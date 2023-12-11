import { create } from "zustand";
import { ProjectItem } from "@/types";

export interface FilterProjectStore {
    filteredProjects: ProjectItem[];
    setFilteredProjects: (filteredProjects: ProjectItem[]) => void;
    tags: Record<string, string[]>;
    setTags: (tags: Record<string, string[]>) => void;
    activeFilters: string[];
    setActiveFilters: (activeFilters: string[]) => void;
}

export const useFilterProjectStore = create((set) => ({
    tags: {},
    setTags: (tags: Record<string, string[]>) => set({ tags }),
    filteredProjects: [] as ProjectItem[],
    setFilteredProjects: (filteredProjects: ProjectItem[]) =>
        set((state: ProjectItem[]) => ({
            filteredProjects: filteredProjects,
        })),
    activeFilters: [] as string[],
    setActiveFilters: (activeFilters: string[]) =>
        set((state: string[]) => ({
            activeFilters: activeFilters,
        })),
}));
