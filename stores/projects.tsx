import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProjectItem } from "@/types";

export interface ProjectStore {
    projects: ProjectItem[];
    setProjects: (projects: ProjectItem[]) => void;
}

export const useProjectStore = create(
    persist(
        (set) => ({
            projects: [] as ProjectItem[],
            setProjects: (projects: ProjectItem[]) =>
                set((state: ProjectItem[]) => ({
                    projects: projects,
                })),
        }),
        {
            name: "projects",
        }
    )
);
