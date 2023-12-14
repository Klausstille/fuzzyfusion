export interface ImagesCollectionItem {
    id: string;
    title: string;
    url: string;
    width: number;
    height: number;
    tags: (string[] | null)[];
}
export interface ImagesCollection {
    items: {
        id: string;
        title: string;
        url: string;
        width: number;
        height: number;
        tags: (string[] | null)[];
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
    DateTime: { description: string };
    PixelXDimension: { description: string };
    PixelYDimension: { description: string };
    ColorSpace: { description: string };
    Make: { description: string };
    Model: { description: string };
    ExposureTime: { description: string };
    ExposureProgram: { description: string };
    FocalLength: { description: string };
    ISOSpeedRatings: { description: string };
    ApertureValue: { description: string };
    Flash: { description: string };
    SceneCaptureType: { description: string };
    WhiteBalance: { description: string };
    GPSLatitudeRef: { description: string };
    GPSLongitudeRef: { description: string };
    Orientation: { value: number };
    GPSLatitude: { description: number };
    GPSLongitude: { description: number };
}

export interface ActiveIndex {
    url: string;
    alt: string;
    width: number;
    height: number;
}
