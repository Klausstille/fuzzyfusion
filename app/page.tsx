"use client";
import { useState, useEffect } from "react";
import ProjectList from "@/components/ProjectList/ProjectList";
import ProjectListItemDetail from "@/components/ProjectList/ProjectListItemDetail";
import ProjectListImageDetail from "@/components/ProjectList/ProjectListImageDetail";
import { ExifTags } from "@/types";
import EXIF from "exif-js";

export default function Index() {
    const [exifData, setExifData] = useState([]);
    useEffect(() => {
        const url: string = "./DSCF5143.JPG";
        // "https://images.ctfassets.net/rbwa20kawb52/1PzHTL0qaQcsYGUWRipV9F/a107ee82cc8a523ff3ba6b4cbfa8c8d3/EA932281-3929-4849-86AF-C4475B80DC3B-643-00000019658FFFD4.JPG";
        fetch(url)
            .then((response) => response.blob())
            .then((blob: any) => {
                EXIF.getData(blob, function (this: any) {
                    const exifData = EXIF.getAllTags(this);
                    if (exifData && Object.keys(exifData).length > 0) {
                        setExifData(exifData);
                        console.log("Extracted EXIF data:", exifData);
                    } else {
                        console.warn("No EXIF data found in the image.");
                    }
                });
            })
            .catch((error) => {
                console.error("Error fetching or processing the image:", error);
            });
    }, [exifData]);

    return (
        <section className="px-2 py-2 grid grid-cols-10 gap-2">
            <div className="col-span-2 px-2 h-[calc(100vh-30px)]">
                <ProjectList active />
                <ProjectList />
                <ProjectList />
                <ProjectList />
                <ProjectList />
                <ProjectList />
                <ProjectList />
            </div>
            {exifData && <ProjectListItemDetail exifData={exifData as any} />}
            <ProjectListImageDetail />
        </section>
    );
}
