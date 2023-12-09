import { useColorThemeStore } from "@/stores/colorTheme";

export default function ProjectListItem({
    children,
    active,
}: {
    children: React.ReactNode;
    active?: boolean;
}) {
    const darkTheme = useColorThemeStore(
        (state: unknown) => (state as any).darkTheme
    );
    return (
        <section
            className={`${
                active
                    ? `${
                          darkTheme
                              ? "bg-real-black hover:bg-real-black"
                              : "bg-gray hover:bg-gray"
                      } opacity-100`
                    : `${
                          darkTheme ? "hover:bg-real-black" : "hover:bg-gray"
                      } hover:bg-opacity-30 cursor-pointer transition-colors duration-200 ease-in-out`
            } text-s-bold flex items-center h-6 pl-5 rounded-sm`}
        >
            {children}
        </section>
    );
}
