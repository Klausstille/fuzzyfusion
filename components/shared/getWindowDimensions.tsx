import { useState, useEffect } from "react";

export default function GetWindowDimensions() {
    const [dimensions, setDimensions] = useState({
        windowWidth: 0,
        windowHeight: 0,
    });
    useEffect(() => {
        if (typeof window !== "undefined") {
            const handleResize = () => {
                setDimensions({
                    windowWidth: window.innerWidth,
                    windowHeight: window.innerHeight,
                });
            };

            window.addEventListener("resize", handleResize);
            handleResize();
            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }
    }, []);

    return dimensions;
}
