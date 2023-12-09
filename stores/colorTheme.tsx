import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DarkTheme {
    darkTheme: boolean;
    toggleDarkTheme: () => void;
}

export const useColorThemeStore = create(
    persist(
        (set) => ({
            darkTheme: localStorage.getItem("color-theme") === "true",
            toggleDarkTheme: () =>
                set((state: DarkTheme) => ({ darkTheme: !state.darkTheme })),
        }),
        {
            name: "color-theme",
        }
    )
);
