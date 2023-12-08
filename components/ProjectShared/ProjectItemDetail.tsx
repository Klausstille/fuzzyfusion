import Image from "next/image";
import React, { useEffect, useState } from "react";
import formatExifData from "@/helpers/formatExifData";
import { FilteredExifTags, ExifTags } from "@/types";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { useFavoritesStore } from "@/stores/favorites";
import Button from "../Button";
import { ImagesCollectionItem } from "@/types";
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
    const handleClick = () => setIsOpen(!isOpen);
    const [filteredExifData, setFilteredExifData] = useState<FilteredExifTags>(
        {} as FilteredExifTags
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
        state.isFavorite.includes(projectItem.id)
    );

    return (
        <section
            className={`${
                projectIcon ? "h-screen pt-2" : "h-[calc(100vh-30px)]"
            } overflow-scroll col-span-3 bg-white px-2`}
        >
            {!projectIcon && (
                <Image
                    className="aspect-16/9 object-cover pb-2"
                    src={projectItem.url}
                    alt={projectItem.title}
                    width={1000}
                    height={500}
                    priority
                />
            )}
            <h1 className="text-s-bold">{projectItem.title}</h1>
            <h1 className="text-dark-gray pb-4 text-s-bold">JPEG image</h1>
            <h1 className="text-s-bold flex justify-between">
                Information
                <span className="text-xs cursor-pointer" onClick={handleClick}>
                    {isOpen ? "Show Less" : "Show More"}
                </span>
            </h1>
            {!exifData.DateTime && <h1>Loading...</h1>}
            <div className="card__content h-auto">
                <dl className="card__info pb-2 my-2">
                    {Object.entries(filteredExifData).map(([key, value], idx) =>
                        (isOpen && idx >= 0) || (!isOpen && idx < 3) ? (
                            <React.Fragment key={idx}>
                                <dt className="card__info-title text-dark-gray">
                                    {key}
                                </dt>
                                <dd className="card__info-description">
                                    {value}
                                </dd>
                                <hr className="border-gray" />
                                <hr className="border-gray" />
                            </React.Fragment>
                        ) : null
                    )}
                </dl>
            </div>
            <div className="text-s-bold flex justify-between">
                <Button>BUY</Button>
                <span
                    className="text-xs flex items-center gap-4 text-dark-gray"
                    style={{ whiteSpace: "nowrap" }}
                >
                    <p>{hasLoaded && isFavorite ? "" : "Mark as favorite"}</p>
                    <FavoriteButton id={projectItem.id} />
                </span>
            </div>
        </section>
    );
}
