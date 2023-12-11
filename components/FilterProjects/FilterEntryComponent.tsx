import FilterEntryItem from "./FilterEntryItem";
import { useFilterProjectStore } from "@/stores/filterProject";
import { Fragment } from "react";

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
        if (activeFilters.includes("Favorites") && activeFilters.length === 1) {
            return;
        }
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
                },
                null
            )}
            <h2 className="text-m flex gap-1 mt-4">
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
                ([category, subcategories]: [string, string[] | any], idx) => (
                    <Fragment key={idx}>
                        <h2 className="text-m flex gap-1">
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
        </>
    );
}
