import { create } from "zustand";
import { persist } from "zustand/middleware";
export interface Favorite {
    isFavorite: number[];
    setFavorite: (id: number) => void;
}

export const useFavoritesStore = create(
    persist(
        (set) => ({
            isFavorite: [] as number[],
            setFavorite: (id: number) =>
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
