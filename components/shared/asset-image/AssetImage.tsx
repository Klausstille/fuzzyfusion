import Image from "next/image";
import { CSSProperties } from "react";

export interface AssetImageProps {
    image?: {
        url: string;
        width: number;
        height: number;
    };
    imageSrc?: string;
    alt?: string;
    priority?: boolean;
    className?: string;
    style?: CSSProperties;
    fill?: boolean;
    sizes?: string;
    quality?: "cover" | "high" | "medium" | "low";
    preview?: string | "gray" | "transparent";
    onLoad?: () => void;
    contentLayout?: "funky" | "classic" | "preview";
}

const WidthQualityMap = {
    cover: 1500,
    high: 800,
    medium: 600,
    low: 400,
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
}: AssetImageProps) {
    if (image && imageSrc)
        throw new Error(
            "AssetImage requires either an image or an imageSrc, not both"
        );
    if (imageSrc && !alt)
        throw new Error(
            "AssetImage requires an alt property when using imageSrc"
        );

    const width = 1000;
    // fill ? undefined : WidthQualityMap[quality];
    const height = 1000;
    // width && image
    // ? Math.round((width / image.width) * image.height)
    // : undefined;
    const previewBase64 =
        preview === "gray" || preview === "transparent"
            ? PreviewBase64Map[preview]
            : preview;
    const blurProps: { placeholder: "blur" | "empty"; blurDataURL: string } = {
        placeholder: previewBase64 ? "blur" : "empty",
        blurDataURL: previewBase64 || "",
    };

    return (
        <Image
            className="aspect-16/9 object-cover"
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
            {...blurProps}
        />
    );
}
