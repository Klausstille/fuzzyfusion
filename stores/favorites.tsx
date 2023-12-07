import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface setLayoutProps {
    layout: "LIST" | "ICONS";
    setLayout: (data: "LIST" | "ICONS") => void;
}

export const useFavoritesStore = create(
    persist(
        (set) => ({
            isFavorite: [] as string[],
            setFavorite: (id: number) =>
                set((state: { isFavorite: number[] }) => ({
                    isFavorite: state.isFavorite.includes(id)
                        ? state.isFavorite.filter((item: number) => item !== id)
                        : [...state.isFavorite, id],
                })),
        }),
        {
            name: "favorites",
        }
    )
);
