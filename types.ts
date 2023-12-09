import { latLongProps } from "./helpers/latLong";

export interface ImagesCollectionItem {
    id: number;
    title: string;
    url: string;
    width: number;
    height: number;
}
export interface ImagesCollection {
    items: {
        id: number;
        title: string;
        url: string;
        width: number;
        height: number;
    }[];
}
export interface ProjectItem {
    id: number;
    title: string;
    imagesCollection: ImagesCollection;
}
export interface ProjectEntryProps {
    setProjectItem: React.Dispatch<
        React.SetStateAction<ImagesCollectionItem | null>
    >;
    dummyData: ProjectItem[];
    projectItem: ImagesCollectionItem | null;
    exifData: any;
}
export interface FilteredExifTags {
    Created: string;
    Dimensions: string;
    "Color Space": string;
    "Device Make": string;
    "Device Model": string;
    "Exposure Time": string;
    "Focal Length": string;
    "ISO Speed": string;
    "Aperture Value": string;
    Flash: string;
    Latitude: number;
    Longitude: number;
}

export interface ProjectItemProps {
    projectItem: {
        id: number;
        url: string;
        title: string;
    };
}

export interface ExifTags {
    DateTime: string;
    PixelXDimension: number;
    PixelYDimension: number;
    ColorSpace: number;
    Make: string;
    Model: string;
    ExposureTime: {
        numerator: number;
        denominator: number;
    };
    FocalLength: {
        numerator: number;
        denominator: number;
    };
    ISOSpeedRatings: string;
    ApertureValue: {
        numerator: number;
        denominator: number;
    };
    Flash: string;
    GPSLatitudeRef: string;
    GPSLongitudeRef: string;
    GPSLatitude?: latLongProps[] | any;
    GPSLongitude?: latLongProps[] | any;
}
