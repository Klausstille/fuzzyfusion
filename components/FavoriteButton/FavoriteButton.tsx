import { useFavoritesStore } from "@/stores/favorites";
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

    useEffect(() => {
        setHasLoaded(true);
    }, [hasLoaded]);

    return (
        hasLoaded && (
            <div
                className={`w-full flex ${
                    iconEntry ? "justify-end" : "justify-center"
                }`}
            >
                <button
                    onClick={() => setFavorite(id)}
                    className={`dot ${
                        isFavorite
                            ? "bg-lime"
                            : "bg-white border-gray border-[1px]"
                    }`}
                />
            </div>
        )
    );
}
