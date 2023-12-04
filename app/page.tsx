"use client";
import { useEffect } from "react";
import ProjectList from "@/components/ProjectList/ProjectList";
import EXIF from "exif-js";

export default function Index() {
    useEffect(() => {
        const url: string = "./DSCF5143.JPG";
        // "https://images.ctfassets.net/rbwa20kawb52/1PzHTL0qaQcsYGUWRipV9F/a107ee82cc8a523ff3ba6b4cbfa8c8d3/EA932281-3929-4849-86AF-C4475B80DC3B-643-00000019658FFFD4.JPG";
        fetch(url)
            .then((response) => response.blob())
            .then((blob: any) => {
                EXIF.getData(blob, function (this: any) {
                    const exifData = EXIF.getAllTags(this);
                    if (exifData && Object.keys(exifData).length > 0) {
                        console.log("Extracted EXIF data:", exifData);
                    } else {
                        console.warn("No EXIF data found in the image.");
                    }
                });
            })
            .catch((error) => {
                console.error("Error fetching or processing the image:", error);
            });
    }, []);
    return <ProjectList />;
}
