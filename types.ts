export interface ImagesCollectionItem {
    id: string;
    title: string;
    url: string;
    width: number;
    height: number;
    tags: {
        [k: string]: string;
    };
}
export interface ImagesCollection {
    items: {
        id: string;
        title: string;
        url: string;
        width: number;
        height: number;
        tags: {
            [k: string]: string;
        };
    }[];
}
export interface ProjectItem {
    title: string;
    id: string;
    imagesCollection: ImagesCollection;
}
export interface ProjectEntryProps {
    setProjectItem: React.Dispatch<
        React.SetStateAction<ImagesCollectionItem | null>
    >;
    projects: ProjectItem[];
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
    "Exposure Program": string;
    "Focal Length": string;
    "ISO Speed": string;
    "Aperture Value": string;
    "Scene Type": string;
    "White Balance": string;
    Flash: string;
    Latitude: string;
    Longitude: string;
}

export interface ProjectItemProps {
    projectItem: {
        id: string;
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
    ExposureProgram: string;
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
    SceneCaptureType: string;
    WhiteBalance: string;
    GPSLatitudeRef: string;
    GPSLongitudeRef: string;
    thumbnail: {
        Orientation: number;
    };
    GPSLatitude?: number[] | any;
    GPSLongitude?: number[] | any;
}
