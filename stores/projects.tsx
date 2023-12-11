import { create } from "zustand";
import { ProjectItem } from "@/types";

export interface ProjectStore {
    projects: ProjectItem[];
    setProjects: (projects: ProjectItem[]) => void;
}

export const useProjectStore = create((set) => ({
    projects: [] as ProjectItem[],
    setProjects: (projects: ProjectItem[]) =>
        set((state: ProjectItem[]) => ({
            projects: projects,
        })),
}));
