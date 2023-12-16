import { useState, useEffect } from "react";

export default function GetWindowDimensions() {
    const [dimensions, setDimensions] = useState({
        windowWidth: typeof window !== "undefined" ? window.innerWidth : 0,
        windowHeight: typeof window !== "undefined" ? window.innerHeight : 0,
    });

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight,
            });
        };

        if (typeof window !== "undefined") {
            window.addEventListener("resize", handleResize);
            handleResize();
            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }
    }, []);

    return dimensions;
}
