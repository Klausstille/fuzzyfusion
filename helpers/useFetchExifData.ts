import EXIF from "exif-js";
import { useEffect } from "react";
import { ImagesCollectionItem } from "@/types";

interface useFetchExifDataProps {
    projectItem: ImagesCollectionItem | null;
    setExifData: React.Dispatch<React.SetStateAction<any>>;
}

export const useFetchExifData = ({
    projectItem,
    setExifData,
}: useFetchExifDataProps) => {
    useEffect(() => {
        if (projectItem) {
            const url: string = projectItem.url.split("?")[0];
            fetch(url)
                .then((response) => response.blob())
                .then((blob: any) => {
                    EXIF.getData(blob, function (this: any) {
                        const exifData = EXIF.getAllTags(this);
                        if (exifData && Object.keys(exifData).length > 0) {
                            setExifData(exifData);
                        } else {
                            console.warn("No EXIF data found in the image.");
                        }
                    });
                })
                .catch((error) => {
                    console.error(
                        "Error fetching or processing the image:",
                        error
                    );
                });
        }
    }, [projectItem, setExifData]);
};
