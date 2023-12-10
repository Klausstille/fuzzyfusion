import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface DarkTheme {
    darkTheme: boolean;
    toggleDarkTheme: () => void;
}

export const useColorThemeStore = create(
    persist(
        (set) => ({
            darkTheme: false,
            toggleDarkTheme: () =>
                set((state: DarkTheme) => ({
                    darkTheme: !state.darkTheme,
                })),
        }),
        {
            name: "color-theme",
        }
    )
);
