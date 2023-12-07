export default function FavoriteButton({
    isFavorite,
    iconEntry,
}: {
    isFavorite?: boolean;
    iconEntry?: boolean;
}) {
    return (
        <div
            className={`w-full flex ${
                iconEntry ? "justify-end" : "justify-center"
            }`}
        >
            <button
                className={`dot ${
                    isFavorite ? "bg-lime" : "bg-white border-gray border-[1px]"
                }`}
            />
        </div>
    );
}
