import React, { useEffect, useState } from "react";
import formatExifData from "@/helpers/formatExifData";
import { FilteredExifTags, ExifTags } from "@/types";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import ShopComponent from "../ShopComponent/ShopComponent";
import { useFavoritesStore } from "@/stores/favorites";
import { ImagesCollectionItem, ActiveIndex } from "@/types";
import { useColorThemeStore, DarkTheme } from "@/stores/colorTheme";
import { AssetImage } from "../shared/asset-image/AssetImage";
import GetWindowDimensions from "../shared/getWindowDimensions";
import CommonImageModuleComponent from "../ProjectShared/CommonImageModuleComponent";
interface ProjectListItemDetailProps {
    exifData: ExifTags;
    projectItem: ImagesCollectionItem;
    projectIcon?: boolean;
}

export default function ProjectItemDetail({
    exifData,
    projectItem,
    projectIcon,
}: ProjectListItemDetailProps): JSX.Element {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { windowWidth } = GetWindowDimensions();
    const handleClick = () => setIsOpen(!isOpen);
    const [filteredExifData, setFilteredExifData] = useState<FilteredExifTags>(
        {} as FilteredExifTags
    );
    const darkTheme = useColorThemeStore(
        (state: unknown) => (state as DarkTheme).darkTheme
    );
    useEffect(() => {
        setHasLoaded(true);
    }, [hasLoaded]);

    useEffect(() => {
        if (exifData?.DateTime) {
            const formattedExifData = formatExifData(exifData);
            setFilteredExifData(formattedExifData);
        }
    }, [exifData]);

    const isFavorite: boolean = useFavoritesStore((state: any) =>
        state.isFavorite.includes(projectItem?.id)
    );
    const setFavorite = useFavoritesStore((state: any) => state.setFavorite);
    const { Latitude, Longitude } = filteredExifData;
    const tagCategory: string[] = Object.keys(projectItem?.tags);
    const tagValues: (string[] | null)[] = Object.values(projectItem?.tags);
    const [isShown, setIsShown] = useState(false);
    const [activeIndex, setActiveIndex] = useState<ActiveIndex | number>(-1);
    return (
        <>
            {isShown && (
                <CommonImageModuleComponent
                    setIsShown={setIsShown}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                />
            )}
            <section
                className={`${
                    projectIcon
                        ? "h-screen max-tablet:fixed max-tablet:top-2 max-tablet:left-2 max-tablet:w-[calc(100vw-1rem)] max-tablet:h-[calc(100vh-1rem)] rounded-md"
                        : "h-[calc(100vh-3rem)] rounded-md"
                } overflow-auto col-span-3 max-desktop:col-span-4 max-tablet:col-span-7 ${
                    darkTheme ? "bg-real-black" : "bg-white"
                } pb-10 max-tablet:pb-20 max-tablet:pt-10`}
            >
                {windowWidth > 768 ? (
                    <aside className="pb-2">
                        <AssetImage
                            image={projectItem}
                            alt={projectItem?.title}
                        />
                    </aside>
                ) : (
                    <aside
                        className="pb-2"
                        onClick={() => {
                            setIsShown(true);
                            setActiveIndex({
                                url: projectItem.url,
                                alt: projectItem.title || "",
                                width: projectItem.width || 0,
                                height: projectItem.height || 0,
                            });
                        }}
                    >
                        <AssetImage
                            image={projectItem}
                            alt={projectItem?.title}
                        />
                    </aside>
                )}

                <article className="px-2">
                    <h1 className="text-s-bold">{projectItem?.title}.JPG</h1>
                    <h1 className="text-dark-gray pb-4 text-s-bold">
                        JPEG image
                    </h1>
                    <h1 className="text-s-bold flex justify-between">Tags</h1>
                    <dl className="card__info pb-2 my-2">
                        {tagCategory.map((category, idx) => {
                            return (
                                <React.Fragment key={idx}>
                                    <dt
                                        key={idx}
                                        className="card__info-title text-dark-gray"
                                    >
                                        {category}
                                    </dt>
                                    <dd className="card__info-description">
                                        {tagValues[idx]?.map(
                                            (value, index, array) => {
                                                return (
                                                    <React.Fragment key={index}>
                                                        <span>{value}</span>
                                                        {index !==
                                                            array.length - 1 &&
                                                            ", "}
                                                    </React.Fragment>
                                                );
                                            }
                                        )}
                                    </dd>
                                </React.Fragment>
                            );
                        })}
                    </dl>
                    <h1 className="text-s-bold flex justify-between">
                        Information
                        <span
                            className="text-xs cursor-pointer text-dark-gray"
                            onClick={handleClick}
                        >
                            {isOpen ? "Show Less" : "Show More"}
                        </span>
                    </h1>
                    {!exifData.DateTime && <h1>Loading...</h1>}
                    <div className="card__content h-auto">
                        <dl className="card__info pb-2 my-2">
                            {Object.entries(filteredExifData).map(
                                ([key, value], idx) => {
                                    return (isOpen && idx >= 0) ||
                                        (!isOpen && idx < 3) ? (
                                        <React.Fragment key={idx}>
                                            <dt className="card__info-title text-dark-gray">
                                                {key}
                                            </dt>
                                            <dd className="card__info-description">
                                                {value}
                                            </dd>
                                            <hr className="border-dark-gray opacity-50" />
                                            <hr className="border-dark-gray opacity-50" />
                                        </React.Fragment>
                                    ) : null;
                                }
                            )}
                            {Latitude !== "n/A" && isOpen && (
                                <>
                                    <dt className="card__info-description text-dark-gray">
                                        Location
                                    </dt>
                                    <dd>
                                        <a
                                            href={`https://www.google.com/maps?q=${
                                                Latitude + " " + Longitude
                                            }`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {" "}
                                            ↳ view map
                                        </a>
                                    </dd>
                                </>
                            )}
                        </dl>
                    </div>
                    <div className="text-s-bold flex justify-between pb-4">
                        <span
                            className="text-xs flex items-center gap-4 text-dark-gray"
                            style={{ whiteSpace: "nowrap" }}
                        >
                            <p
                                onClick={() => setFavorite(projectItem?.id)}
                                style={{ cursor: "pointer" }}
                            >
                                {hasLoaded && isFavorite
                                    ? "Remove favorite"
                                    : "Add to favorites"}
                            </p>
                            <FavoriteButton id={projectItem?.id} />
                        </span>
                    </div>
                    <ShopComponent projectItem={projectItem} />
                </article>
            </section>
        </>
    );
}
