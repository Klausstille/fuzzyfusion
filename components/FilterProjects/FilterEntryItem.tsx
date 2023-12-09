import { useColorThemeStore, DarkTheme } from "@/stores/colorTheme";

export default function FilterEntryItem({
    children,
    active,
}: {
    children: React.ReactNode;
    active?: boolean;
}) {
    const darkTheme = useColorThemeStore(
        (state: unknown) => (state as DarkTheme).darkTheme
    );
    return (
        <section
            className={`${
                active
                    ? `${
                          darkTheme
                              ? "bg-black hover:bg-black text-white"
                              : "bg-gray hover:bg-gray text-black"
                      } pl-2 font-bold opacity-100`
                    : `${
                          darkTheme ? "hover:bg-black" : "hover:bg-gray"
                      } text-dark-gray hover:bg-opacity-30 cursor-pointer transition-colors duration-200 ease-in-out`
            } text-s-bold rounded-sm`}
        >
            {children}
        </section>
    );
}
