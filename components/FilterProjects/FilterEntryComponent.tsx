import FilterEntryItem from "./FilterEntryItem";

import { Fragment, useState } from "react";
export default function FilterEntryComponent({
    onFilterFavorites,
    setFilterIsActive,
    darkTheme,
}: {
    onFilterFavorites: () => void;
    setFilterIsActive: (isActive: boolean) => void;
    darkTheme: boolean;
}) {
    const DummyData: any = {
        FILTER: {
            "Color Palette": ["Dominant Colors", "Color Schemes"],
            "Time of Day": ["Morning", "Afternoon", "Evening", "Night"],
            "Weather Conditions": [
                "Sunny",
                "Rainy",
                "Cloudy",
                "Foggy",
                "Snowy",
            ],
            "Camera Model": ["FUJIFILM x100v", "FUJIFILM xe4"],
            Location: ["France", "Italy", "Germany", "Hong Kong"],
            Simulation: ["Classic Chrome", "Acros", "Velvia"],
            Style: ["Minimalist", "High Contrast", "Long Exposure"],
            "Subject Matter": [
                "Macro",
                "Abstract",
                "Architecture",
                "Candid Moments",
            ],
            Emotion: ["Joy", "Contemplation", "Excitement"],
            Collaborations: ["Collaborative Projects", "Joint Endeavors"],
        },
    };
    const [activeItem, setActiveItem] = useState<string>("");

    const handleItemClick = (index: string) => {
        setActiveItem(index);
    };
    return (
        <>
            <FilterEntryItem>
                <h1
                    className="mb-4"
                    onClick={() => {
                        setActiveItem("");
                        setFilterIsActive(false);
                    }}
                >
                    Clear All Filter
                </h1>
            </FilterEntryItem>
            <h2 className="text-m flex gap-1">
                <span>↱</span> FILTER BY
            </h2>
            <hr className="border-dark-gray opacity-50" />
            <ul className="pb-4">
                <FilterEntryItem active={activeItem === "Favorites"}>
                    <li
                        className="flex gap-2 items-center"
                        onClick={() => {
                            onFilterFavorites();
                            handleItemClick("Favorites");
                        }}
                    >
                        {activeItem === "Favorites" && (
                            <button
                                className={`dot ${
                                    darkTheme ? "bg-gray" : "bg-black"
                                }`}
                            />
                        )}
                        Favorites
                    </li>
                </FilterEntryItem>
            </ul>
            {Object.keys(DummyData.FILTER).map((category, idx) => (
                <Fragment key={idx}>
                    <h2 className="text-m flex gap-1">
                        <span>↱</span> {category}
                    </h2>
                    <hr className="border-dark-gray opacity-50" />
                    <ul className="pb-4">
                        {DummyData.FILTER[category].map(
                            (subcategory: any, idx: number) => (
                                <FilterEntryItem
                                    active={activeItem === subcategory}
                                    key={idx}
                                >
                                    <li
                                        className="flex gap-2 items-center"
                                        key={subcategory}
                                        onClick={() =>
                                            handleItemClick(subcategory)
                                        }
                                    >
                                        {activeItem === subcategory && (
                                            <button
                                                className={`dot ${
                                                    darkTheme
                                                        ? "bg-gray"
                                                        : "bg-black"
                                                }`}
                                            />
                                        )}
                                        {subcategory}
                                    </li>
                                </FilterEntryItem>
                            )
                        )}
                    </ul>
                </Fragment>
            ))}
        </>
    );
}
