"use client";

import Image from "next/image";
import { CSSProperties } from "react";
import { IAssetImage } from "@/types/contentful/types";
import { useState } from "react";

export interface AssetImageProps {
    image?: IAssetImage;
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
    contentLayout = "classic",
}: AssetImageProps) {
    const [isHovered, setHovered] = useState(false);

    if (image && imageSrc)
        throw new Error(
            "AssetImage requires either an image or an imageSrc, not both"
        );
    if (imageSrc && !alt)
        throw new Error(
            "AssetImage requires an alt property when using imageSrc"
        );

    const imgUrl = image ? image.url : (imageSrc as string);
    const imgAlt = image ? image.description || "" : (alt as string);
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

    // const randomShapes = [
    //     "[clip-path:polygon(25%_24%,18%_24%,14%_95%,44%_18%,25%_24%,18%_24%,14%_95%,44%_18%)]",
    //     "[clip-path:polygon(32%_40%,18%_96%,18%_17%,85%_78%,32%_40%,18%_96%,18%_17%,85%_78%)]",
    //     "[clip-path:polygon(86%_72%,58%_53%,4%_3%,78%_31%,86%_72%,58%_53%,4%_3%,78%_31%)]",
    //     "[clip-path:polygon(83%_40%,12%_1%,19%_93%,95%_7%,83%_40%,12%_1%,19%_93%,95%_7%)]",
    //     "[clip-path:polygon(91%_73%,19%_26%,20%_93%,53%_99%,91%_73%,19%_26%,20%_93%,53%_99%)]",
    // ];
    const defaultState =
        "[clip-path:polygon(1%_100%,6%_89%,0%_74%,11%_57%,0%_44%,12%_16%,2%_1%,28%_7%,42%_1%,66%_16%,79%_0%,90%_7%,100%_2%,96%_21%,99%_32%,92%_44%,100%_68%,85%_85%,100%_100%,35%_89%)]";
    const hoverState =
        "[clip-path:polygon(0%_100%,0%_100%,0%_100%,0%_100%,0%_100%,0%_0%,0%_0%,0%_0%,0%_0%,0%_0%,100%_0%,100%_0%,100%_0%,100%_0%,100%_0%,100%_100%,100%_100%,100%_100%,100%_100%,100%_100%)]";

    return (
        <Image
            onLoad={onLoad}
            className={`${
                contentLayout === "funky"
                    ? isHovered
                        ? hoverState
                        : defaultState
                    : contentLayout === "preview"
                    ? "aspect-16/9 w-screen object-cover"
                    : ""
            } transition-all duration-1000`}
            priority={priority}
            key={imgUrl}
            src={imgUrl}
            alt={imgAlt}
            width={width}
            quality={quality === "high" ? 85 : 75}
            height={height}
            fill={fill}
            sizes={sizes}
            {...blurProps}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        />
    );
}
