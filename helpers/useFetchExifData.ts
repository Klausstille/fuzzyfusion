import ExifReader from "exifreader";
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
                    const arrayBuffer = await response.arrayBuffer();
                    const tags = ExifReader.load(arrayBuffer);
                    if (tags && Object.keys(tags).length > 0) {
                        setExifData(tags);
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
