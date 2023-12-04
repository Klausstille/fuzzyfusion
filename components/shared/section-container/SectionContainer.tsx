import { PropsWithChildren } from "react";

interface SectionContainerProps extends PropsWithChildren {
    mobileReversed?: boolean;
    flexColDesktop?: boolean;
    className?: string;
    id?: string;
}

const baseFlexClasses = "flex justify-center items-center gap-5";

export function SectionContainer({
    children,
    mobileReversed,
    flexColDesktop,
    className = "",
    id,
}: SectionContainerProps) {
    let flexClasses = baseFlexClasses;
    flexClasses += mobileReversed ? " flex-col-reverse" : " flex-col";
    flexClasses += flexColDesktop
        ? " justify-start desktop:flex-col desktop:gap-8"
        : " justify-center desktop:flex-row desktop:gap-20";
    const paddingClasses = "px-content-x py-content-y";

    return (
        <section
            id={id}
            className={`relative w-full ${flexClasses} ${paddingClasses} px-4`}
        >
            {children}
        </section>
    );
}
