import { create } from "zustand";

export interface setLayoutProps {
    layout: "LIST" | "ICONS";
    setLayout: (data: "LIST" | "ICONS") => void;
}

export const useProjectLayoutStore = create((set) => ({
    layout: "ICONS",
    setLayout: (data: "LIST" | "ICONS") => set({ layout: data }),
}));
