import { create } from "zustand";

export interface DarkTheme {
    darkTheme: boolean;
    toggleDarkTheme: () => void;
}

export const useColorThemeStore = create((set) => ({
    darkTheme: false,
    toggleDarkTheme: () =>
        set((state: DarkTheme) => ({
            darkTheme: !state.darkTheme,
        })),
}));
