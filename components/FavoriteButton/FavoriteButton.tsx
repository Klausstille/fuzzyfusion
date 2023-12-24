import { useFavoritesStore } from "@/stores/favorites";
import { useColorThemeStore, DarkTheme } from "@/stores/colorTheme";
import { useEffect, useState } from "react";

export default function FavoriteButton({
    iconEntry,
    id,
}: {
    iconEntry?: boolean;
    id: string;
}) {
    const [hasLoaded, setHasLoaded] = useState(false);
    const setFavorite = useFavoritesStore((state: any) => state.setFavorite);
    const isFavorite: boolean = useFavoritesStore((state: any) =>
        state.isFavorite.includes(id)
    );
    const { darkTheme } = useColorThemeStore() as DarkTheme;

    useEffect(() => {
        setHasLoaded(true);
    }, [hasLoaded]);

    return (
        hasLoaded &&
        isFavorite && (
            <div
                className={`flex ${iconEntry ? "" : "w-full justify-end pr-2"}`}
            >
                <button
                    onClick={() => setFavorite(id)}
                    style={{ boxSizing: "content-box" }}
                    className={`dot ${darkTheme ? "bg-white" : "bg-black"}`}
                />
            </div>
        )
    );
}
