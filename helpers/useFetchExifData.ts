import EXIF from "exif-js";
import { useEffect } from "react";
import { ImagesCollectionItem } from "@/types";

interface useFetchExifDataProps {
    projectItem: ImagesCollectionItem | null;
    setExifData: React.Dispatch<React.SetStateAction<any>>;
}
export const useFetchExifData = async ({
    projectItem,
    setExifData,
}: useFetchExifDataProps) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (projectItem) {
                    const url = projectItem.url.split("?")[0];
                    const response = await fetch(url);
                    const blob: any = await response.blob();
                    const exifData = await new Promise((resolve) => {
                        EXIF.getData(blob, function (this: any) {
                            resolve(EXIF.getAllTags(this));
                        });
                    });
                    if (exifData && Object.keys(exifData).length > 0) {
                        setExifData(exifData);
                    } else {
                        console.warn("No EXIF data found in the image.");
                    }
                }
            } catch (error) {
                console.error("Error fetching or processing the image:", error);
            }
        };

        fetchData();
    }, [projectItem, setExifData]);
};
