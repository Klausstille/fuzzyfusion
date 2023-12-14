import FilterEntryItem from "./FilterEntryItem";
import { useFilterProjectStore } from "@/stores/filterProject";
import { Fragment } from "react";
import Button from "../Button";

export default function FilterEntryComponent({
    darkTheme,
}: {
    darkTheme: boolean;
}) {
    const tags = useFilterProjectStore((state: any) => state.tags);
    const setActiveFilters = useFilterProjectStore(
        (state: any) => state.setActiveFilters
    );
    const activeFilters = useFilterProjectStore(
        (state: any) => state.activeFilters
    );
    const handleItemClick = (index: string) => {
        const newActiveItems = [...activeFilters];
        const indexInArray = newActiveItems.indexOf(index);
        if (activeFilters.includes("Favorites") && activeFilters.length === 1) {
            newActiveItems.splice(indexInArray, 1);
        }
        if (indexInArray === -1) {
            newActiveItems.push(index);
        } else {
            newActiveItems.splice(indexInArray, 1);
        }
        setActiveFilters(newActiveItems);
    };

    const renderFilterEntryItem = (
        text: string,
        onClick: () => void,
        key?: number | null
    ) => (
        <FilterEntryItem active={activeFilters.includes(text)} key={key}>
            <li
                className="flex gap-2 items-center max-desktop:text-xs"
                onClick={onClick}
            >
                {activeFilters.includes(text) && (
                    <button
                        className={`dot ${darkTheme ? "bg-gray" : "bg-black"}`}
                    />
                )}
                {text}
            </li>
        </FilterEntryItem>
    );

    return (
        <>
            {activeFilters.length > 0 && (
                <span onClick={(e) => setActiveFilters([])}>
                    <Button>CLEAR FILTERS</Button>
                </span>
            )}
            <section className="absolute top-6 w-full">
                <h2 className="text-m flex gap-1 mt-4 max-desktop:text-s">
                    <span>↱</span> Favorites
                </h2>
                <hr className="border-dark-gray opacity-50" />
                <ul className="pb-2">
                    {renderFilterEntryItem(
                        "Favorites",
                        () => {
                            handleItemClick("Favorites");
                        },
                        null
                    )}
                </ul>
                {Object.entries(tags).map(
                    (
                        [category, subcategories]: [string, string[] | any],
                        idx
                    ) => (
                        <Fragment key={idx}>
                            <h2 className="text-m flex gap-1 max-desktop:text-s">
                                <span>↱</span> {category}
                            </h2>
                            <hr className="border-dark-gray opacity-50" />
                            <ul className="pb-2">
                                {subcategories.map(
                                    (subcategory: any, subIdx: number) =>
                                        renderFilterEntryItem(
                                            subcategory,
                                            () => handleItemClick(subcategory),
                                            subIdx
                                        )
                                )}
                            </ul>
                        </Fragment>
                    )
                )}
            </section>
        </>
    );
}
