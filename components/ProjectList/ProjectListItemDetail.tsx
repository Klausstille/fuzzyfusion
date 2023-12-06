import Image from "next/image";
import React, { useEffect, useState } from "react";
import formatExifData from "@/helpers/formatExifData";
import { FilteredExifTags, ExifTagsEntryProps } from "@/types";

export default function ProjectListItemDetail({
    exifData,
}: ExifTagsEntryProps): JSX.Element {
    const [filteredExifData, setFilteredExifData] = useState<FilteredExifTags>(
        {} as FilteredExifTags
    );
    useEffect(() => {
        if (exifData?.DateTime) {
            const formattedExifData = formatExifData(exifData);
            setFilteredExifData(formattedExifData);
        }
    }, [exifData]);

    return (
        <section className="h-[calc(100vh-50px)] overflow-scroll col-span-3">
            <Image
                className="aspect-16/9 object-cover pb-2"
                src={"/DSCF5143.JPG"}
                alt="./DSCF5143.JPG"
                width={1000}
                height={500}
            />
            <h1 className="text-m">DSCF5143.JPG</h1>
            <h1 className="text-dark-gray pb-2">JPEG image</h1>
            {!exifData.DateTime && <h1>Loading...</h1>}
            <div className="card__content">
                <dl className="card__info pb-2 my-2">
                    {Object.entries(filteredExifData).map(
                        ([key, value], idx) => {
                            return (
                                <React.Fragment key={idx}>
                                    {idx ===
                                        Object.entries(filteredExifData)
                                            .length -
                                            2 && (
                                        <>
                                            <span className="my-2" />
                                            <span className="my-2" />
                                        </>
                                    )}
                                    <dt className="card__info-title text-dark-gray">
                                        {key}
                                    </dt>
                                    <dd className="card__info-description">
                                        {value}
                                    </dd>
                                </React.Fragment>
                            );
                        }
                    )}
                </dl>
            </div>
        </section>
    );
}
