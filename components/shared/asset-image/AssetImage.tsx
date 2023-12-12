import Image from "next/image";
import { CSSProperties } from "react";

export interface AssetImageProps {
    image?: {
        url: string;
        width: number;
        height: number;
        title: string;
        tags: {
            [k: string]: string;
        };
    };
    imageSrc?: string;
    alt?: string;
    priority?: boolean;
    className?: string;
    style?: CSSProperties;
    fill?: boolean;
    sizes?: string;
    quality?: "cover" | "high" | "medium" | "low" | "small";
    preview?: string | "gray" | "transparent";
    onLoad?: () => void;
    thumbnails?: boolean;
    thumbnailPreview?: boolean;
    iconThumbnails?: boolean;
    iconThumbnailPreview?: boolean;
}

const WidthQualityMap = {
    cover: 1500,
    high: 800,
    medium: 600,
    low: 400,
    small: 100,
};

const PreviewBase64Map = {
    gray: "data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
    transparent:
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
};

export function AssetImage({
    image,
    imageSrc,
    alt,
    quality = "cover",
    priority = false,
    className = "",
    style,
    preview = "gray",
    fill,
    sizes,
    onLoad,
    thumbnails,
    thumbnailPreview,
    iconThumbnails,
    iconThumbnailPreview,
}: AssetImageProps) {
    if (image && imageSrc)
        throw new Error(
            "AssetImage requires either an image or an imageSrc, not both"
        );
    if (imageSrc && !alt)
        throw new Error(
            "AssetImage requires an alt property when using imageSrc"
        );

    const width = fill ? undefined : WidthQualityMap[quality];
    const height =
        width && image
            ? Math.round((width / image.width) * image.height)
            : undefined;
    const previewBase64 =
        preview === "gray" || preview === "transparent"
            ? PreviewBase64Map[preview]
            : preview;
    const blurProps: { placeholder: "blur" | "empty"; blurDataURL: string } = {
        placeholder: previewBase64 ? "blur" : "empty",
        blurDataURL: previewBase64 || "",
    };
    imageSrc = imageSrc || image?.url;

    return (
        <Image
            className={
                thumbnails
                    ? "aspect-16/9 object-cover"
                    : thumbnailPreview
                    ? "h-full object-cover rounded-md"
                    : iconThumbnails
                    ? "w-full hover:object-contain aspect-6/4 object-cover transition-all duration-500 ease-in-out"
                    : iconThumbnailPreview
                    ? "h-[calc(100vh-1rem)] w-full object-cover object-left rounded-md max-tablet:object-center"
                    : ""
            }
            draggable="false"
            onLoad={onLoad}
            priority={priority}
            key={imageSrc}
            src={imageSrc as string}
            alt={alt as string}
            width={width}
            quality={quality === "high" ? 85 : 75}
            height={height}
            fill={fill}
            sizes={sizes}
            layout={
                iconThumbnailPreview || thumbnailPreview ? "" : "responsive"
            }
            {...blurProps}
        />
    );
}
