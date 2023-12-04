import { getCenteredClasses } from "@/utils/helper";

interface TextContainerProps {
    type: "h1" | "h2" | "h3" | "h4" | "hero";
    title: string;
    subtitle?: string;
    description?: string;
    subheading?: string;
    centered?: boolean;
    className?: string;
    color?: "black" | "white" | "yellow";
}

const textSizeSet = {
    h1: "text-m desktop:text-xxl",
    h2: "text-m desktop:text-xl",
    h3: "text-m desktop:text-l",
    h4: "text-s desktop:text-m",
    hero: "text-l-heading desktop:text-xl-heading",
};

export function TextContainer({
    type,
    title,
    subtitle,
    description,
    centered,
    className = "",
    color = "black",
    subheading,
}: TextContainerProps) {
    const centeredClasses = getCenteredClasses(centered);
    const subtitleTextClass = textSizeSet[type];

    {
        return type !== "hero" ? (
            <div className={`text-l flex flex-col ${className}`}>
                {subtitle && (
                    <p className={`${subtitleTextClass} ${centeredClasses}`}>
                        {subtitle}
                    </p>
                )}
                {description && (
                    <p className={`${subtitleTextClass}  ${centeredClasses}`}>
                        {description}
                    </p>
                )}
            </div>
        ) : (
            <>
                {title && (
                    <p className={`${subtitleTextClass} ${centeredClasses}`}>
                        {title}
                    </p>
                )}
                <p className={`${subtitleTextClass} ${centeredClasses}`}>
                    {description}
                </p>
            </>
        );
    }
}
