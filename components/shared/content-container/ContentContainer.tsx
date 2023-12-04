"use client";

interface ContentProps {
    children: React.ReactNode;
    className?: string;
    contentType: "text" | "image" | "text-centered" | "full" | "text-only";
    contentLayout?: "funky" | "classic" | "preview" | "minmax";
    id?: string;
    width?: number;
}

export function ContentContainer({
    children,
    className = "",
    contentType,
    contentLayout = "minmax",
    width = 200,
}: ContentProps) {
    const contentWidthSet = {
        text: "max-w-text-content desktop:max-w-text-content",
        image: {
            minmax: `grid gap-5`,
            funky: "grid grid-cols-3 justify-center gap-5",
            classic: "flex flex-col gap-5",
            preview:
                "grid grid-cols-1 desktop-s:grid-cols-2 desktop-m:grid-cols-3 justify-center gap-5",
        },
        "text-centered": "max-w-text-content",
        full: "max-w-full",
        "text-only": "max-w-text-only",
    };
    const maxWidthClass = contentWidthSet[contentType];
    let imageLayout;

    if (contentType === "image") {
        const imageWidthSet = contentWidthSet[contentType] as {
            funky: string;
            classic: string;
            preview: string;
            minmax: string;
        };
        imageLayout = imageWidthSet[contentLayout];
    }

    return (
        <div
            className={`relative ${maxWidthClass} ${className} ${imageLayout}`}
            style={
                contentLayout === "minmax"
                    ? {
                          gridTemplateColumns: `repeat(auto-fill,minmax(${width}px,1fr))`,
                          fontSize: `${width / 7}px`,
                      }
                    : {}
            }
        >
            {children}
        </div>
    );
}
