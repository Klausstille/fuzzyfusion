import { useEffect, useState, useRef } from "react";
import { ImagesCollectionItem, ActiveIndex } from "@/types";
import CommonImageModuleComponent from "../ProjectShared/CommonImageModuleComponent";
import { AssetImage } from "../shared/asset-image/AssetImage";
import {
    TransformWrapper,
    TransformComponent,
    ReactZoomPanPinchRef,
    useTransformEffect,
} from "react-zoom-pan-pinch";
import Image from "next/image";
import Button from "../Button";

interface ProjectListItemDetailProps {
    projectItem: ImagesCollectionItem;
}

export default function ProjectListImageDetail({
    projectItem,
}: ProjectListItemDetailProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const [minScale, setMinScale] = useState(1);

    useEffect(() => {
        const calculateMinScale = () => {
            if (containerRef.current && imageRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const imageWidth = imageRef.current.offsetWidth;
                const scale = containerWidth / imageWidth;
                setMinScale(scale);
            }
        };

        const imageEl = imageRef.current;
        if (imageEl && imageEl.complete) {
            calculateMinScale();
        } else {
            if (imageEl) {
                imageEl.addEventListener("load", calculateMinScale);
                return () =>
                    imageEl.removeEventListener("load", calculateMinScale);
            }
        }
    }, [projectItem]);

    return (
        <TransformWrapper
            key={projectItem?.id}
            wheel={{ step: 0.002, smoothStep: 0.002 }}
            smooth={true}
            doubleClick={{
                step: 0.5,
                animationTime: 600,
                mode: "zoomIn",
                animationType: "easeInOutQuart",
            }}
            maxScale={3}
            limitToBounds={true}
            centerOnInit={true}
            centerZoomedOut={true}
            initialScale={1.5}
            minScale={minScale}
        >
            {({ zoomIn, zoomOut, resetTransform }) => {
                return (
                    <aside
                        ref={containerRef}
                        className="image_detail col-span-7 h-[calc(100vh-3rem)] overflow-hidden rounded-md max-desktop:col-span-6 max-tablet:hidden relative"
                    >
                        <div className="tools absolute bottom-4 right-4 flex gap-2 z-30 max-tablet:flex-col max-tablet:gap-1 max-tablet:items-start">
                            <Button onClick={() => zoomIn()}>Zoom in</Button>
                            <Button onClick={() => zoomOut()}>Zoom out</Button>
                            <Button onClick={() => resetTransform()}>
                                Reset
                            </Button>
                        </div>
                        <TransformComponent
                            wrapperStyle={{
                                height: "100%",
                                width: "100%",
                            }}
                        >
                            <Image
                                style={{
                                    width: "100%",
                                    height: "auto",
                                }}
                                ref={imageRef}
                                src={projectItem?.url || ""}
                                alt={projectItem?.title}
                                width={projectItem?.width || 0}
                                height={projectItem?.height || 0}
                                placeholder={
                                    projectItem?.blurDataURL ? "blur" : "empty"
                                }
                                blurDataURL={projectItem?.blurDataURL || ""}
                            />
                        </TransformComponent>
                    </aside>
                );
            }}
        </TransformWrapper>
    );
}
