import { ExifTags } from "@/types";
import ProjectItemDetail from "@/components/ProjectShared/ProjectItemDetail";
import BackIcon from "./BackIcon";
import { ImagesCollectionItem, ActiveIndex } from "@/types";
import { useColorThemeStore, DarkTheme } from "@/stores/colorTheme";
import { AssetImage } from "../shared/asset-image/AssetImage";
import GetWindowDimensions from "../shared/getWindowDimensions";
import { useState } from "react";
import CommonImageModuleComponent from "../ProjectShared/CommonImageModuleComponent";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Image from "next/image";
import Button from "../Button";
import { useRef, useEffect } from "react";
interface ProjectItemImageDetailProps {
    projectItem: ImagesCollectionItem | null;
    exifData: ExifTags;
    setShowImageDetail: (item: boolean) => void;
}

export default function ProjectIconImageDetail({
    projectItem,
    setShowImageDetail,
    exifData,
}: ProjectItemImageDetailProps) {
    const { windowWidth } = GetWindowDimensions();
    const darkTheme = useColorThemeStore(
        (state: unknown) => (state as DarkTheme).darkTheme
    );
    const [isShown, setIsShown] = useState(false);
    const [activeIndex, setActiveIndex] = useState<ActiveIndex | number>(-1);
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
        projectItem && (
            <>
                <section
                    className={`fixed top-0 left-0 h-screen w-screen ${
                        darkTheme ? "bg-black" : "bg-gray"
                    } z-40`}
                >
                    <aside className="fixed top-2 left-2 h-[calc(100vh-3rem)] w-[calc(100vw-1rem)] rounded-md overflow-hidden grid grid-cols-12">
                        <>
                            {windowWidth > 768 && (
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
                                    initialScale={minScale}
                                    minScale={minScale}
                                >
                                    {({ zoomIn, zoomOut, resetTransform }) => {
                                        return (
                                            <aside
                                                ref={containerRef}
                                                className="image_detail h-[calc(100vh-3rem)] overflow-hidden col-span-9 pr-2 max-desktop-s:col-span-8 max-tablet:col-span-12 max-tablet:mt-10 max-tablet:pr-0"
                                            >
                                                <div className="tools absolute top-4 left-4 flex gap-2 z-30 max-tablet:flex-col max-tablet:gap-1 max-tablet:items-start">
                                                    <Button
                                                        onClick={() => zoomIn()}
                                                    >
                                                        Zoom in
                                                    </Button>
                                                    <Button
                                                        onClick={() =>
                                                            zoomOut()
                                                        }
                                                    >
                                                        Zoom out
                                                    </Button>
                                                    <Button
                                                        onClick={() =>
                                                            resetTransform()
                                                        }
                                                    >
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
                                                        src={
                                                            projectItem?.url ||
                                                            ""
                                                        }
                                                        alt={projectItem?.title}
                                                        quality={90}
                                                        width={
                                                            projectItem?.width ||
                                                            0
                                                        }
                                                        height={
                                                            projectItem?.height ||
                                                            0
                                                        }
                                                        placeholder={
                                                            projectItem?.blurDataURL
                                                                ? "blur"
                                                                : "empty"
                                                        }
                                                        blurDataURL={
                                                            projectItem?.blurDataURL ||
                                                            ""
                                                        }
                                                    />
                                                </TransformComponent>
                                            </aside>
                                        );
                                    }}
                                </TransformWrapper>
                            )}
                            <div
                                className="fixed bottom-[10px] max-tablet:top-3 max-tablet:bottom-[auto] right-4 flex items-center gap-2 cursor-pointer max-tablet:text-xs-heading max-tablet:left-4 text-m z-[9999]"
                                onClick={() => setShowImageDetail(false)}
                            >
                                <BackIcon darkTheme={darkTheme} /> BACK
                            </div>
                            <aside className="col-span-3 max-desktop-s:col-span-4">
                                <ProjectItemDetail
                                    projectItem={projectItem}
                                    exifData={exifData}
                                    projectIcon
                                />
                            </aside>
                        </>
                    </aside>
                </section>
            </>
        )
    );
}
