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
                className="flex gap-2 items-center max-desktop:text-xs mt-[1px]"
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
            <section className="absolute top-6 w-[calc(100%-1rem)]">
                <h2 className="text-s flex gap-1 mt-4 max-desktop:text-s">
                    FAVORITES
                </h2>
                <hr className="border-dark-gray opacity-50" />
                <ul className="pb-4 pt-[3px]">
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
                            <h2 className="text-s flex gap-1 max-desktop:text-s">
                                {category.toUpperCase()}
                            </h2>
                            <hr className="border-dark-gray opacity-50" />
                            <ul className="pb-4 pt-[3px]">
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
