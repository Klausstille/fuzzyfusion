import { useEffect, useState } from "react";
import GetWindowDimensions from "../shared/getWindowDimensions";
import { useMouse } from "@/utils/helper";
import { useRef } from "react";
import Image from "next/image";

interface CommonImageModuleProps {
    altText: string;
    srcUrl: string;
}

export const CommonImageModule = ({
    altText,
    srcUrl,
}: CommonImageModuleProps) => {
    const [isTransitionActive, setIsTransitionActive] = useState(false);
    const { windowWidth, windowHeight } = GetWindowDimensions();
    const [className, setClassName] = useState("");
    const [properties, setProperties] = useState({
        transform: "",
    });
    const { x, y } = useMouse();
    const imgRef = useRef();
    useEffect(() => {
        setIsTransitionActive(true);
    }, []);

    useEffect(() => {
        const imgElement = imgRef.current as HTMLImageElement | undefined;
        if (imgElement && windowWidth && windowHeight) {
            const imageHeight = imgElement.height;
            const imageWidth = imgElement.width;
            const ratioX =
                -1 *
                ((x! - windowWidth / 2) / windowWidth) *
                (imageWidth - windowWidth);
            const ratioY =
                -1 *
                ((y! - windowHeight / 2) / windowHeight) *
                (imageHeight - windowHeight);

            setProperties({
                transform: `translate(${ratioX}px, ${ratioY}px)`,
            });
        }
    }, [x, y]);

    useEffect(() => {
        const imgElement = imgRef.current as HTMLImageElement | undefined;
        if (imgElement && windowWidth && windowHeight) {
            const imageHeight = imgElement.height;
            const imageWidth = imgElement.width;
            const imageRatio = imageWidth / imageHeight;
            const windowRatio = windowWidth / windowHeight;
            if (imageRatio < windowRatio) {
                setClassName("portrait");
            } else {
                setClassName("landscape");
            }
        }
    }, [windowWidth, windowHeight]);

    return (
        <div
            className={`img-module ${
                isTransitionActive ? "show" : "hide"
            } z-[9999]`}
            style={{ cursor: "crosshair" }}
        >
            <Image
                ref={imgRef as any}
                alt={altText}
                src={srcUrl}
                className={`fixed-image ${className}`}
                style={windowWidth > 768 ? properties : {}}
                width={5000}
                height={5000}
            />
        </div>
    );
};
