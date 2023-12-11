import FilterEntryItem from "./FilterEntryItem";
import { useFilterProjectStore } from "@/stores/filterProject";
import { Fragment } from "react";

export default function FilterEntryComponent({
    onFilterFavorites,
    setFilterIsActive,
    darkTheme,
}: {
    onFilterFavorites: () => void;
    setFilterIsActive: (isActive: boolean) => void;
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
            <li className="flex gap-2 items-center" onClick={onClick}>
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
            {renderFilterEntryItem(
                "Clear All Filter",
                () => {
                    setActiveFilters([]);
                    setFilterIsActive(false);
                },
                null
            )}
            <h2 className="text-m flex gap-1">
                <span>↱</span> FILTER BY
            </h2>
            <hr className="border-dark-gray opacity-50" />
            <ul className="pb-4">
                {renderFilterEntryItem(
                    "Favorites",
                    () => {
                        onFilterFavorites();
                        handleItemClick("Favorites");
                    },
                    null
                )}
            </ul>
            {Object.entries(tags).map(
                ([category, subcategories]: [string, string[] | any], idx) => (
                    <Fragment key={idx}>
                        <h2 className="text-m flex gap-1">
                            <span>↱</span> {category}
                        </h2>
                        <hr className="border-dark-gray opacity-50" />
                        <ul className="pb-4">
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
        </>
    );
}
