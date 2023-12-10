import { create } from "zustand";
import { persist } from "zustand/middleware";
export interface Favorite {
    isFavorite: string[];
    setFavorite: (id: string) => void;
}

export const useFavoritesStore = create(
    persist(
        (set) => ({
            isFavorite: [] as string[],
            setFavorite: (id: string) =>
                set((state: Favorite) => ({
                    isFavorite: state.isFavorite.includes(id)
                        ? state.isFavorite.filter((item) => item !== id)
                        : [...state.isFavorite, id],
                })),
        }),
        {
            name: "favorites",
        }
    )
);
