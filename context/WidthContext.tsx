"use client";
import React, { createContext, useContext, useState } from "react";

interface WidthContextProps {
    width: number;
    onWidthChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const WidthContext = createContext<WidthContextProps>({
    width: 100,
    onWidthChange: () => {},
});

export function useWidthContext() {
    return useContext(WidthContext);
}

export function WidthProvider({ children }: { children: React.ReactNode }) {
    const [width, setWidth] = useState<number>(100);

    const onWidthChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const newWidth = Number(e.target.value);
        setWidth(newWidth);
    };

    return (
        <WidthContext.Provider value={{ width, onWidthChange }}>
            {children}
        </WidthContext.Provider>
    );
}
